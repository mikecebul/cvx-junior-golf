import * as migration_20241006_051221 from './20241006_051221';

export const migrations = [
  {
    up: migration_20241006_051221.up,
    down: migration_20241006_051221.down,
    name: '20241006_051221'
  },
];
