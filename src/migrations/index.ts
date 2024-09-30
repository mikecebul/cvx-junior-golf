import * as migration_20240930_042850 from './20240930_042850';

export const migrations = [
  {
    up: migration_20240930_042850.up,
    down: migration_20240930_042850.down,
    name: '20240930_042850'
  },
];
