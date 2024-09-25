import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.run(sql`CREATE TABLE \`pages_blocks_rich_text\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`subtitle\` text,
  	\`rich_content\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await payload.db.drizzle.run(sql`CREATE TABLE \`pages_blocks_events_page_announcements\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`description\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_events_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await payload.db.drizzle.run(sql`CREATE TABLE \`pages_blocks_events_page\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await payload.db.drizzle.run(sql`CREATE TABLE \`_pages_v_blocks_rich_text\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`subtitle\` text,
  	\`rich_content\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await payload.db.drizzle.run(sql`CREATE TABLE \`_pages_v_blocks_events_page_announcements\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`description\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_events_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await payload.db.drizzle.run(sql`CREATE TABLE \`_pages_v_blocks_events_page\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await payload.db.drizzle.run(sql`DROP TABLE \`pages_blocks_about_us\`;`)
  await payload.db.drizzle.run(sql`DROP TABLE \`_pages_v_blocks_about_us\`;`)
  await payload.db.drizzle.run(sql`CREATE INDEX \`pages_blocks_rich_text_order_idx\` ON \`pages_blocks_rich_text\` (\`_order\`);`)
  await payload.db.drizzle.run(sql`CREATE INDEX \`pages_blocks_rich_text_parent_id_idx\` ON \`pages_blocks_rich_text\` (\`_parent_id\`);`)
  await payload.db.drizzle.run(sql`CREATE INDEX \`pages_blocks_rich_text_path_idx\` ON \`pages_blocks_rich_text\` (\`_path\`);`)
  await payload.db.drizzle.run(sql`CREATE INDEX \`pages_blocks_events_page_announcements_order_idx\` ON \`pages_blocks_events_page_announcements\` (\`_order\`);`)
  await payload.db.drizzle.run(sql`CREATE INDEX \`pages_blocks_events_page_announcements_parent_id_idx\` ON \`pages_blocks_events_page_announcements\` (\`_parent_id\`);`)
  await payload.db.drizzle.run(sql`CREATE INDEX \`pages_blocks_events_page_order_idx\` ON \`pages_blocks_events_page\` (\`_order\`);`)
  await payload.db.drizzle.run(sql`CREATE INDEX \`pages_blocks_events_page_parent_id_idx\` ON \`pages_blocks_events_page\` (\`_parent_id\`);`)
  await payload.db.drizzle.run(sql`CREATE INDEX \`pages_blocks_events_page_path_idx\` ON \`pages_blocks_events_page\` (\`_path\`);`)
  await payload.db.drizzle.run(sql`CREATE INDEX \`_pages_v_blocks_rich_text_order_idx\` ON \`_pages_v_blocks_rich_text\` (\`_order\`);`)
  await payload.db.drizzle.run(sql`CREATE INDEX \`_pages_v_blocks_rich_text_parent_id_idx\` ON \`_pages_v_blocks_rich_text\` (\`_parent_id\`);`)
  await payload.db.drizzle.run(sql`CREATE INDEX \`_pages_v_blocks_rich_text_path_idx\` ON \`_pages_v_blocks_rich_text\` (\`_path\`);`)
  await payload.db.drizzle.run(sql`CREATE INDEX \`_pages_v_blocks_events_page_announcements_order_idx\` ON \`_pages_v_blocks_events_page_announcements\` (\`_order\`);`)
  await payload.db.drizzle.run(sql`CREATE INDEX \`_pages_v_blocks_events_page_announcements_parent_id_idx\` ON \`_pages_v_blocks_events_page_announcements\` (\`_parent_id\`);`)
  await payload.db.drizzle.run(sql`CREATE INDEX \`_pages_v_blocks_events_page_order_idx\` ON \`_pages_v_blocks_events_page\` (\`_order\`);`)
  await payload.db.drizzle.run(sql`CREATE INDEX \`_pages_v_blocks_events_page_parent_id_idx\` ON \`_pages_v_blocks_events_page\` (\`_parent_id\`);`)
  await payload.db.drizzle.run(sql`CREATE INDEX \`_pages_v_blocks_events_page_path_idx\` ON \`_pages_v_blocks_events_page\` (\`_path\`);`)
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.run(sql`CREATE TABLE \`pages_blocks_about_us\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`subtitle\` text DEFAULT 'Where it started & where we''re going',
  	\`rich_content\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await payload.db.drizzle.run(sql`CREATE TABLE \`_pages_v_blocks_about_us\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`subtitle\` text DEFAULT 'Where it started & where we''re going',
  	\`rich_content\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await payload.db.drizzle.run(sql`DROP TABLE \`pages_blocks_rich_text\`;`)
  await payload.db.drizzle.run(sql`DROP TABLE \`pages_blocks_events_page_announcements\`;`)
  await payload.db.drizzle.run(sql`DROP TABLE \`pages_blocks_events_page\`;`)
  await payload.db.drizzle.run(sql`DROP TABLE \`_pages_v_blocks_rich_text\`;`)
  await payload.db.drizzle.run(sql`DROP TABLE \`_pages_v_blocks_events_page_announcements\`;`)
  await payload.db.drizzle.run(sql`DROP TABLE \`_pages_v_blocks_events_page\`;`)
  await payload.db.drizzle.run(sql`CREATE INDEX \`pages_blocks_about_us_order_idx\` ON \`pages_blocks_about_us\` (\`_order\`);`)
  await payload.db.drizzle.run(sql`CREATE INDEX \`pages_blocks_about_us_parent_id_idx\` ON \`pages_blocks_about_us\` (\`_parent_id\`);`)
  await payload.db.drizzle.run(sql`CREATE INDEX \`pages_blocks_about_us_path_idx\` ON \`pages_blocks_about_us\` (\`_path\`);`)
  await payload.db.drizzle.run(sql`CREATE INDEX \`_pages_v_blocks_about_us_order_idx\` ON \`_pages_v_blocks_about_us\` (\`_order\`);`)
  await payload.db.drizzle.run(sql`CREATE INDEX \`_pages_v_blocks_about_us_parent_id_idx\` ON \`_pages_v_blocks_about_us\` (\`_parent_id\`);`)
  await payload.db.drizzle.run(sql`CREATE INDEX \`_pages_v_blocks_about_us_path_idx\` ON \`_pages_v_blocks_about_us\` (\`_path\`);`)
}
