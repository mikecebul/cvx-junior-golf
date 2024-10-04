import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.run(sql`ALTER TABLE \`form_submissions\` RENAME COLUMN \`status\` TO \`payment_status\`;`)
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.run(sql`ALTER TABLE \`form_submissions\` RENAME COLUMN \`payment_status\` TO \`status\`;`)
}
