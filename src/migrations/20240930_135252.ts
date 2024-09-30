import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.run(sql`/*
   SQLite does not support "Dropping foreign key" out of the box, we do not generate automatic migration for that, so it has to be done manually
   Please refer to: https://www.techonthenet.com/sqlite/tables/alter_table.php
                    https://www.sqlite.org/lang_altertable.html
  
   Due to that we don't generate migration automatically and it has to be done manually
  */`)
  await payload.db.drizzle.run(sql`ALTER TABLE \`events\` ADD \`description\` text NOT NULL;`)
  await payload.db.drizzle.run(sql`ALTER TABLE \`pages_blocks_events\` DROP COLUMN \`image_id\`;`)
  await payload.db.drizzle.run(sql`ALTER TABLE \`_pages_v_blocks_events\` DROP COLUMN \`image_id\`;`)
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.run(sql`ALTER TABLE \`pages_blocks_events\` ADD \`image_id\` integer REFERENCES media(id);`)
  await payload.db.drizzle.run(sql`ALTER TABLE \`_pages_v_blocks_events\` ADD \`image_id\` integer REFERENCES media(id);`)
  await payload.db.drizzle.run(sql`/*
   SQLite does not support "Creating foreign key on existing column" out of the box, we do not generate automatic migration for that, so it has to be done manually
   Please refer to: https://www.techonthenet.com/sqlite/tables/alter_table.php
                    https://www.sqlite.org/lang_altertable.html
  
   Due to that we don't generate migration automatically and it has to be done manually
  */`)
  await payload.db.drizzle.run(sql`ALTER TABLE \`events\` DROP COLUMN \`description\`;`)
}
