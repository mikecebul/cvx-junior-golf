import * as migration_20241005_145852 from './20241005_145852';
import * as migration_20241006_012832 from './20241006_012832';

export const migrations = [
  {
    up: migration_20241005_145852.up,
    down: migration_20241005_145852.down,
    name: '20241005_145852',
  },
  {
    up: migration_20241006_012832.up,
    down: migration_20241006_012832.down,
    name: '20241006_012832'
  },
];
