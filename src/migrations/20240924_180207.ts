import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.run(sql`ALTER TABLE \`pages_blocks_hero\` DROP COLUMN \`high_impact_phone_number\`;`)
  await payload.db.drizzle.run(sql`ALTER TABLE \`pages_blocks_hero\` DROP COLUMN \`high_impact_svg\`;`)
  await payload.db.drizzle.run(sql`ALTER TABLE \`_pages_v_blocks_hero\` DROP COLUMN \`high_impact_phone_number\`;`)
  await payload.db.drizzle.run(sql`ALTER TABLE \`_pages_v_blocks_hero\` DROP COLUMN \`high_impact_svg\`;`)
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.run(sql`ALTER TABLE \`pages_blocks_hero\` ADD \`high_impact_phone_number\` text DEFAULT '(231) 547-1144';`)
  await payload.db.drizzle.run(sql`ALTER TABLE \`pages_blocks_hero\` ADD \`high_impact_svg\` integer DEFAULT true;`)
  await payload.db.drizzle.run(sql`ALTER TABLE \`_pages_v_blocks_hero\` ADD \`high_impact_phone_number\` text DEFAULT '(231) 547-1144';`)
  await payload.db.drizzle.run(sql`ALTER TABLE \`_pages_v_blocks_hero\` ADD \`high_impact_svg\` integer DEFAULT true;`)
}
