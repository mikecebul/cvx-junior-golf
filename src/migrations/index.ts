import * as migration_20240924_222046 from './20240924_222046';
import * as migration_20240925_203339 from './20240925_203339';
import * as migration_20240926_210201 from './20240926_210201';
import * as migration_20240927_151412 from './20240927_151412';
import * as migration_20240927_222623 from './20240927_222623';

export const migrations = [
  {
    up: migration_20240924_222046.up,
    down: migration_20240924_222046.down,
    name: '20240924_222046',
  },
  {
    up: migration_20240925_203339.up,
    down: migration_20240925_203339.down,
    name: '20240925_203339',
  },
  {
    up: migration_20240926_210201.up,
    down: migration_20240926_210201.down,
    name: '20240926_210201',
  },
  {
    up: migration_20240927_151412.up,
    down: migration_20240927_151412.down,
    name: '20240927_151412',
  },
  {
    up: migration_20240927_222623.up,
    down: migration_20240927_222623.down,
    name: '20240927_222623'
  },
];
