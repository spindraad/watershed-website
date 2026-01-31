# Stichting Watershed

This repo contains the source code for the newly redesigned website for [Stichting Watershed](https://stichtingwatershed.nl).

## Development

The website is designed to be run in Docker containers. This means you can quickly spin it up locally:

```shell
$ docker build -t watershed-website .
$ docker run -p 8080:80 watershed-website
```

Then, you can access the website at [http://localhost:8080](http://localhost:8080).

### Migrating Puck data

When we update Puck or change the structure of root/component props, we need to migrate the data stored in the database. The migration script handles two types of migrations:

1. **Puck structural migrations** - Automatically applied when updating Puck versions (handled by Puck's `migrate()` function)
2. **Prop migrations** - Custom migrations for changes to root or component prop structures (defined in `scripts/migrations/`)

To run the migration:

1. First, dump the `Page` table from the database to a JSON file.
2. Run the migration script:

```shell
$ npm run migrate-puck-data -- --input path/to/input.json --output path/to/output.json
```

3. Finally, import the migrated data back into the table (you need to empty the table first).

#### Adding new prop migrations

When changing the structure of root props (in `app/config/puck.config.tsx`), add a new migration to `scripts/migrations/root-props.ts`:

```typescript
export const MIGRATION_V2_EXAMPLE: RootPropMigration = {
  version: 2,
  description: 'Description of what this migration does',
  migrate: (props) => {
    // Transform old props structure to new structure
    return { ...props, newField: 'default' };
  },
};

// Add to the migrations array
export const ROOT_PROP_MIGRATIONS: RootPropMigration[] = [
  MIGRATION_V1_TITLE_FLATTEN,
  MIGRATION_V2_EXAMPLE, // Add new migrations here
];
```

## Deployment

The website is deployed using GitHub Actions. The deployment process is triggered by tagging a release with `npm run release <release-name|version>`.
The deployment is being done on a dev cluster or on production based on whether a beta version is being tagged.

### Prerequisites

Before deploying the website on a cluster, you need to have a DO Spaces bucket created. You can do this through [DO's portal](https://docs.digitalocean.com/products/kubernetes/how-to/use-spaces/).
You also need to have a DO Spaces access key and secret key.

Keep in mind:

- The region is `ams3`.
- Enable CDN.
- The names for the buckets are `watershed-dev-bucket` and `watershed-production-bucket`.
- Create access keys for the buckets and store those in `.env`.
