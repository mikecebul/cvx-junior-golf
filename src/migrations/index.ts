import * as migration_20240923_211729 from './20240923_211729';
import * as migration_20240923_212248 from './20240923_212248';
import * as migration_20240923_215603 from './20240923_215603';

export const migrations = [
  {
    up: migration_20240923_211729.up,
    down: migration_20240923_211729.down,
    name: '20240923_211729',
  },
  {
    up: migration_20240923_212248.up,
    down: migration_20240923_212248.down,
    name: '20240923_212248',
  },
  {
    up: migration_20240923_215603.up,
    down: migration_20240923_215603.down,
    name: '20240923_215603'
  },
];
