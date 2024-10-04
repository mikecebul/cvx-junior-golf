import * as migration_20241001_150304 from './20241001_150304'
import * as migration_20241004_133854 from './20241004_133854'
// import * as migration_20241004_133948 from './20241004_133948'

export const migrations = [
  {
    up: migration_20241001_150304.up,
    down: migration_20241001_150304.down,
    name: '20241001_150304',
  },
  {
    up: migration_20241004_133854.up,
    down: migration_20241004_133854.down,
    name: '20241004_133854',
  },
  // {
  //   up: migration_20241004_133948.up,
  //   down: migration_20241004_133948.down,
  //   name: '20241004_133948'
  // },
]
