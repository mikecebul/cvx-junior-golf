import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.run(sql`CREATE TABLE \`pages_blocks_hero_high_impact_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`link_type\` text DEFAULT 'reference',
  	\`link_new_tab\` integer,
  	\`link_url\` text,
  	\`link_label\` text,
  	\`link_appearance\` text DEFAULT 'default',
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_hero\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await payload.db.drizzle.run(sql`CREATE TABLE \`pages_blocks_hero\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`type\` text DEFAULT 'mediumImpact',
  	\`high_impact_title\` text DEFAULT 'Charlevoix Junior Golf League',
  	\`high_impact_description\` text DEFAULT 'Join the Charlevoix Junior Golf League and develop your skills in a fun, competitive environment.',
  	\`high_impact_image_id\` integer,
  	\`medium_impact_subtitle\` text,
  	\`medium_impact_title\` text,
  	\`medium_impact_description\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`high_impact_image_id\`) REFERENCES \`landscapes\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await payload.db.drizzle.run(sql`CREATE TABLE \`pages_blocks_events\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`description\` text,
  	\`image_id\` integer,
  	\`block_name\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`landscapes\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await payload.db.drizzle.run(sql`CREATE TABLE \`pages_blocks_how_it_works_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`link_type\` text DEFAULT 'reference',
  	\`link_new_tab\` integer,
  	\`link_url\` text,
  	\`link_label\` text,
  	\`link_appearance\` text DEFAULT 'default',
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_how_it_works\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await payload.db.drizzle.run(sql`CREATE TABLE \`pages_blocks_how_it_works\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`description\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await payload.db.drizzle.run(sql`CREATE TABLE \`pages_blocks_history_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`description\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_history\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await payload.db.drizzle.run(sql`CREATE TABLE \`pages_blocks_history\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`description\` text,
  	\`image_id\` integer,
  	\`link_type\` text DEFAULT 'reference',
  	\`link_new_tab\` integer,
  	\`link_url\` text,
  	\`link_label\` text,
  	\`link_appearance\` text DEFAULT 'default',
  	\`block_name\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`landscapes\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await payload.db.drizzle.run(sql`CREATE TABLE \`pages_blocks_resources\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`description\` text,
  	\`image_id\` integer,
  	\`link_type\` text DEFAULT 'reference',
  	\`link_new_tab\` integer,
  	\`link_url\` text,
  	\`link_label\` text,
  	\`link_appearance\` text DEFAULT 'default',
  	\`block_name\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`landscapes\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
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
  await payload.db.drizzle.run(sql`CREATE TABLE \`pages_blocks_links_block_link_cards\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`linkType\` text DEFAULT 'link',
  	\`title\` text,
  	\`description\` text,
  	\`imageUploadOption\` text DEFAULT 'generate',
  	\`keywords\` text,
  	\`image_id\` integer,
  	\`href\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`cards\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_links_block\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await payload.db.drizzle.run(sql`CREATE TABLE \`pages_blocks_links_block\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await payload.db.drizzle.run(sql`CREATE TABLE \`pages\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`meta_hide_from_search_engines\` integer DEFAULT false,
  	\`meta_metadata_title\` text,
  	\`meta_metadata_image_id\` integer,
  	\`meta_metadata_description\` text,
  	\`published_at\` text,
  	\`slug\` text,
  	\`slug_lock\` integer DEFAULT true,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`_status\` text DEFAULT 'draft',
  	FOREIGN KEY (\`meta_metadata_image_id\`) REFERENCES \`meta_images\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await payload.db.drizzle.run(sql`CREATE TABLE \`pages_rels\` (
  	\`id\` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`pages_id\` integer,
  	\`files_id\` integer,
  	\`events_id\` integer,
  	\`resources_id\` integer,
  	\`landscapes_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`pages_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`files_id\`) REFERENCES \`files\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`events_id\`) REFERENCES \`events\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`resources_id\`) REFERENCES \`resources\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`landscapes_id\`) REFERENCES \`landscapes\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await payload.db.drizzle.run(sql`CREATE TABLE \`_pages_v_blocks_hero_high_impact_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`link_type\` text DEFAULT 'reference',
  	\`link_new_tab\` integer,
  	\`link_url\` text,
  	\`link_label\` text,
  	\`link_appearance\` text DEFAULT 'default',
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_hero\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await payload.db.drizzle.run(sql`CREATE TABLE \`_pages_v_blocks_hero\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`type\` text DEFAULT 'mediumImpact',
  	\`high_impact_title\` text DEFAULT 'Charlevoix Junior Golf League',
  	\`high_impact_description\` text DEFAULT 'Join the Charlevoix Junior Golf League and develop your skills in a fun, competitive environment.',
  	\`high_impact_image_id\` integer,
  	\`medium_impact_subtitle\` text,
  	\`medium_impact_title\` text,
  	\`medium_impact_description\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`high_impact_image_id\`) REFERENCES \`landscapes\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await payload.db.drizzle.run(sql`CREATE TABLE \`_pages_v_blocks_events\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`description\` text,
  	\`image_id\` integer,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`landscapes\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await payload.db.drizzle.run(sql`CREATE TABLE \`_pages_v_blocks_how_it_works_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`link_type\` text DEFAULT 'reference',
  	\`link_new_tab\` integer,
  	\`link_url\` text,
  	\`link_label\` text,
  	\`link_appearance\` text DEFAULT 'default',
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_how_it_works\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await payload.db.drizzle.run(sql`CREATE TABLE \`_pages_v_blocks_how_it_works\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`description\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await payload.db.drizzle.run(sql`CREATE TABLE \`_pages_v_blocks_history_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`description\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_history\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await payload.db.drizzle.run(sql`CREATE TABLE \`_pages_v_blocks_history\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`description\` text,
  	\`image_id\` integer,
  	\`link_type\` text DEFAULT 'reference',
  	\`link_new_tab\` integer,
  	\`link_url\` text,
  	\`link_label\` text,
  	\`link_appearance\` text DEFAULT 'default',
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`landscapes\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await payload.db.drizzle.run(sql`CREATE TABLE \`_pages_v_blocks_resources\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`description\` text,
  	\`image_id\` integer,
  	\`link_type\` text DEFAULT 'reference',
  	\`link_new_tab\` integer,
  	\`link_url\` text,
  	\`link_label\` text,
  	\`link_appearance\` text DEFAULT 'default',
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`landscapes\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
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
  await payload.db.drizzle.run(sql`CREATE TABLE \`_pages_v_blocks_links_block_link_cards\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`linkType\` text DEFAULT 'link',
  	\`title\` text,
  	\`description\` text,
  	\`imageUploadOption\` text DEFAULT 'generate',
  	\`keywords\` text,
  	\`image_id\` integer,
  	\`href\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`cards\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_links_block\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await payload.db.drizzle.run(sql`CREATE TABLE \`_pages_v_blocks_links_block\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await payload.db.drizzle.run(sql`CREATE TABLE \`_pages_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`parent_id\` integer,
  	\`version_title\` text,
  	\`version_meta_hide_from_search_engines\` integer DEFAULT false,
  	\`version_meta_metadata_title\` text,
  	\`version_meta_metadata_image_id\` integer,
  	\`version_meta_metadata_description\` text,
  	\`version_published_at\` text,
  	\`version_slug\` text,
  	\`version_slug_lock\` integer DEFAULT true,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`version__status\` text DEFAULT 'draft',
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`latest\` integer,
  	\`autosave\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_meta_metadata_image_id\`) REFERENCES \`meta_images\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await payload.db.drizzle.run(sql`CREATE TABLE \`_pages_v_rels\` (
  	\`id\` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`pages_id\` integer,
  	\`files_id\` integer,
  	\`events_id\` integer,
  	\`resources_id\` integer,
  	\`landscapes_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`pages_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`files_id\`) REFERENCES \`files\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`events_id\`) REFERENCES \`events\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`resources_id\`) REFERENCES \`resources\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`landscapes_id\`) REFERENCES \`landscapes\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await payload.db.drizzle.run(sql`CREATE TABLE \`events\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`date\` text NOT NULL,
  	\`location\` text NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await payload.db.drizzle.run(sql`CREATE TABLE \`resources_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`link_type\` text DEFAULT 'reference',
  	\`link_new_tab\` integer,
  	\`link_url\` text,
  	\`link_label\` text NOT NULL,
  	\`link_appearance\` text DEFAULT 'default',
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`resources\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await payload.db.drizzle.run(sql`CREATE TABLE \`resources\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`description\` text NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await payload.db.drizzle.run(sql`CREATE TABLE \`resources_rels\` (
  	\`id\` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`pages_id\` integer,
  	\`files_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`resources\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`pages_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`files_id\`) REFERENCES \`files\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await payload.db.drizzle.run(sql`CREATE TABLE \`avatars\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`alt\` text NOT NULL,
  	\`prefix\` text DEFAULT 'avatars',
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`url\` text,
  	\`thumbnail_u_r_l\` text,
  	\`filename\` text,
  	\`mime_type\` text,
  	\`filesize\` numeric,
  	\`width\` numeric,
  	\`height\` numeric,
  	\`focal_x\` numeric,
  	\`focal_y\` numeric,
  	\`sizes_thumbnail_url\` text,
  	\`sizes_thumbnail_width\` numeric,
  	\`sizes_thumbnail_height\` numeric,
  	\`sizes_thumbnail_mime_type\` text,
  	\`sizes_thumbnail_filesize\` numeric,
  	\`sizes_thumbnail_filename\` text
  );
  `)
  await payload.db.drizzle.run(sql`CREATE TABLE \`cards\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`alt\` text NOT NULL,
  	\`prefix\` text DEFAULT 'cards',
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`url\` text,
  	\`thumbnail_u_r_l\` text,
  	\`filename\` text,
  	\`mime_type\` text,
  	\`filesize\` numeric,
  	\`width\` numeric,
  	\`height\` numeric,
  	\`focal_x\` numeric,
  	\`focal_y\` numeric,
  	\`sizes_thumbnail_url\` text,
  	\`sizes_thumbnail_width\` numeric,
  	\`sizes_thumbnail_height\` numeric,
  	\`sizes_thumbnail_mime_type\` text,
  	\`sizes_thumbnail_filesize\` numeric,
  	\`sizes_thumbnail_filename\` text
  );
  `)
  await payload.db.drizzle.run(sql`CREATE TABLE \`landscapes\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`alt\` text NOT NULL,
  	\`prefix\` text DEFAULT 'landscapes',
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`url\` text,
  	\`thumbnail_u_r_l\` text,
  	\`filename\` text,
  	\`mime_type\` text,
  	\`filesize\` numeric,
  	\`width\` numeric,
  	\`height\` numeric,
  	\`focal_x\` numeric,
  	\`focal_y\` numeric,
  	\`sizes_thumbnail_url\` text,
  	\`sizes_thumbnail_width\` numeric,
  	\`sizes_thumbnail_height\` numeric,
  	\`sizes_thumbnail_mime_type\` text,
  	\`sizes_thumbnail_filesize\` numeric,
  	\`sizes_thumbnail_filename\` text
  );
  `)
  await payload.db.drizzle.run(sql`CREATE TABLE \`portraits\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`alt\` text NOT NULL,
  	\`prefix\` text DEFAULT 'portraits',
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`url\` text,
  	\`thumbnail_u_r_l\` text,
  	\`filename\` text,
  	\`mime_type\` text,
  	\`filesize\` numeric,
  	\`width\` numeric,
  	\`height\` numeric,
  	\`focal_x\` numeric,
  	\`focal_y\` numeric,
  	\`sizes_thumbnail_url\` text,
  	\`sizes_thumbnail_width\` numeric,
  	\`sizes_thumbnail_height\` numeric,
  	\`sizes_thumbnail_mime_type\` text,
  	\`sizes_thumbnail_filesize\` numeric,
  	\`sizes_thumbnail_filename\` text
  );
  `)
  await payload.db.drizzle.run(sql`CREATE TABLE \`meta_images\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`alt\` text NOT NULL,
  	\`prefix\` text DEFAULT 'meta',
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`url\` text,
  	\`thumbnail_u_r_l\` text,
  	\`filename\` text,
  	\`mime_type\` text,
  	\`filesize\` numeric,
  	\`width\` numeric,
  	\`height\` numeric,
  	\`focal_x\` numeric,
  	\`focal_y\` numeric,
  	\`sizes_thumbnail_url\` text,
  	\`sizes_thumbnail_width\` numeric,
  	\`sizes_thumbnail_height\` numeric,
  	\`sizes_thumbnail_mime_type\` text,
  	\`sizes_thumbnail_filesize\` numeric,
  	\`sizes_thumbnail_filename\` text
  );
  `)
  await payload.db.drizzle.run(sql`CREATE TABLE \`files\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`prefix\` text DEFAULT 'files',
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`url\` text,
  	\`thumbnail_u_r_l\` text,
  	\`filename\` text,
  	\`mime_type\` text,
  	\`filesize\` numeric,
  	\`width\` numeric,
  	\`height\` numeric,
  	\`focal_x\` numeric,
  	\`focal_y\` numeric
  );
  `)
  await payload.db.drizzle.run(sql`CREATE TABLE \`users\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`role\` text DEFAULT 'editor' NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`email\` text NOT NULL,
  	\`reset_password_token\` text,
  	\`reset_password_expiration\` text,
  	\`salt\` text,
  	\`hash\` text,
  	\`login_attempts\` numeric DEFAULT 0,
  	\`lock_until\` text
  );
  `)
  await payload.db.drizzle.run(sql`CREATE TABLE \`redirects\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`from\` text NOT NULL,
  	\`to_type\` text DEFAULT 'reference',
  	\`to_url\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await payload.db.drizzle.run(sql`CREATE TABLE \`redirects_rels\` (
  	\`id\` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`pages_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`redirects\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`pages_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await payload.db.drizzle.run(sql`CREATE TABLE \`payload_locked_documents\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`global_slug\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await payload.db.drizzle.run(sql`CREATE TABLE \`payload_locked_documents_rels\` (
  	\`id\` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`pages_id\` integer,
  	\`events_id\` integer,
  	\`resources_id\` integer,
  	\`avatars_id\` integer,
  	\`cards_id\` integer,
  	\`landscapes_id\` integer,
  	\`portraits_id\` integer,
  	\`meta_images_id\` integer,
  	\`files_id\` integer,
  	\`users_id\` integer,
  	\`redirects_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payload_locked_documents\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`pages_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`events_id\`) REFERENCES \`events\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`resources_id\`) REFERENCES \`resources\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`avatars_id\`) REFERENCES \`avatars\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`cards_id\`) REFERENCES \`cards\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`landscapes_id\`) REFERENCES \`landscapes\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`portraits_id\`) REFERENCES \`portraits\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`meta_images_id\`) REFERENCES \`meta_images\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`files_id\`) REFERENCES \`files\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`redirects_id\`) REFERENCES \`redirects\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await payload.db.drizzle.run(sql`CREATE TABLE \`payload_preferences\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`key\` text,
  	\`value\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await payload.db.drizzle.run(sql`CREATE TABLE \`payload_preferences_rels\` (
  	\`id\` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payload_preferences\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await payload.db.drizzle.run(sql`CREATE TABLE \`payload_migrations\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`batch\` numeric,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await payload.db.drizzle.run(sql`CREATE TABLE \`header_nav_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`link_type\` text DEFAULT 'reference',
  	\`link_new_tab\` integer,
  	\`link_url\` text,
  	\`link_label\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`header\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await payload.db.drizzle.run(sql`CREATE TABLE \`header\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
  await payload.db.drizzle.run(sql`CREATE TABLE \`header_rels\` (
  	\`id\` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`pages_id\` integer,
  	\`files_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`header\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`pages_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`files_id\`) REFERENCES \`files\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await payload.db.drizzle.run(sql`CREATE TABLE \`footer_page_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`link_type\` text DEFAULT 'reference',
  	\`link_new_tab\` integer,
  	\`link_url\` text,
  	\`link_label\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`footer\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await payload.db.drizzle.run(sql`CREATE TABLE \`footer\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`show_contact\` integer DEFAULT true,
  	\`show_google_map\` integer DEFAULT true,
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
  await payload.db.drizzle.run(sql`CREATE TABLE \`footer_rels\` (
  	\`id\` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`pages_id\` integer,
  	\`files_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`footer\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`pages_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`files_id\`) REFERENCES \`files\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await payload.db.drizzle.run(sql`CREATE TABLE \`company_info_social\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`platform\` text,
  	\`link_type\` text DEFAULT 'reference',
  	\`link_new_tab\` integer,
  	\`link_url\` text,
  	\`link_label\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`company_info\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await payload.db.drizzle.run(sql`CREATE TABLE \`company_info_hours\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`type\` text DEFAULT 'default',
  	\`day\` text,
  	\`hours\` text,
  	\`note\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`company_info\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await payload.db.drizzle.run(sql`CREATE TABLE \`company_info\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`contact_phone\` text DEFAULT '(231) 547-1144',
  	\`contact_fax\` text DEFAULT '(231) 547-4970',
  	\`contact_address\` text DEFAULT '101 M-66 | Charlevoix, MI',
  	\`contact_google_map_link\` text DEFAULT 'https://goo.gl/maps/X956fmf511Fef9Pr7',
  	\`contact_email\` text DEFAULT 'info@basesmi.org',
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
  await payload.db.drizzle.run(sql`CREATE TABLE \`company_info_rels\` (
  	\`id\` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`pages_id\` integer,
  	\`files_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`company_info\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`pages_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`files_id\`) REFERENCES \`files\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await payload.db.drizzle.run(sql`CREATE INDEX \`pages_blocks_hero_high_impact_links_order_idx\` ON \`pages_blocks_hero_high_impact_links\` (\`_order\`);`)
  await payload.db.drizzle.run(sql`CREATE INDEX \`pages_blocks_hero_high_impact_links_parent_id_idx\` ON \`pages_blocks_hero_high_impact_links\` (\`_parent_id\`);`)
  await payload.db.drizzle.run(sql`CREATE INDEX \`pages_blocks_hero_order_idx\` ON \`pages_blocks_hero\` (\`_order\`);`)
  await payload.db.drizzle.run(sql`CREATE INDEX \`pages_blocks_hero_parent_id_idx\` ON \`pages_blocks_hero\` (\`_parent_id\`);`)
  await payload.db.drizzle.run(sql`CREATE INDEX \`pages_blocks_hero_path_idx\` ON \`pages_blocks_hero\` (\`_path\`);`)
  await payload.db.drizzle.run(sql`CREATE INDEX \`pages_blocks_events_order_idx\` ON \`pages_blocks_events\` (\`_order\`);`)
  await payload.db.drizzle.run(sql`CREATE INDEX \`pages_blocks_events_parent_id_idx\` ON \`pages_blocks_events\` (\`_parent_id\`);`)
  await payload.db.drizzle.run(sql`CREATE INDEX \`pages_blocks_events_path_idx\` ON \`pages_blocks_events\` (\`_path\`);`)
  await payload.db.drizzle.run(sql`CREATE INDEX \`pages_blocks_how_it_works_links_order_idx\` ON \`pages_blocks_how_it_works_links\` (\`_order\`);`)
  await payload.db.drizzle.run(sql`CREATE INDEX \`pages_blocks_how_it_works_links_parent_id_idx\` ON \`pages_blocks_how_it_works_links\` (\`_parent_id\`);`)
  await payload.db.drizzle.run(sql`CREATE INDEX \`pages_blocks_how_it_works_order_idx\` ON \`pages_blocks_how_it_works\` (\`_order\`);`)
  await payload.db.drizzle.run(sql`CREATE INDEX \`pages_blocks_how_it_works_parent_id_idx\` ON \`pages_blocks_how_it_works\` (\`_parent_id\`);`)
  await payload.db.drizzle.run(sql`CREATE INDEX \`pages_blocks_how_it_works_path_idx\` ON \`pages_blocks_how_it_works\` (\`_path\`);`)
  await payload.db.drizzle.run(sql`CREATE INDEX \`pages_blocks_history_items_order_idx\` ON \`pages_blocks_history_items\` (\`_order\`);`)
  await payload.db.drizzle.run(sql`CREATE INDEX \`pages_blocks_history_items_parent_id_idx\` ON \`pages_blocks_history_items\` (\`_parent_id\`);`)
  await payload.db.drizzle.run(sql`CREATE INDEX \`pages_blocks_history_order_idx\` ON \`pages_blocks_history\` (\`_order\`);`)
  await payload.db.drizzle.run(sql`CREATE INDEX \`pages_blocks_history_parent_id_idx\` ON \`pages_blocks_history\` (\`_parent_id\`);`)
  await payload.db.drizzle.run(sql`CREATE INDEX \`pages_blocks_history_path_idx\` ON \`pages_blocks_history\` (\`_path\`);`)
  await payload.db.drizzle.run(sql`CREATE INDEX \`pages_blocks_resources_order_idx\` ON \`pages_blocks_resources\` (\`_order\`);`)
  await payload.db.drizzle.run(sql`CREATE INDEX \`pages_blocks_resources_parent_id_idx\` ON \`pages_blocks_resources\` (\`_parent_id\`);`)
  await payload.db.drizzle.run(sql`CREATE INDEX \`pages_blocks_resources_path_idx\` ON \`pages_blocks_resources\` (\`_path\`);`)
  await payload.db.drizzle.run(sql`CREATE INDEX \`pages_blocks_about_us_order_idx\` ON \`pages_blocks_about_us\` (\`_order\`);`)
  await payload.db.drizzle.run(sql`CREATE INDEX \`pages_blocks_about_us_parent_id_idx\` ON \`pages_blocks_about_us\` (\`_parent_id\`);`)
  await payload.db.drizzle.run(sql`CREATE INDEX \`pages_blocks_about_us_path_idx\` ON \`pages_blocks_about_us\` (\`_path\`);`)
  await payload.db.drizzle.run(sql`CREATE INDEX \`pages_blocks_links_block_link_cards_order_idx\` ON \`pages_blocks_links_block_link_cards\` (\`_order\`);`)
  await payload.db.drizzle.run(sql`CREATE INDEX \`pages_blocks_links_block_link_cards_parent_id_idx\` ON \`pages_blocks_links_block_link_cards\` (\`_parent_id\`);`)
  await payload.db.drizzle.run(sql`CREATE INDEX \`pages_blocks_links_block_order_idx\` ON \`pages_blocks_links_block\` (\`_order\`);`)
  await payload.db.drizzle.run(sql`CREATE INDEX \`pages_blocks_links_block_parent_id_idx\` ON \`pages_blocks_links_block\` (\`_parent_id\`);`)
  await payload.db.drizzle.run(sql`CREATE INDEX \`pages_blocks_links_block_path_idx\` ON \`pages_blocks_links_block\` (\`_path\`);`)
  await payload.db.drizzle.run(sql`CREATE INDEX \`pages_slug_idx\` ON \`pages\` (\`slug\`);`)
  await payload.db.drizzle.run(sql`CREATE INDEX \`pages_created_at_idx\` ON \`pages\` (\`created_at\`);`)
  await payload.db.drizzle.run(sql`CREATE INDEX \`pages__status_idx\` ON \`pages\` (\`_status\`);`)
  await payload.db.drizzle.run(sql`CREATE INDEX \`pages_rels_order_idx\` ON \`pages_rels\` (\`order\`);`)
  await payload.db.drizzle.run(sql`CREATE INDEX \`pages_rels_parent_idx\` ON \`pages_rels\` (\`parent_id\`);`)
  await payload.db.drizzle.run(sql`CREATE INDEX \`pages_rels_path_idx\` ON \`pages_rels\` (\`path\`);`)
  await payload.db.drizzle.run(sql`CREATE INDEX \`_pages_v_blocks_hero_high_impact_links_order_idx\` ON \`_pages_v_blocks_hero_high_impact_links\` (\`_order\`);`)
  await payload.db.drizzle.run(sql`CREATE INDEX \`_pages_v_blocks_hero_high_impact_links_parent_id_idx\` ON \`_pages_v_blocks_hero_high_impact_links\` (\`_parent_id\`);`)
  await payload.db.drizzle.run(sql`CREATE INDEX \`_pages_v_blocks_hero_order_idx\` ON \`_pages_v_blocks_hero\` (\`_order\`);`)
  await payload.db.drizzle.run(sql`CREATE INDEX \`_pages_v_blocks_hero_parent_id_idx\` ON \`_pages_v_blocks_hero\` (\`_parent_id\`);`)
  await payload.db.drizzle.run(sql`CREATE INDEX \`_pages_v_blocks_hero_path_idx\` ON \`_pages_v_blocks_hero\` (\`_path\`);`)
  await payload.db.drizzle.run(sql`CREATE INDEX \`_pages_v_blocks_events_order_idx\` ON \`_pages_v_blocks_events\` (\`_order\`);`)
  await payload.db.drizzle.run(sql`CREATE INDEX \`_pages_v_blocks_events_parent_id_idx\` ON \`_pages_v_blocks_events\` (\`_parent_id\`);`)
  await payload.db.drizzle.run(sql`CREATE INDEX \`_pages_v_blocks_events_path_idx\` ON \`_pages_v_blocks_events\` (\`_path\`);`)
  await payload.db.drizzle.run(sql`CREATE INDEX \`_pages_v_blocks_how_it_works_links_order_idx\` ON \`_pages_v_blocks_how_it_works_links\` (\`_order\`);`)
  await payload.db.drizzle.run(sql`CREATE INDEX \`_pages_v_blocks_how_it_works_links_parent_id_idx\` ON \`_pages_v_blocks_how_it_works_links\` (\`_parent_id\`);`)
  await payload.db.drizzle.run(sql`CREATE INDEX \`_pages_v_blocks_how_it_works_order_idx\` ON \`_pages_v_blocks_how_it_works\` (\`_order\`);`)
  await payload.db.drizzle.run(sql`CREATE INDEX \`_pages_v_blocks_how_it_works_parent_id_idx\` ON \`_pages_v_blocks_how_it_works\` (\`_parent_id\`);`)
  await payload.db.drizzle.run(sql`CREATE INDEX \`_pages_v_blocks_how_it_works_path_idx\` ON \`_pages_v_blocks_how_it_works\` (\`_path\`);`)
  await payload.db.drizzle.run(sql`CREATE INDEX \`_pages_v_blocks_history_items_order_idx\` ON \`_pages_v_blocks_history_items\` (\`_order\`);`)
  await payload.db.drizzle.run(sql`CREATE INDEX \`_pages_v_blocks_history_items_parent_id_idx\` ON \`_pages_v_blocks_history_items\` (\`_parent_id\`);`)
  await payload.db.drizzle.run(sql`CREATE INDEX \`_pages_v_blocks_history_order_idx\` ON \`_pages_v_blocks_history\` (\`_order\`);`)
  await payload.db.drizzle.run(sql`CREATE INDEX \`_pages_v_blocks_history_parent_id_idx\` ON \`_pages_v_blocks_history\` (\`_parent_id\`);`)
  await payload.db.drizzle.run(sql`CREATE INDEX \`_pages_v_blocks_history_path_idx\` ON \`_pages_v_blocks_history\` (\`_path\`);`)
  await payload.db.drizzle.run(sql`CREATE INDEX \`_pages_v_blocks_resources_order_idx\` ON \`_pages_v_blocks_resources\` (\`_order\`);`)
  await payload.db.drizzle.run(sql`CREATE INDEX \`_pages_v_blocks_resources_parent_id_idx\` ON \`_pages_v_blocks_resources\` (\`_parent_id\`);`)
  await payload.db.drizzle.run(sql`CREATE INDEX \`_pages_v_blocks_resources_path_idx\` ON \`_pages_v_blocks_resources\` (\`_path\`);`)
  await payload.db.drizzle.run(sql`CREATE INDEX \`_pages_v_blocks_about_us_order_idx\` ON \`_pages_v_blocks_about_us\` (\`_order\`);`)
  await payload.db.drizzle.run(sql`CREATE INDEX \`_pages_v_blocks_about_us_parent_id_idx\` ON \`_pages_v_blocks_about_us\` (\`_parent_id\`);`)
  await payload.db.drizzle.run(sql`CREATE INDEX \`_pages_v_blocks_about_us_path_idx\` ON \`_pages_v_blocks_about_us\` (\`_path\`);`)
  await payload.db.drizzle.run(sql`CREATE INDEX \`_pages_v_blocks_links_block_link_cards_order_idx\` ON \`_pages_v_blocks_links_block_link_cards\` (\`_order\`);`)
  await payload.db.drizzle.run(sql`CREATE INDEX \`_pages_v_blocks_links_block_link_cards_parent_id_idx\` ON \`_pages_v_blocks_links_block_link_cards\` (\`_parent_id\`);`)
  await payload.db.drizzle.run(sql`CREATE INDEX \`_pages_v_blocks_links_block_order_idx\` ON \`_pages_v_blocks_links_block\` (\`_order\`);`)
  await payload.db.drizzle.run(sql`CREATE INDEX \`_pages_v_blocks_links_block_parent_id_idx\` ON \`_pages_v_blocks_links_block\` (\`_parent_id\`);`)
  await payload.db.drizzle.run(sql`CREATE INDEX \`_pages_v_blocks_links_block_path_idx\` ON \`_pages_v_blocks_links_block\` (\`_path\`);`)
  await payload.db.drizzle.run(sql`CREATE INDEX \`_pages_v_version_version_slug_idx\` ON \`_pages_v\` (\`version_slug\`);`)
  await payload.db.drizzle.run(sql`CREATE INDEX \`_pages_v_version_version_created_at_idx\` ON \`_pages_v\` (\`version_created_at\`);`)
  await payload.db.drizzle.run(sql`CREATE INDEX \`_pages_v_version_version__status_idx\` ON \`_pages_v\` (\`version__status\`);`)
  await payload.db.drizzle.run(sql`CREATE INDEX \`_pages_v_created_at_idx\` ON \`_pages_v\` (\`created_at\`);`)
  await payload.db.drizzle.run(sql`CREATE INDEX \`_pages_v_updated_at_idx\` ON \`_pages_v\` (\`updated_at\`);`)
  await payload.db.drizzle.run(sql`CREATE INDEX \`_pages_v_latest_idx\` ON \`_pages_v\` (\`latest\`);`)
  await payload.db.drizzle.run(sql`CREATE INDEX \`_pages_v_autosave_idx\` ON \`_pages_v\` (\`autosave\`);`)
  await payload.db.drizzle.run(sql`CREATE INDEX \`_pages_v_rels_order_idx\` ON \`_pages_v_rels\` (\`order\`);`)
  await payload.db.drizzle.run(sql`CREATE INDEX \`_pages_v_rels_parent_idx\` ON \`_pages_v_rels\` (\`parent_id\`);`)
  await payload.db.drizzle.run(sql`CREATE INDEX \`_pages_v_rels_path_idx\` ON \`_pages_v_rels\` (\`path\`);`)
  await payload.db.drizzle.run(sql`CREATE INDEX \`events_created_at_idx\` ON \`events\` (\`created_at\`);`)
  await payload.db.drizzle.run(sql`CREATE INDEX \`resources_links_order_idx\` ON \`resources_links\` (\`_order\`);`)
  await payload.db.drizzle.run(sql`CREATE INDEX \`resources_links_parent_id_idx\` ON \`resources_links\` (\`_parent_id\`);`)
  await payload.db.drizzle.run(sql`CREATE INDEX \`resources_created_at_idx\` ON \`resources\` (\`created_at\`);`)
  await payload.db.drizzle.run(sql`CREATE INDEX \`resources_rels_order_idx\` ON \`resources_rels\` (\`order\`);`)
  await payload.db.drizzle.run(sql`CREATE INDEX \`resources_rels_parent_idx\` ON \`resources_rels\` (\`parent_id\`);`)
  await payload.db.drizzle.run(sql`CREATE INDEX \`resources_rels_path_idx\` ON \`resources_rels\` (\`path\`);`)
  await payload.db.drizzle.run(sql`CREATE INDEX \`avatars_created_at_idx\` ON \`avatars\` (\`created_at\`);`)
  await payload.db.drizzle.run(sql`CREATE UNIQUE INDEX \`avatars_filename_idx\` ON \`avatars\` (\`filename\`);`)
  await payload.db.drizzle.run(sql`CREATE INDEX \`avatars_sizes_thumbnail_sizes_thumbnail_filename_idx\` ON \`avatars\` (\`sizes_thumbnail_filename\`);`)
  await payload.db.drizzle.run(sql`CREATE INDEX \`cards_created_at_idx\` ON \`cards\` (\`created_at\`);`)
  await payload.db.drizzle.run(sql`CREATE UNIQUE INDEX \`cards_filename_idx\` ON \`cards\` (\`filename\`);`)
  await payload.db.drizzle.run(sql`CREATE INDEX \`cards_sizes_thumbnail_sizes_thumbnail_filename_idx\` ON \`cards\` (\`sizes_thumbnail_filename\`);`)
  await payload.db.drizzle.run(sql`CREATE INDEX \`landscapes_created_at_idx\` ON \`landscapes\` (\`created_at\`);`)
  await payload.db.drizzle.run(sql`CREATE UNIQUE INDEX \`landscapes_filename_idx\` ON \`landscapes\` (\`filename\`);`)
  await payload.db.drizzle.run(sql`CREATE INDEX \`landscapes_sizes_thumbnail_sizes_thumbnail_filename_idx\` ON \`landscapes\` (\`sizes_thumbnail_filename\`);`)
  await payload.db.drizzle.run(sql`CREATE INDEX \`portraits_created_at_idx\` ON \`portraits\` (\`created_at\`);`)
  await payload.db.drizzle.run(sql`CREATE UNIQUE INDEX \`portraits_filename_idx\` ON \`portraits\` (\`filename\`);`)
  await payload.db.drizzle.run(sql`CREATE INDEX \`portraits_sizes_thumbnail_sizes_thumbnail_filename_idx\` ON \`portraits\` (\`sizes_thumbnail_filename\`);`)
  await payload.db.drizzle.run(sql`CREATE INDEX \`meta_images_created_at_idx\` ON \`meta_images\` (\`created_at\`);`)
  await payload.db.drizzle.run(sql`CREATE UNIQUE INDEX \`meta_images_filename_idx\` ON \`meta_images\` (\`filename\`);`)
  await payload.db.drizzle.run(sql`CREATE INDEX \`meta_images_sizes_thumbnail_sizes_thumbnail_filename_idx\` ON \`meta_images\` (\`sizes_thumbnail_filename\`);`)
  await payload.db.drizzle.run(sql`CREATE INDEX \`files_created_at_idx\` ON \`files\` (\`created_at\`);`)
  await payload.db.drizzle.run(sql`CREATE UNIQUE INDEX \`files_filename_idx\` ON \`files\` (\`filename\`);`)
  await payload.db.drizzle.run(sql`CREATE INDEX \`users_created_at_idx\` ON \`users\` (\`created_at\`);`)
  await payload.db.drizzle.run(sql`CREATE UNIQUE INDEX \`users_email_idx\` ON \`users\` (\`email\`);`)
  await payload.db.drizzle.run(sql`CREATE INDEX \`redirects_from_idx\` ON \`redirects\` (\`from\`);`)
  await payload.db.drizzle.run(sql`CREATE INDEX \`redirects_created_at_idx\` ON \`redirects\` (\`created_at\`);`)
  await payload.db.drizzle.run(sql`CREATE INDEX \`redirects_rels_order_idx\` ON \`redirects_rels\` (\`order\`);`)
  await payload.db.drizzle.run(sql`CREATE INDEX \`redirects_rels_parent_idx\` ON \`redirects_rels\` (\`parent_id\`);`)
  await payload.db.drizzle.run(sql`CREATE INDEX \`redirects_rels_path_idx\` ON \`redirects_rels\` (\`path\`);`)
  await payload.db.drizzle.run(sql`CREATE INDEX \`payload_locked_documents_global_slug_idx\` ON \`payload_locked_documents\` (\`global_slug\`);`)
  await payload.db.drizzle.run(sql`CREATE INDEX \`payload_locked_documents_created_at_idx\` ON \`payload_locked_documents\` (\`created_at\`);`)
  await payload.db.drizzle.run(sql`CREATE INDEX \`payload_locked_documents_rels_order_idx\` ON \`payload_locked_documents_rels\` (\`order\`);`)
  await payload.db.drizzle.run(sql`CREATE INDEX \`payload_locked_documents_rels_parent_idx\` ON \`payload_locked_documents_rels\` (\`parent_id\`);`)
  await payload.db.drizzle.run(sql`CREATE INDEX \`payload_locked_documents_rels_path_idx\` ON \`payload_locked_documents_rels\` (\`path\`);`)
  await payload.db.drizzle.run(sql`CREATE INDEX \`payload_preferences_key_idx\` ON \`payload_preferences\` (\`key\`);`)
  await payload.db.drizzle.run(sql`CREATE INDEX \`payload_preferences_created_at_idx\` ON \`payload_preferences\` (\`created_at\`);`)
  await payload.db.drizzle.run(sql`CREATE INDEX \`payload_preferences_rels_order_idx\` ON \`payload_preferences_rels\` (\`order\`);`)
  await payload.db.drizzle.run(sql`CREATE INDEX \`payload_preferences_rels_parent_idx\` ON \`payload_preferences_rels\` (\`parent_id\`);`)
  await payload.db.drizzle.run(sql`CREATE INDEX \`payload_preferences_rels_path_idx\` ON \`payload_preferences_rels\` (\`path\`);`)
  await payload.db.drizzle.run(sql`CREATE INDEX \`payload_migrations_created_at_idx\` ON \`payload_migrations\` (\`created_at\`);`)
  await payload.db.drizzle.run(sql`CREATE INDEX \`header_nav_items_order_idx\` ON \`header_nav_items\` (\`_order\`);`)
  await payload.db.drizzle.run(sql`CREATE INDEX \`header_nav_items_parent_id_idx\` ON \`header_nav_items\` (\`_parent_id\`);`)
  await payload.db.drizzle.run(sql`CREATE INDEX \`header_rels_order_idx\` ON \`header_rels\` (\`order\`);`)
  await payload.db.drizzle.run(sql`CREATE INDEX \`header_rels_parent_idx\` ON \`header_rels\` (\`parent_id\`);`)
  await payload.db.drizzle.run(sql`CREATE INDEX \`header_rels_path_idx\` ON \`header_rels\` (\`path\`);`)
  await payload.db.drizzle.run(sql`CREATE INDEX \`footer_page_links_order_idx\` ON \`footer_page_links\` (\`_order\`);`)
  await payload.db.drizzle.run(sql`CREATE INDEX \`footer_page_links_parent_id_idx\` ON \`footer_page_links\` (\`_parent_id\`);`)
  await payload.db.drizzle.run(sql`CREATE INDEX \`footer_rels_order_idx\` ON \`footer_rels\` (\`order\`);`)
  await payload.db.drizzle.run(sql`CREATE INDEX \`footer_rels_parent_idx\` ON \`footer_rels\` (\`parent_id\`);`)
  await payload.db.drizzle.run(sql`CREATE INDEX \`footer_rels_path_idx\` ON \`footer_rels\` (\`path\`);`)
  await payload.db.drizzle.run(sql`CREATE INDEX \`company_info_social_order_idx\` ON \`company_info_social\` (\`_order\`);`)
  await payload.db.drizzle.run(sql`CREATE INDEX \`company_info_social_parent_id_idx\` ON \`company_info_social\` (\`_parent_id\`);`)
  await payload.db.drizzle.run(sql`CREATE INDEX \`company_info_hours_order_idx\` ON \`company_info_hours\` (\`_order\`);`)
  await payload.db.drizzle.run(sql`CREATE INDEX \`company_info_hours_parent_id_idx\` ON \`company_info_hours\` (\`_parent_id\`);`)
  await payload.db.drizzle.run(sql`CREATE INDEX \`company_info_rels_order_idx\` ON \`company_info_rels\` (\`order\`);`)
  await payload.db.drizzle.run(sql`CREATE INDEX \`company_info_rels_parent_idx\` ON \`company_info_rels\` (\`parent_id\`);`)
  await payload.db.drizzle.run(sql`CREATE INDEX \`company_info_rels_path_idx\` ON \`company_info_rels\` (\`path\`);`)
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.run(sql`DROP TABLE \`pages_blocks_hero_high_impact_links\`;`)
  await payload.db.drizzle.run(sql`DROP TABLE \`pages_blocks_hero\`;`)
  await payload.db.drizzle.run(sql`DROP TABLE \`pages_blocks_events\`;`)
  await payload.db.drizzle.run(sql`DROP TABLE \`pages_blocks_how_it_works_links\`;`)
  await payload.db.drizzle.run(sql`DROP TABLE \`pages_blocks_how_it_works\`;`)
  await payload.db.drizzle.run(sql`DROP TABLE \`pages_blocks_history_items\`;`)
  await payload.db.drizzle.run(sql`DROP TABLE \`pages_blocks_history\`;`)
  await payload.db.drizzle.run(sql`DROP TABLE \`pages_blocks_resources\`;`)
  await payload.db.drizzle.run(sql`DROP TABLE \`pages_blocks_about_us\`;`)
  await payload.db.drizzle.run(sql`DROP TABLE \`pages_blocks_links_block_link_cards\`;`)
  await payload.db.drizzle.run(sql`DROP TABLE \`pages_blocks_links_block\`;`)
  await payload.db.drizzle.run(sql`DROP TABLE \`pages\`;`)
  await payload.db.drizzle.run(sql`DROP TABLE \`pages_rels\`;`)
  await payload.db.drizzle.run(sql`DROP TABLE \`_pages_v_blocks_hero_high_impact_links\`;`)
  await payload.db.drizzle.run(sql`DROP TABLE \`_pages_v_blocks_hero\`;`)
  await payload.db.drizzle.run(sql`DROP TABLE \`_pages_v_blocks_events\`;`)
  await payload.db.drizzle.run(sql`DROP TABLE \`_pages_v_blocks_how_it_works_links\`;`)
  await payload.db.drizzle.run(sql`DROP TABLE \`_pages_v_blocks_how_it_works\`;`)
  await payload.db.drizzle.run(sql`DROP TABLE \`_pages_v_blocks_history_items\`;`)
  await payload.db.drizzle.run(sql`DROP TABLE \`_pages_v_blocks_history\`;`)
  await payload.db.drizzle.run(sql`DROP TABLE \`_pages_v_blocks_resources\`;`)
  await payload.db.drizzle.run(sql`DROP TABLE \`_pages_v_blocks_about_us\`;`)
  await payload.db.drizzle.run(sql`DROP TABLE \`_pages_v_blocks_links_block_link_cards\`;`)
  await payload.db.drizzle.run(sql`DROP TABLE \`_pages_v_blocks_links_block\`;`)
  await payload.db.drizzle.run(sql`DROP TABLE \`_pages_v\`;`)
  await payload.db.drizzle.run(sql`DROP TABLE \`_pages_v_rels\`;`)
  await payload.db.drizzle.run(sql`DROP TABLE \`events\`;`)
  await payload.db.drizzle.run(sql`DROP TABLE \`resources_links\`;`)
  await payload.db.drizzle.run(sql`DROP TABLE \`resources\`;`)
  await payload.db.drizzle.run(sql`DROP TABLE \`resources_rels\`;`)
  await payload.db.drizzle.run(sql`DROP TABLE \`avatars\`;`)
  await payload.db.drizzle.run(sql`DROP TABLE \`cards\`;`)
  await payload.db.drizzle.run(sql`DROP TABLE \`landscapes\`;`)
  await payload.db.drizzle.run(sql`DROP TABLE \`portraits\`;`)
  await payload.db.drizzle.run(sql`DROP TABLE \`meta_images\`;`)
  await payload.db.drizzle.run(sql`DROP TABLE \`files\`;`)
  await payload.db.drizzle.run(sql`DROP TABLE \`users\`;`)
  await payload.db.drizzle.run(sql`DROP TABLE \`redirects\`;`)
  await payload.db.drizzle.run(sql`DROP TABLE \`redirects_rels\`;`)
  await payload.db.drizzle.run(sql`DROP TABLE \`payload_locked_documents\`;`)
  await payload.db.drizzle.run(sql`DROP TABLE \`payload_locked_documents_rels\`;`)
  await payload.db.drizzle.run(sql`DROP TABLE \`payload_preferences\`;`)
  await payload.db.drizzle.run(sql`DROP TABLE \`payload_preferences_rels\`;`)
  await payload.db.drizzle.run(sql`DROP TABLE \`payload_migrations\`;`)
  await payload.db.drizzle.run(sql`DROP TABLE \`header_nav_items\`;`)
  await payload.db.drizzle.run(sql`DROP TABLE \`header\`;`)
  await payload.db.drizzle.run(sql`DROP TABLE \`header_rels\`;`)
  await payload.db.drizzle.run(sql`DROP TABLE \`footer_page_links\`;`)
  await payload.db.drizzle.run(sql`DROP TABLE \`footer\`;`)
  await payload.db.drizzle.run(sql`DROP TABLE \`footer_rels\`;`)
  await payload.db.drizzle.run(sql`DROP TABLE \`company_info_social\`;`)
  await payload.db.drizzle.run(sql`DROP TABLE \`company_info_hours\`;`)
  await payload.db.drizzle.run(sql`DROP TABLE \`company_info\`;`)
  await payload.db.drizzle.run(sql`DROP TABLE \`company_info_rels\`;`)
}