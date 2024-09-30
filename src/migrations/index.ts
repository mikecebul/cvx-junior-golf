import * as migration_20240930_195540 from './20240930_195540';

export const migrations = [
  {
    up: migration_20240930_195540.up,
    down: migration_20240930_195540.down,
    name: '20240930_195540'
  },
];
