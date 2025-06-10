import * as migration_20241118_212523_migration from './20241118_212523_migration';
import * as migration_20250606_175616_migration from './20250606_175616_migration';
import * as migration_20250610_202302_migration from './20250610_202302_migration';

export const migrations = [
  {
    up: migration_20241118_212523_migration.up,
    down: migration_20241118_212523_migration.down,
    name: '20241118_212523_migration',
  },
  {
    up: migration_20250606_175616_migration.up,
    down: migration_20250606_175616_migration.down,
    name: '20250606_175616_migration',
  },
  {
    up: migration_20250610_202302_migration.up,
    down: migration_20250610_202302_migration.down,
    name: '20250610_202302_migration'
  },
];
