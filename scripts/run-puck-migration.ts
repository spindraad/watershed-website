import fs from 'fs/promises';
import type { Data } from '@puckeditor/core';
import { migrate } from '@puckeditor/core';
import { program } from 'commander';
import { config, type Props, type RootProps } from '../app/config/puck.config';

program
  .requiredOption('-i, --input <path>', 'Path to the database dump file')
  .requiredOption('-o, --output <path>', 'Path to save the migrated data');

program.parse(process.argv);

const options = program.opts();

type PuckData = Data<Props, RootProps>;
type Page = {
  id: string;
  content: PuckData['content'];
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
    const localizedContents: Record<string, PuckData['content']> = {};
    for (const [locale, content] of Object.entries(page.content)) {
      localizedContents[locale] = migrate(content, config);
    }
    return {
      ...page,
      contents: localizedContents,
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
