import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {}
