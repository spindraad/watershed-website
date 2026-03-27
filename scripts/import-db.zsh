#!/bin/zsh

set -e

# ===============================================================
# DATABASE IMPORT SCRIPT
# ===============================================================
# This script imports a PostgreSQL dump file into the staging/dev
# database running in Kubernetes.
#
# Usage: ./scripts/import-db.zsh <dump-file.sql>
#
# The script reads configuration from values.yaml to determine
# the pod name and namespace automatically.
# ===============================================================

# Check if a dump file argument was provided
if [[ -z "$1" ]]; then
  echo "ERROR: No dump file provided."
  echo "Usage: $0 <dump-file.sql>"
  exit 1
fi

DUMP_FILE="$1"

# Check if the dump file exists
if [[ ! -f "$DUMP_FILE" ]]; then
  echo "ERROR: Dump file not found: $DUMP_FILE"
  exit 1
fi

# Check if run from the root directory (with values.yaml)
if [[ ! -f values.yaml ]]; then
  echo "ERROR: This script must be run from the root directory of the project."
  exit 1
fi

# Function to log with timestamp
log() {
  echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1"
}

# Read configuration from values.yaml
log "Reading configuration from values.yaml..."

APP_NAME=$(yq '.app.name' values.yaml)
NAMESPACE=$(yq '.app.namespace' values.yaml)
DB_USER=$(yq '.postgresql.auth.username' values.yaml)
DB_NAME=$(yq '.postgresql.auth.database' values.yaml)

if [[ -z "$APP_NAME" || -z "$NAMESPACE" || -z "$DB_USER" || -z "$DB_NAME" ]]; then
  echo "ERROR: Could not read required values from values.yaml"
  exit 1
fi

DB_LABEL="app=${APP_NAME}-postgresql"

log "Configuration:"
log "  App name:  $APP_NAME"
log "  Namespace: $NAMESPACE"
log "  DB user:   $DB_USER"
log "  DB name:   $DB_NAME"
log "  Dump file: $DUMP_FILE"

# Find the database pod in Kubernetes
log "Finding database pod in the $NAMESPACE namespace..."
DB_POD=$(kubectl get pod -l "$DB_LABEL" -n "$NAMESPACE" -o jsonpath='{.items[0].metadata.name}' 2>/dev/null)

if [[ -z "$DB_POD" ]]; then
  log "ERROR: Could not find a database pod with label $DB_LABEL in namespace $NAMESPACE"
  exit 1
fi

log "Found database pod: $DB_POD"

# Confirm before proceeding
echo ""
echo "This will import the dump file into the database."
echo "Existing data may be overwritten depending on the dump contents."
echo ""
read -q "REPLY?Do you want to proceed? (y/n) "
echo ""

if [[ ! $REPLY =~ ^[Yy]$ ]]; then
  log "Import cancelled."
  exit 0
fi

# Run the import
log "┌────────────────────────────────────────────────────────┐"
log "│ IMPORTING DATABASE                                     │"
log "└────────────────────────────────────────────────────────┘"

kubectl exec -i "$DB_POD" -n "$NAMESPACE" -- psql -U "$DB_USER" -d "$DB_NAME" < "$DUMP_FILE"

log "Database import completed successfully"