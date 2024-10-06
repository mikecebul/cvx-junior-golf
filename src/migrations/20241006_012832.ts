import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.run(sql`ALTER TABLE \`pages_blocks_links_block_link_cards\` ADD \`link_type\` text DEFAULT 'link';`)
  await payload.db.drizzle.run(sql`ALTER TABLE \`pages_blocks_links_block_link_cards\` ADD \`image_upload_option\` text DEFAULT 'generate';`)
  await payload.db.drizzle.run(sql`ALTER TABLE \`_pages_v_blocks_links_block_link_cards\` ADD \`link_type\` text DEFAULT 'link';`)
  await payload.db.drizzle.run(sql`ALTER TABLE \`_pages_v_blocks_links_block_link_cards\` ADD \`image_upload_option\` text DEFAULT 'generate';`)
  await payload.db.drizzle.run(sql`ALTER TABLE \`forms\` ADD \`confirmation_type\` text DEFAULT 'message';`)
  await payload.db.drizzle.run(sql`ALTER TABLE \`pages_blocks_links_block_link_cards\` DROP COLUMN \`linkType\`;`)
  await payload.db.drizzle.run(sql`ALTER TABLE \`pages_blocks_links_block_link_cards\` DROP COLUMN \`imageUploadOption\`;`)
  await payload.db.drizzle.run(sql`ALTER TABLE \`_pages_v_blocks_links_block_link_cards\` DROP COLUMN \`linkType\`;`)
  await payload.db.drizzle.run(sql`ALTER TABLE \`_pages_v_blocks_links_block_link_cards\` DROP COLUMN \`imageUploadOption\`;`)
  await payload.db.drizzle.run(sql`ALTER TABLE \`forms\` DROP COLUMN \`confirmationType\`;`)
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.run(sql`ALTER TABLE \`pages_blocks_links_block_link_cards\` ADD \`linkType\` text DEFAULT 'link';`)
  await payload.db.drizzle.run(sql`ALTER TABLE \`pages_blocks_links_block_link_cards\` ADD \`imageUploadOption\` text DEFAULT 'generate';`)
  await payload.db.drizzle.run(sql`ALTER TABLE \`_pages_v_blocks_links_block_link_cards\` ADD \`linkType\` text DEFAULT 'link';`)
  await payload.db.drizzle.run(sql`ALTER TABLE \`_pages_v_blocks_links_block_link_cards\` ADD \`imageUploadOption\` text DEFAULT 'generate';`)
  await payload.db.drizzle.run(sql`ALTER TABLE \`forms\` ADD \`confirmationType\` text DEFAULT 'message';`)
  await payload.db.drizzle.run(sql`ALTER TABLE \`pages_blocks_links_block_link_cards\` DROP COLUMN \`link_type\`;`)
  await payload.db.drizzle.run(sql`ALTER TABLE \`pages_blocks_links_block_link_cards\` DROP COLUMN \`image_upload_option\`;`)
  await payload.db.drizzle.run(sql`ALTER TABLE \`_pages_v_blocks_links_block_link_cards\` DROP COLUMN \`link_type\`;`)
  await payload.db.drizzle.run(sql`ALTER TABLE \`_pages_v_blocks_links_block_link_cards\` DROP COLUMN \`image_upload_option\`;`)
  await payload.db.drizzle.run(sql`ALTER TABLE \`forms\` DROP COLUMN \`confirmation_type\`;`)
}
