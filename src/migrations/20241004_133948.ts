import { MigrateUpArgs, MigrateDownArgs } from '@payloadcms/db-sqlite'
import { seedDown, seedUp } from './seed'

export async function up({ payload }: MigrateUpArgs): Promise<void> {
  await seedUp({ payload })
}

export async function down({ payload }: MigrateDownArgs): Promise<void> {
  await seedDown({ payload })
}
