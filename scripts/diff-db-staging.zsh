#!/bin/zsh

set -e

# ===============================================================
# DATABASE COMPARISON SCRIPT
# ===============================================================
# This script compares a local PostgreSQL database with a staging database
# in a Kubernetes environment using Prisma's migration diff tool.
#
# Usage: ./compare_databases.sh
#
# Required environment variables (can be in .env file):
# - STAGING_DB_URL: URL for the staging database
# - LOCAL_DB_URL: URL for the local database (defaults to postgresql://postgres:postgres@localhost:5432/postgres)
# ===============================================================

# Load environment variables from .env file if it exists
if [[ -f ../.env ]]; then
  echo "Loading environment variables from .env file..."
  source ../.env
fi

# Check required environment variables
if [[ -z "$STAGING_DB_URL" ]]; then
  echo "ERROR: Please set the STAGING_DB_URL environment variable in your .env file."
  echo "Example: STAGING_DB_URL=postgresql://user:password@hostname:port/database"
  exit 1
fi

# Set default for LOCAL_DB_URL if not provided
if [[ -z "$LOCAL_DB_URL" ]]; then
  LOCAL_DB_URL="postgresql://postgres:postgres@localhost:5432/postgres"
  echo "INFO: Using default LOCAL_DB_URL: $LOCAL_DB_URL"
  echo "      Set LOCAL_DB_URL in your .env file to override."
fi

# Set K8s namespace and label for the database pod
K8S_NAMESPACE="projects-watershed-website"
DB_LABEL="app=watershed-website-postgresql"
PORT_FORWARD_PORT=15432

# Function to log with timestamp
log() {
  echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1"
}

# Function to check if port is already in use
check_port() {
  if lsof -i:$PORT_FORWARD_PORT >/dev/null 2>&1; then
    log "ERROR: Port $PORT_FORWARD_PORT is already in use. Please free this port and try again."
    exit 1
  fi
}

# Find the database pod in Kubernetes
log "Finding database pod in the $K8S_NAMESPACE namespace..."
STAGING_DB_POD=$(kubectl get pod -l $DB_LABEL -n $K8S_NAMESPACE -o jsonpath='{.items[0].metadata.name}' 2>/dev/null)

if [[ -z "$STAGING_DB_POD" ]]; then
  log "ERROR: Could not find a database pod with label $DB_LABEL in namespace $K8S_NAMESPACE"
  exit 1
fi

log "Found database pod: $STAGING_DB_POD"

# Check if port is available
check_port

# Set up port forwarding
log "Setting up port-forwarding to $PORT_FORWARD_PORT:5432..."
kubectl port-forward "$STAGING_DB_POD" $PORT_FORWARD_PORT:5432 -n $K8S_NAMESPACE &
PID=$!

# Give port forwarding a moment to establish
sleep 2

# Clean up port forwarding when the script exits
trap '{
  log "Cleaning up port-forwarding process (PID: $PID)..."
  kill $PID 2>/dev/null || true
  log "Script completed."
}' EXIT INT TERM

# Wait for port forwarding to be established with timeout
# TODO: Use a more robust method to check if port-forwarding is established, since this gives an exit code that causes the diff to not run.
log "Waiting for port-forwarding to be established (timeout: 15s)..."
MAX_RETRIES=15
count=0
while true; do
  # Use a different check method that doesn't exit the script
  if (echo > /dev/tcp/localhost/$PORT_FORWARD_PORT) >/dev/null 2>&1; then
    log "Port-forwarding successfully established"
    break
  fi

  if [[ $count -ge $MAX_RETRIES ]]; then
    log "ERROR: Port-forwarding failed to establish within timeout period"
    exit 1
  fi

  sleep 1
  ((count++))
done

# Run the database comparison
log "┌────────────────────────────────────────────────────────┐"
log "│ RUNNING DATABASE COMPARISON                            │"
log "└────────────────────────────────────────────────────────┘"
npx prisma migrate diff --from-url "$STAGING_DB_URL" --to-url "$LOCAL_DB_URL"

log "Database comparison completed successfully"
