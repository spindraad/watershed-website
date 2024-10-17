import fse from 'fs-extra';
import path from 'path';
const topDir = import.meta.dirname;
fse.emptyDirSync(path.join(topDir, 'public', 'shoelace-assets'));
fse.copySync(
  path.join(
    topDir,
    'node_modules',
    '@shoelace-style/shoelace',
    'dist',
    'assets',
  ),
  path.join(topDir, 'public', 'shoelace-assets'),
  { overwrite: true },
);
