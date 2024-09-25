import * as migration_20240924_222046 from './20240924_222046';
import * as migration_20240925_203339 from './20240925_203339';

export const migrations = [
  {
    up: migration_20240924_222046.up,
    down: migration_20240924_222046.down,
    name: '20240924_222046',
  },
  {
    up: migration_20240925_203339.up,
    down: migration_20240925_203339.down,
    name: '20240925_203339'
  },
];
