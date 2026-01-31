import fs from 'fs/promises';
import type { Data, Config } from '@puckeditor/core';
import { migrate } from '@puckeditor/core';
import { program } from 'commander';
import { config, type Props, type RootProps } from '../app/config/puck.config';
import { migrateRootProps } from './migrations/root-props';

program
  .requiredOption('-i, --input <path>', 'Path to the database dump file')
  .requiredOption('-o, --output <path>', 'Path to save the migrated data');

program.parse(process.argv);

const options = program.opts();

type PuckConfig = Config<Props, RootProps>;
type PuckData = Data<Props, RootProps>;
type LocalisedPageData = {
  en: PuckData;
  nl: PuckData;
  pap: PuckData;
};

type Page = {
  id: string;
  content: LocalisedPageData;
  slug: string;
  createdAt: string;
  updatedAt: string;
};

async function main() {
  console.log('🚚 starting puck migration...');

  const pages = await readDatabaseDump(options.input);
  const migratedData = await migrateData(pages);
  await saveMigratedData(options.output, migratedData);

  console.log(
    `✅ Migration complete. Migrated data saved to ${options.output}`,
  );
}

async function migrateData(pages: Page[]) {
  console.log('Migrating data with Puck...');

  if (!Array.isArray(pages)) {
    throw new Error('Invalid data format: expected an array of pages.');
  }

  const migratedData: Page[] = pages.map((page) => {
    // Pages are localized in en, nl, and pap
    // So we need to migrate each localization separately
    const localizedContents: LocalisedPageData = {
      en: {} as PuckData,
      nl: {} as PuckData,
      pap: {} as PuckData,
    };

    for (const [locale, content] of Object.entries(page.content)) {
      // First run Puck's structural migration
      const structurallyMigrated = migrate<PuckConfig>(content, config);

      // Then run our custom root prop migrations
      localizedContents[locale as keyof LocalisedPageData] = {
        ...structurallyMigrated,
        root: {
          ...structurallyMigrated.root,
          props: migrateRootProps(structurallyMigrated.root.props || {}),
        },
      };
    }
    return {
      ...page,
      content: localizedContents,
    };
  });

  console.log('Data migration complete.');

  return migratedData;
}

async function readDatabaseDump(filePath: string) {
  const contents = await fs.readFile(filePath, {
    encoding: 'utf-8',
  });

  return JSON.parse(contents);
}

function saveMigratedData(filePath: string, data: Page[]) {
  return fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
}

main();
