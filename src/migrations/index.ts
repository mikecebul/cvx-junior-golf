import * as migration_20240929_080016 from './20240929_080016';

export const migrations = [
  {
    up: migration_20240929_080016.up,
    down: migration_20240929_080016.down,
    name: '20240929_080016'
  },
];
