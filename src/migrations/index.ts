import * as migration_20241001_150304 from './20241001_150304';

export const migrations = [
  {
    up: migration_20241001_150304.up,
    down: migration_20241001_150304.down,
    name: '20241001_150304'
  },
];
