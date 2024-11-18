import * as migration_20241118_212523_migration from './20241118_212523_migration';

export const migrations = [
  {
    up: migration_20241118_212523_migration.up,
    down: migration_20241118_212523_migration.down,
    name: '20241118_212523_migration'
  },
];
