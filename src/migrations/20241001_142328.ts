import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  // Update media table
  await payload.db.drizzle.run(sql`DROP TABLE IF EXISTS \`media\`;`)
  await payload.db.drizzle.run(sql`CREATE TABLE \`media\` (
    \`id\` integer PRIMARY KEY NOT NULL,
    \`alt\` text NOT NULL,
    \`caption\` text,
    \`prefix\` text DEFAULT 'v3',
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
    \`sizes_thumbnail_filename\` text,
    \`sizes_meta_url\` text,
    \`sizes_meta_width\` numeric,
    \`sizes_meta_height\` numeric,
    \`sizes_meta_mime_type\` text,
    \`sizes_meta_filesize\` numeric,
    \`sizes_meta_filename\` text
  );`)

  // Update pages table
  await payload.db.drizzle.run(sql`DROP TABLE IF EXISTS \`pages\`;`)
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
    FOREIGN KEY (\`meta_metadata_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );`)

  // Update _pages_v table
  await payload.db.drizzle.run(sql`DROP TABLE IF EXISTS \`_pages_v\`;`)
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
    FOREIGN KEY (\`version_meta_metadata_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );`)

  // Recreate indexes
  await payload.db.drizzle.run(sql`CREATE INDEX \`media_created_at_idx\` ON \`media\` (\`created_at\`);`)
  await payload.db.drizzle.run(sql`CREATE UNIQUE INDEX \`media_filename_idx\` ON \`media\` (\`filename\`);`)
  await payload.db.drizzle.run(sql`CREATE INDEX \`media_sizes_thumbnail_sizes_thumbnail_filename_idx\` ON \`media\` (\`sizes_thumbnail_filename\`);`)
  await payload.db.drizzle.run(sql`CREATE INDEX \`media_sizes_meta_sizes_meta_filename_idx\` ON \`media\` (\`sizes_meta_filename\`);`)

  await payload.db.drizzle.run(sql`CREATE INDEX \`pages_slug_idx\` ON \`pages\` (\`slug\`);`)
  await payload.db.drizzle.run(sql`CREATE INDEX \`pages_created_at_idx\` ON \`pages\` (\`created_at\`);`)
  await payload.db.drizzle.run(sql`CREATE INDEX \`pages__status_idx\` ON \`pages\` (\`_status\`);`)

  await payload.db.drizzle.run(sql`CREATE INDEX \`_pages_v_version_version_slug_idx\` ON \`_pages_v\` (\`version_slug\`);`)
  await payload.db.drizzle.run(sql`CREATE INDEX \`_pages_v_version_version_created_at_idx\` ON \`_pages_v\` (\`version_created_at\`);`)
  await payload.db.drizzle.run(sql`CREATE INDEX \`_pages_v_version_version__status_idx\` ON \`_pages_v\` (\`version__status\`);`)
  await payload.db.drizzle.run(sql`CREATE INDEX \`_pages_v_created_at_idx\` ON \`_pages_v\` (\`created_at\`);`)
  await payload.db.drizzle.run(sql`CREATE INDEX \`_pages_v_updated_at_idx\` ON \`_pages_v\` (\`updated_at\`);`)
  await payload.db.drizzle.run(sql`CREATE INDEX \`_pages_v_latest_idx\` ON \`_pages_v\` (\`latest\`);`)
  await payload.db.drizzle.run(sql`CREATE INDEX \`_pages_v_autosave_idx\` ON \`_pages_v\` (\`autosave\`);`)
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  // Revert changes to media table
  await payload.db.drizzle.run(sql`DROP TABLE IF EXISTS \`media\`;`)
  await payload.db.drizzle.run(sql`CREATE TABLE \`media\` (
    \`id\` integer PRIMARY KEY NOT NULL,
    \`alt\` text NOT NULL,
    \`caption\` text,
    \`prefix\` text DEFAULT 'v2',
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
    \`sizes_thumbnail_filename\` text,
    \`sizes_meta_url\` text,
    \`sizes_meta_width\` numeric,
    \`sizes_meta_height\` numeric,
    \`sizes_meta_mime_type\` text,
    \`sizes_meta_filesize\` numeric,
    \`sizes_meta_filename\` text
  );`)

  // Revert changes to pages table
  await payload.db.drizzle.run(sql`DROP TABLE IF EXISTS \`pages\`;`)
  await payload.db.drizzle.run(sql`CREATE TABLE \`pages\` (
    \`id\` integer PRIMARY KEY NOT NULL,
    \`title\` text,
    \`published_at\` text,
    \`slug\` text,
    \`slug_lock\` integer DEFAULT true,
    \`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
    \`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
    \`_status\` text DEFAULT 'draft'
  );`)

  // Revert changes to _pages_v table
  await payload.db.drizzle.run(sql`DROP TABLE IF EXISTS \`_pages_v\`;`)
  await payload.db.drizzle.run(sql`CREATE TABLE \`_pages_v\` (
    \`id\` integer PRIMARY KEY NOT NULL,
    \`parent_id\` integer,
    \`version_title\` text,
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
    FOREIGN KEY (\`parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE set null
  );`)

  // Recreate original indexes
  await payload.db.drizzle.run(sql`CREATE INDEX \`media_created_at_idx\` ON \`media\` (\`created_at\`);`)
  await payload.db.drizzle.run(sql`CREATE UNIQUE INDEX \`media_filename_idx\` ON \`media\` (\`filename\`);`)
  await payload.db.drizzle.run(sql`CREATE INDEX \`media_sizes_thumbnail_sizes_thumbnail_filename_idx\` ON \`media\` (\`sizes_thumbnail_filename\`);`)
  await payload.db.drizzle.run(sql`CREATE INDEX \`media_sizes_meta_sizes_meta_filename_idx\` ON \`media\` (\`sizes_meta_filename\`);`)

  await payload.db.drizzle.run(sql`CREATE INDEX \`pages_slug_idx\` ON \`pages\` (\`slug\`);`)
  await payload.db.drizzle.run(sql`CREATE INDEX \`pages_created_at_idx\` ON \`pages\` (\`created_at\`);`)
  await payload.db.drizzle.run(sql`CREATE INDEX \`pages__status_idx\` ON \`pages\` (\`_status\`);`)

  await payload.db.drizzle.run(sql`CREATE INDEX \`_pages_v_version_version_slug_idx\` ON \`_pages_v\` (\`version_slug\`);`)
  await payload.db.drizzle.run(sql`CREATE INDEX \`_pages_v_version_version_created_at_idx\` ON \`_pages_v\` (\`version_created_at\`);`)
  await payload.db.drizzle.run(sql`CREATE INDEX \`_pages_v_version_version__status_idx\` ON \`_pages_v\` (\`version__status\`);`)
  await payload.db.drizzle.run(sql`CREATE INDEX \`_pages_v_created_at_idx\` ON \`_pages_v\` (\`created_at\`);`)
  await payload.db.drizzle.run(sql`CREATE INDEX \`_pages_v_updated_at_idx\` ON \`_pages_v\` (\`updated_at\`);`)
  await payload.db.drizzle.run(sql`CREATE INDEX \`_pages_v_latest_idx\` ON \`_pages_v\` (\`latest\`);`)
  await payload.db.drizzle.run(sql`CREATE INDEX \`_pages_v_autosave_idx\` ON \`_pages_v\` (\`autosave\`);`)
}