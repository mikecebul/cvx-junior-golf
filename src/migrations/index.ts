import * as migration_20241006_054028 from './20241006_054028';
import * as migration_20241017_005657 from './20241017_005657';
import * as migration_20241017_031547 from './20241017_031547';

export const migrations = [
  {
    up: migration_20241006_054028.up,
    down: migration_20241006_054028.down,
    name: '20241006_054028',
  },
  {
    up: migration_20241017_005657.up,
    down: migration_20241017_005657.down,
    name: '20241017_005657',
  },
  {
    up: migration_20241017_031547.up,
    down: migration_20241017_031547.down,
    name: '20241017_031547'
  },
];
