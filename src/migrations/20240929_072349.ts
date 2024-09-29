import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.run(sql`DROP TABLE \`forms_blocks_payment_price_conditions\`;`)
  await payload.db.drizzle.run(sql`DROP TABLE \`forms_blocks_payment\`;`)
  await payload.db.drizzle.run(sql`DROP TABLE \`events\`;`)
  await payload.db.drizzle.run(sql`DROP TABLE \`forms\`;`)

  await payload.db.drizzle.run(
    sql`ALTER TABLE \`pages_blocks_form_block\` DROP COLUMN \`enable_stripe\`;`,
  )
  await payload.db.drizzle.run(
    sql`ALTER TABLE \`pages_blocks_form_block\` DROP COLUMN \`paymentStatus\`;`,
  )
  await payload.db.drizzle.run(
    sql`ALTER TABLE \`_pages_v_blocks_form_block\` DROP COLUMN \`enable_stripe\`;`,
  )
  await payload.db.drizzle.run(
    sql`ALTER TABLE \`_pages_v_blocks_form_block\` DROP COLUMN \`paymentStatus\`;`,
  )
  await payload.db.drizzle.run(sql`ALTER TABLE \`form_submissions\` DROP COLUMN \`payment_field\`;`)
  await payload.db.drizzle.run(
    sql`ALTER TABLE \`form_submissions\` DROP COLUMN \`payment_payment_processor\`;`,
  )
  await payload.db.drizzle.run(
    sql`ALTER TABLE \`form_submissions\` DROP COLUMN \`payment_credit_card_token\`;`,
  )
  await payload.db.drizzle.run(
    sql`ALTER TABLE \`form_submissions\` DROP COLUMN \`payment_credit_card_brand\`;`,
  )
  await payload.db.drizzle.run(
    sql`ALTER TABLE \`form_submissions\` DROP COLUMN \`payment_credit_card_number\`;`,
  )

  // Recreate events table
  await payload.db.drizzle.run(sql`
    CREATE TABLE \`events\` (
      \`id\` integer PRIMARY KEY NOT NULL,
      \`title\` text NOT NULL,
      \`date\` text NOT NULL,
      \`location\` text NOT NULL,
      \`price\` numeric,
      \`updated_at\` text NOT NULL DEFAULT (strftime(\'%Y-%m-%dT%H:%M:%fZ\', \'now\')),
      \`created_at\` text NOT NULL DEFAULT (strftime(\'%Y-%m-%dT%H:%M:%fZ\', \'now\'))
    );
  `)

  // Create index for events table
  await payload.db.drizzle.run(sql`
    CREATE INDEX \`events_created_at_idx\` ON \`events\` (\`created_at\`);
  `)

  // Recreate forms table
  await payload.db.drizzle.run(sql`
    CREATE TABLE \`forms\` (
      \`id\` integer PRIMARY KEY NOT NULL,
      \`require_payment\` integer DEFAULT false,
      \`event_id\` integer,
      \`title\` text NOT NULL,
      \`submit_button_label\` text,
      \`redirect_url\` text,
      \`confirmation_message\` text,
      \`send_email_confirmation\` integer,
      \`email_confirmation_field\` text,
      \`email_confirmation_subject\` text,
      \`email_confirmation_message\` text,
      \`updated_at\` text NOT NULL DEFAULT (strftime(\'%Y-%m-%dT%H:%M:%fZ\', \'now\')),
      \`created_at\` text NOT NULL DEFAULT (strftime(\'%Y-%m-%dT%H:%M:%fZ\', \'now\')),
      FOREIGN KEY (\`event_id\`) REFERENCES \`events\` (\`id\`) ON DELETE set null ON UPDATE no action
    );
  `)

  // Create indexes for forms table
  await payload.db.drizzle.run(sql`
    CREATE INDEX \`forms_created_at_idx\` ON \`forms\` (\`created_at\`);
  `)
  await payload.db.drizzle.run(sql`
    CREATE INDEX \`forms_event_id_idx\` ON \`forms\` (\`event_id\`);
  `)

  await payload.db.drizzle.run(
    sql`ALTER TABLE \`pages_blocks_form_block\` DROP COLUMN \`enable_stripe\`;`,
  )
  await payload.db.drizzle.run(
    sql`ALTER TABLE \`pages_blocks_form_block\` DROP COLUMN \`paymentStatus\`;`,
  )
  await payload.db.drizzle.run(
    sql`ALTER TABLE \`_pages_v_blocks_form_block\` DROP COLUMN \`enable_stripe\`;`,
  )
  await payload.db.drizzle.run(
    sql`ALTER TABLE \`_pages_v_blocks_form_block\` DROP COLUMN \`paymentStatus\`;`,
  )
  await payload.db.drizzle.run(sql`ALTER TABLE \`form_submissions\` DROP COLUMN \`payment_field\`;`)
  await payload.db.drizzle.run(
    sql`ALTER TABLE \`form_submissions\` DROP COLUMN \`payment_payment_processor\`;`,
  )
  await payload.db.drizzle.run(
    sql`ALTER TABLE \`form_submissions\` DROP COLUMN \`payment_credit_card_token\`;`,
  )
  await payload.db.drizzle.run(
    sql`ALTER TABLE \`form_submissions\` DROP COLUMN \`payment_credit_card_brand\`;`,
  )
  await payload.db.drizzle.run(
    sql`ALTER TABLE \`form_submissions\` DROP COLUMN \`payment_credit_card_number\`;`,
  )
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.run(sql`CREATE TABLE \`forms_blocks_payment_price_conditions\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`field_to_use\` text,
  	\`condition\` text DEFAULT 'hasValue',
  	\`value_for_condition\` text,
  	\`operator\` text DEFAULT 'add',
  	\`valueType\` text DEFAULT 'static',
  	\`value_for_operator\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms_blocks_payment\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await payload.db.drizzle.run(sql`CREATE TABLE \`forms_blocks_payment\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`label\` text,
  	\`width\` numeric,
  	\`base_price\` numeric,
  	\`paymentProcessor\` text DEFAULT 'stripe',
  	\`required\` integer,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await payload.db.drizzle.run(
    sql`ALTER TABLE \`pages_blocks_form_block\` ADD \`enable_stripe\` integer DEFAULT false;`,
  )
  await payload.db.drizzle.run(
    sql`ALTER TABLE \`pages_blocks_form_block\` ADD \`paymentStatus\` text DEFAULT 'pending';`,
  )
  await payload.db.drizzle.run(
    sql`ALTER TABLE \`_pages_v_blocks_form_block\` ADD \`enable_stripe\` integer DEFAULT false;`,
  )
  await payload.db.drizzle.run(
    sql`ALTER TABLE \`_pages_v_blocks_form_block\` ADD \`paymentStatus\` text DEFAULT 'pending';`,
  )
  await payload.db.drizzle.run(sql`ALTER TABLE \`form_submissions\` ADD \`payment_field\` text;`)
  await payload.db.drizzle.run(
    sql`ALTER TABLE \`form_submissions\` ADD \`payment_payment_processor\` text;`,
  )
  await payload.db.drizzle.run(
    sql`ALTER TABLE \`form_submissions\` ADD \`payment_credit_card_token\` text;`,
  )
  await payload.db.drizzle.run(
    sql`ALTER TABLE \`form_submissions\` ADD \`payment_credit_card_brand\` text;`,
  )
  await payload.db.drizzle.run(
    sql`ALTER TABLE \`form_submissions\` ADD \`payment_credit_card_number\` text;`,
  )
  await payload.db.drizzle.run(
    sql`CREATE INDEX \`forms_blocks_payment_price_conditions_order_idx\` ON \`forms_blocks_payment_price_conditions\` (\`_order\`);`,
  )
  await payload.db.drizzle.run(
    sql`CREATE INDEX \`forms_blocks_payment_price_conditions_parent_id_idx\` ON \`forms_blocks_payment_price_conditions\` (\`_parent_id\`);`,
  )
  await payload.db.drizzle.run(
    sql`CREATE INDEX \`forms_blocks_payment_order_idx\` ON \`forms_blocks_payment\` (\`_order\`);`,
  )
  await payload.db.drizzle.run(
    sql`CREATE INDEX \`forms_blocks_payment_parent_id_idx\` ON \`forms_blocks_payment\` (\`_parent_id\`);`,
  )
  await payload.db.drizzle.run(
    sql`CREATE INDEX \`forms_blocks_payment_path_idx\` ON \`forms_blocks_payment\` (\`_path\`);`,
  )
  await payload.db.drizzle.run(sql`ALTER TABLE \`events\` DROP COLUMN \`price\`;`)
  await payload.db.drizzle.run(sql`ALTER TABLE \`forms\` DROP COLUMN \`require_payment\`;`)
  await payload.db.drizzle.run(sql`ALTER TABLE \`forms\` DROP COLUMN \`event_id\`;`)
}
