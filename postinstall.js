import fse from 'fs-extra';
import path from 'path';
const topDir = import.meta.dirname;

// Copy Shoelace assets to public directory
fse.emptyDirSync(path.join(topDir, 'public', 'shoelace-assets', 'assets'));
fse.copySync(
  path.join(
    topDir,
    'node_modules',
    '@shoelace-style/shoelace',
    'dist',
    'assets',
  ),
  path.join(topDir, 'public', 'shoelace-assets', 'assets'),
  { overwrite: true },
);
