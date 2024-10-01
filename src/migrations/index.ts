import * as migration_20240930_195540 from './20240930_195540';
import * as migration_20241001_142328 from './20241001_142328';

export const migrations = [
  {
    up: migration_20240930_195540.up,
    down: migration_20240930_195540.down,
    name: '20240930_195540',
  },
  {
    up: migration_20241001_142328.up,
    down: migration_20241001_142328.down,
    name: '20241001_142328'
  },
];
