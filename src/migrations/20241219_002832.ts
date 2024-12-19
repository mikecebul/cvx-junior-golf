import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_events_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."pages_blocks_events_links_link_link_style" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum_pages_blocks_events_direction" AS ENUM('ltr', 'rtl');
  CREATE TYPE "public"."enum_pages_blocks_links_block_link_cards_link_type" AS ENUM('link', 'video');
  CREATE TYPE "public"."enum_pages_blocks_links_block_link_cards_image_upload_option" AS ENUM('generate', 'manual');
  CREATE TYPE "public"."enum_pages_two_col_layout_col_one_cta_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."pages_two_col_layout_col_one_cta_links_link_link_style" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum_pages_two_col_layout_direction" AS ENUM('ltr', 'rtl');
  CREATE TYPE "public"."enum_pages_two_col_layout_breakpoint" AS ENUM('sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum_pages_two_col_layout_col_one_content_type" AS ENUM('cta', 'richText');
  CREATE TYPE "public"."enum_pages_two_col_layout_col_one_v_align" AS ENUM('top', 'center', 'bottom');
  CREATE TYPE "public"."enum_pages_two_col_layout_col_one_cta_heading" AS ENUM('h1', 'h2');
  CREATE TYPE "public"."enum_pages_two_col_layout_col_two_content_type" AS ENUM('image', 'form');
  CREATE TYPE "public"."enum_pages_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__pages_v_blocks_events_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."_pages_v_blocks_events_links_link_link_style" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum__pages_v_blocks_events_direction" AS ENUM('ltr', 'rtl');
  CREATE TYPE "public"."enum__pages_v_blocks_links_block_link_cards_link_type" AS ENUM('link', 'video');
  CREATE TYPE "public"."enum__pages_v_blocks_links_block_link_cards_image_upload_option" AS ENUM('generate', 'manual');
  CREATE TYPE "public"."enum___pages_v_two_col_layout_v_col_one_cta_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."__pages_v_two_col_layout_v_col_one_cta_links_link_link_style" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum___pages_v_two_col_layout_v_direction" AS ENUM('ltr', 'rtl');
  CREATE TYPE "public"."enum___pages_v_two_col_layout_v_breakpoint" AS ENUM('sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum___pages_v_two_col_layout_v_col_one_content_type" AS ENUM('cta', 'richText');
  CREATE TYPE "public"."enum___pages_v_two_col_layout_v_col_one_v_align" AS ENUM('top', 'center', 'bottom');
  CREATE TYPE "public"."enum___pages_v_two_col_layout_v_col_one_cta_heading" AS ENUM('h1', 'h2');
  CREATE TYPE "public"."enum___pages_v_two_col_layout_v_col_two_content_type" AS ENUM('image', 'form');
  CREATE TYPE "public"."enum__pages_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_users_role" AS ENUM('user', 'editor', 'admin', 'superAdmin');
  CREATE TYPE "public"."enum_forms_blocks_payment_price_conditions_condition" AS ENUM('hasValue', 'equals', 'notEquals');
  CREATE TYPE "public"."enum_forms_blocks_payment_price_conditions_operator" AS ENUM('add', 'subtract', 'multiply', 'divide');
  CREATE TYPE "public"."enum_forms_blocks_payment_price_conditions_value_type" AS ENUM('static', 'valueOfField');
  CREATE TYPE "public"."enum_forms_confirmation_type" AS ENUM('message', 'redirect');
  CREATE TYPE "public"."enum_form_submissions_payment_status" AS ENUM('pending', 'paid', 'cancelled', 'refunded');
  CREATE TYPE "public"."enum_redirects_to_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_header_nav_items_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_footer_page_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_company_info_social_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_company_info_hours_type" AS ENUM('default', 'custom');
  CREATE TABLE IF NOT EXISTS "pages_blocks_events_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_pages_blocks_events_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "pages_blocks_events_links_link_link_style" DEFAULT 'default'
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_events" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"direction" "enum_pages_blocks_events_direction" DEFAULT 'ltr',
  	"title" varchar,
  	"description" varchar,
  	"image_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_rich_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"subtitle" varchar,
  	"rich_content" jsonb,
  	"priority" boolean DEFAULT false,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_links_block_link_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_pages_blocks_links_block_link_cards_link_type" DEFAULT 'link',
  	"title" varchar,
  	"description" varchar,
  	"image_upload_option" "enum_pages_blocks_links_block_link_cards_image_upload_option" DEFAULT 'generate',
  	"keywords" varchar,
  	"image_id" integer,
  	"href" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_links_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_events_page_announcements" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" jsonb
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_events_page" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_form_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"form_id" integer,
  	"enable_intro" boolean,
  	"intro_content" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_two_col_layout_col_one_cta_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_pages_two_col_layout_col_one_cta_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "pages_two_col_layout_col_one_cta_links_link_link_style" DEFAULT 'default'
  );
  
  CREATE TABLE IF NOT EXISTS "pages_two_col_layout" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"direction" "enum_pages_two_col_layout_direction" DEFAULT 'ltr',
  	"breakpoint" "enum_pages_two_col_layout_breakpoint" DEFAULT 'md',
  	"col_one_content_type" "enum_pages_two_col_layout_col_one_content_type" DEFAULT 'cta',
  	"col_one_v_align" "enum_pages_two_col_layout_col_one_v_align" DEFAULT 'center',
  	"col_one_rich_text" jsonb,
  	"col_one_cta_has_subtitle" boolean DEFAULT false,
  	"col_one_cta_subtitle_icon" varchar,
  	"col_one_cta_subtitle_text" varchar,
  	"col_one_cta_title" varchar,
  	"col_one_cta_heading" "enum_pages_two_col_layout_col_one_cta_heading" DEFAULT 'h2',
  	"col_one_cta_description" varchar,
  	"col_two_content_type" "enum_pages_two_col_layout_col_two_content_type" DEFAULT 'image',
  	"col_two_priority" boolean DEFAULT false,
  	"col_two_sticky" boolean DEFAULT false,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_event_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_feature_cards_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" varchar,
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_feature_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_layout" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"meta_hide_from_search_engines" boolean DEFAULT false,
  	"meta_metadata_title" varchar,
  	"meta_metadata_image_id" integer,
  	"meta_metadata_description" varchar,
  	"published_at" timestamp(3) with time zone,
  	"slug" varchar,
  	"slug_lock" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_pages_status" DEFAULT 'draft'
  );
  
  CREATE TABLE IF NOT EXISTS "pages_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"media_id" integer,
  	"events_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_events_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "enum__pages_v_blocks_events_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "_pages_v_blocks_events_links_link_link_style" DEFAULT 'default',
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_events" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"direction" "enum__pages_v_blocks_events_direction" DEFAULT 'ltr',
  	"title" varchar,
  	"description" varchar,
  	"image_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_rich_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"subtitle" varchar,
  	"rich_content" jsonb,
  	"priority" boolean DEFAULT false,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_links_block_link_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "enum__pages_v_blocks_links_block_link_cards_link_type" DEFAULT 'link',
  	"title" varchar,
  	"description" varchar,
  	"image_upload_option" "enum__pages_v_blocks_links_block_link_cards_image_upload_option" DEFAULT 'generate',
  	"keywords" varchar,
  	"image_id" integer,
  	"href" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_links_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_events_page_announcements" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" jsonb,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_events_page" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_form_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"form_id" integer,
  	"enable_intro" boolean,
  	"intro_content" jsonb,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "__pages_v_two_col_layout_v_col_one_cta_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "enum___pages_v_two_col_layout_v_col_one_cta_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "__pages_v_two_col_layout_v_col_one_cta_links_link_link_style" DEFAULT 'default',
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "__pages_v_two_col_layout_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"direction" "enum___pages_v_two_col_layout_v_direction" DEFAULT 'ltr',
  	"breakpoint" "enum___pages_v_two_col_layout_v_breakpoint" DEFAULT 'md',
  	"col_one_content_type" "enum___pages_v_two_col_layout_v_col_one_content_type" DEFAULT 'cta',
  	"col_one_v_align" "enum___pages_v_two_col_layout_v_col_one_v_align" DEFAULT 'center',
  	"col_one_rich_text" jsonb,
  	"col_one_cta_has_subtitle" boolean DEFAULT false,
  	"col_one_cta_subtitle_icon" varchar,
  	"col_one_cta_subtitle_text" varchar,
  	"col_one_cta_title" varchar,
  	"col_one_cta_heading" "enum___pages_v_two_col_layout_v_col_one_cta_heading" DEFAULT 'h2',
  	"col_one_cta_description" varchar,
  	"col_two_content_type" "enum___pages_v_two_col_layout_v_col_two_content_type" DEFAULT 'image',
  	"col_two_priority" boolean DEFAULT false,
  	"col_two_sticky" boolean DEFAULT false,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_event_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_feature_cards_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" varchar,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_feature_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_layout" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_meta_hide_from_search_engines" boolean DEFAULT false,
  	"version_meta_metadata_title" varchar,
  	"version_meta_metadata_image_id" integer,
  	"version_meta_metadata_description" varchar,
  	"version_published_at" timestamp(3) with time zone,
  	"version_slug" varchar,
  	"version_slug_lock" boolean DEFAULT true,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__pages_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"media_id" integer,
  	"events_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "events" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description" jsonb NOT NULL,
  	"date" timestamp(3) with time zone NOT NULL,
  	"location" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar NOT NULL,
  	"caption" varchar,
  	"prefix" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric,
  	"sizes_thumbnail_url" varchar,
  	"sizes_thumbnail_width" numeric,
  	"sizes_thumbnail_height" numeric,
  	"sizes_thumbnail_mime_type" varchar,
  	"sizes_thumbnail_filesize" numeric,
  	"sizes_thumbnail_filename" varchar,
  	"sizes_meta_url" varchar,
  	"sizes_meta_width" numeric,
  	"sizes_meta_height" numeric,
  	"sizes_meta_mime_type" varchar,
  	"sizes_meta_filesize" numeric,
  	"sizes_meta_filename" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"role" "enum_users_role" DEFAULT 'editor',
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"enable_a_p_i_key" boolean,
  	"api_key" varchar,
  	"api_key_index" varchar,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE IF NOT EXISTS "forms_blocks_checkbox" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"label" varchar,
  	"width" numeric,
  	"required" boolean,
  	"default_value" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "forms_blocks_country" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"label" varchar,
  	"width" numeric,
  	"required" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "forms_blocks_email" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"label" varchar,
  	"width" numeric,
  	"required" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "forms_blocks_message" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"message" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "forms_blocks_number" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"label" varchar,
  	"width" numeric,
  	"default_value" numeric,
  	"required" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "forms_blocks_payment_price_conditions" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"field_to_use" varchar,
  	"condition" "enum_forms_blocks_payment_price_conditions_condition" DEFAULT 'hasValue',
  	"value_for_condition" varchar,
  	"operator" "enum_forms_blocks_payment_price_conditions_operator" DEFAULT 'add',
  	"value_type" "enum_forms_blocks_payment_price_conditions_value_type" DEFAULT 'static',
  	"value_for_operator" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "forms_blocks_payment" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"label" varchar,
  	"width" numeric,
  	"base_price" numeric,
  	"required" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "forms_blocks_select_options" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"value" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "forms_blocks_select" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"label" varchar,
  	"width" numeric,
  	"default_value" varchar,
  	"required" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "forms_blocks_state" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"label" varchar,
  	"width" numeric,
  	"required" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "forms_blocks_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"label" varchar,
  	"width" numeric,
  	"default_value" varchar,
  	"required" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "forms_blocks_textarea" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"label" varchar,
  	"width" numeric,
  	"default_value" varchar,
  	"required" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "forms_blocks_date_of_birth" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"label" varchar,
  	"width" numeric,
  	"default_value" varchar,
  	"required" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "forms_blocks_array" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"label" varchar NOT NULL,
  	"label_singular" varchar NOT NULL,
  	"width" numeric DEFAULT 100,
  	"min_rows" numeric DEFAULT 1 NOT NULL,
  	"max_rows" numeric DEFAULT 4 NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "forms_emails" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"email_to" varchar,
  	"cc" varchar,
  	"bcc" varchar,
  	"reply_to" varchar,
  	"email_from" varchar,
  	"subject" varchar DEFAULT 'You''''ve received a new message.' NOT NULL,
  	"message" jsonb
  );
  
  CREATE TABLE IF NOT EXISTS "forms" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"submit_button_label" varchar,
  	"confirmation_type" "enum_forms_confirmation_type" DEFAULT 'message',
  	"confirmation_message" jsonb,
  	"redirect_url" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "form_submissions" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"form_id" integer NOT NULL,
  	"title" varchar,
  	"submission_data" jsonb,
  	"payment_amount" numeric,
  	"payment_status" "enum_form_submissions_payment_status" DEFAULT 'pending',
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "redirects" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"from" varchar NOT NULL,
  	"to_type" "enum_redirects_to_type" DEFAULT 'reference',
  	"to_url" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "redirects_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"events_id" integer,
  	"media_id" integer,
  	"users_id" integer,
  	"forms_id" integer,
  	"form_submissions_id" integer,
  	"redirects_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "header_nav_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_header_nav_items_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "header" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE IF NOT EXISTS "header_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"media_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "footer_page_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_footer_page_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "footer" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"show_contact" boolean DEFAULT true,
  	"show_google_map" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE IF NOT EXISTS "footer_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"media_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "company_info_social" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"platform" varchar,
  	"link_type" "enum_company_info_social_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "company_info_hours" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"type" "enum_company_info_hours_type" DEFAULT 'default',
  	"day" varchar,
  	"hours" varchar,
  	"note" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "company_info" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"contact_name" varchar,
  	"contact_email" varchar DEFAULT 'info@cvxjrgolf.org',
  	"contact_phone" varchar DEFAULT '(231) 547-1144',
  	"contact_fax" varchar DEFAULT '(231) 547-4970',
  	"contact_physical_address_street" varchar,
  	"contact_physical_address_city_state_zip" varchar,
  	"contact_physical_address_coordinates_lat" numeric,
  	"contact_physical_address_coordinates_lng" numeric,
  	"contact_mailing_address_street" varchar,
  	"contact_mailing_address_city_state_zip" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE IF NOT EXISTS "company_info_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"media_id" integer
  );
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_events_links" ADD CONSTRAINT "pages_blocks_events_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_events"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_events" ADD CONSTRAINT "pages_blocks_events_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_events" ADD CONSTRAINT "pages_blocks_events_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_rich_text" ADD CONSTRAINT "pages_blocks_rich_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_links_block_link_cards" ADD CONSTRAINT "pages_blocks_links_block_link_cards_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_links_block_link_cards" ADD CONSTRAINT "pages_blocks_links_block_link_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_links_block"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_links_block" ADD CONSTRAINT "pages_blocks_links_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_events_page_announcements" ADD CONSTRAINT "pages_blocks_events_page_announcements_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_events_page"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_events_page" ADD CONSTRAINT "pages_blocks_events_page_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_form_block" ADD CONSTRAINT "pages_blocks_form_block_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_form_block" ADD CONSTRAINT "pages_blocks_form_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_two_col_layout_col_one_cta_links" ADD CONSTRAINT "pages_two_col_layout_col_one_cta_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_two_col_layout"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_two_col_layout" ADD CONSTRAINT "pages_two_col_layout_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_event_cards" ADD CONSTRAINT "pages_blocks_event_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_feature_cards_cards" ADD CONSTRAINT "pages_blocks_feature_cards_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_feature_cards"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_feature_cards" ADD CONSTRAINT "pages_blocks_feature_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_layout" ADD CONSTRAINT "pages_blocks_layout_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages" ADD CONSTRAINT "pages_meta_metadata_image_id_media_id_fk" FOREIGN KEY ("meta_metadata_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_events_fk" FOREIGN KEY ("events_id") REFERENCES "public"."events"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_events_links" ADD CONSTRAINT "_pages_v_blocks_events_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_events"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_events" ADD CONSTRAINT "_pages_v_blocks_events_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_events" ADD CONSTRAINT "_pages_v_blocks_events_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_rich_text" ADD CONSTRAINT "_pages_v_blocks_rich_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_links_block_link_cards" ADD CONSTRAINT "_pages_v_blocks_links_block_link_cards_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_links_block_link_cards" ADD CONSTRAINT "_pages_v_blocks_links_block_link_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_links_block"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_links_block" ADD CONSTRAINT "_pages_v_blocks_links_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_events_page_announcements" ADD CONSTRAINT "_pages_v_blocks_events_page_announcements_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_events_page"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_events_page" ADD CONSTRAINT "_pages_v_blocks_events_page_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_form_block" ADD CONSTRAINT "_pages_v_blocks_form_block_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_form_block" ADD CONSTRAINT "_pages_v_blocks_form_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "__pages_v_two_col_layout_v_col_one_cta_links" ADD CONSTRAINT "__pages_v_two_col_layout_v_col_one_cta_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."__pages_v_two_col_layout_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "__pages_v_two_col_layout_v" ADD CONSTRAINT "__pages_v_two_col_layout_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_event_cards" ADD CONSTRAINT "_pages_v_blocks_event_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_feature_cards_cards" ADD CONSTRAINT "_pages_v_blocks_feature_cards_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_feature_cards"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_feature_cards" ADD CONSTRAINT "_pages_v_blocks_feature_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_layout" ADD CONSTRAINT "_pages_v_blocks_layout_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_parent_id_pages_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_version_meta_metadata_image_id_media_id_fk" FOREIGN KEY ("version_meta_metadata_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_events_fk" FOREIGN KEY ("events_id") REFERENCES "public"."events"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "forms_blocks_checkbox" ADD CONSTRAINT "forms_blocks_checkbox_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "forms_blocks_country" ADD CONSTRAINT "forms_blocks_country_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "forms_blocks_email" ADD CONSTRAINT "forms_blocks_email_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "forms_blocks_message" ADD CONSTRAINT "forms_blocks_message_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "forms_blocks_number" ADD CONSTRAINT "forms_blocks_number_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "forms_blocks_payment_price_conditions" ADD CONSTRAINT "forms_blocks_payment_price_conditions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms_blocks_payment"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "forms_blocks_payment" ADD CONSTRAINT "forms_blocks_payment_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "forms_blocks_select_options" ADD CONSTRAINT "forms_blocks_select_options_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms_blocks_select"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "forms_blocks_select" ADD CONSTRAINT "forms_blocks_select_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "forms_blocks_state" ADD CONSTRAINT "forms_blocks_state_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "forms_blocks_text" ADD CONSTRAINT "forms_blocks_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "forms_blocks_textarea" ADD CONSTRAINT "forms_blocks_textarea_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "forms_blocks_date_of_birth" ADD CONSTRAINT "forms_blocks_date_of_birth_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "forms_blocks_array" ADD CONSTRAINT "forms_blocks_array_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "forms_emails" ADD CONSTRAINT "forms_emails_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "form_submissions" ADD CONSTRAINT "form_submissions_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "redirects_rels" ADD CONSTRAINT "redirects_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."redirects"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "redirects_rels" ADD CONSTRAINT "redirects_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_events_fk" FOREIGN KEY ("events_id") REFERENCES "public"."events"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_forms_fk" FOREIGN KEY ("forms_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_form_submissions_fk" FOREIGN KEY ("form_submissions_id") REFERENCES "public"."form_submissions"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_redirects_fk" FOREIGN KEY ("redirects_id") REFERENCES "public"."redirects"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "header_nav_items" ADD CONSTRAINT "header_nav_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "header_rels" ADD CONSTRAINT "header_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."header"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "header_rels" ADD CONSTRAINT "header_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "header_rels" ADD CONSTRAINT "header_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "footer_page_links" ADD CONSTRAINT "footer_page_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "footer_rels" ADD CONSTRAINT "footer_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "footer_rels" ADD CONSTRAINT "footer_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "footer_rels" ADD CONSTRAINT "footer_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "company_info_social" ADD CONSTRAINT "company_info_social_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."company_info"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "company_info_hours" ADD CONSTRAINT "company_info_hours_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."company_info"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "company_info_rels" ADD CONSTRAINT "company_info_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."company_info"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "company_info_rels" ADD CONSTRAINT "company_info_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "company_info_rels" ADD CONSTRAINT "company_info_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "pages_blocks_events_links_order_idx" ON "pages_blocks_events_links" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_events_links_parent_id_idx" ON "pages_blocks_events_links" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_events_order_idx" ON "pages_blocks_events" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_events_parent_id_idx" ON "pages_blocks_events" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_events_path_idx" ON "pages_blocks_events" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_events_image_idx" ON "pages_blocks_events" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_rich_text_order_idx" ON "pages_blocks_rich_text" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_rich_text_parent_id_idx" ON "pages_blocks_rich_text" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_rich_text_path_idx" ON "pages_blocks_rich_text" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_links_block_link_cards_order_idx" ON "pages_blocks_links_block_link_cards" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_links_block_link_cards_parent_id_idx" ON "pages_blocks_links_block_link_cards" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_links_block_link_cards_image_idx" ON "pages_blocks_links_block_link_cards" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_links_block_order_idx" ON "pages_blocks_links_block" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_links_block_parent_id_idx" ON "pages_blocks_links_block" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_links_block_path_idx" ON "pages_blocks_links_block" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_events_page_announcements_order_idx" ON "pages_blocks_events_page_announcements" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_events_page_announcements_parent_id_idx" ON "pages_blocks_events_page_announcements" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_events_page_order_idx" ON "pages_blocks_events_page" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_events_page_parent_id_idx" ON "pages_blocks_events_page" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_events_page_path_idx" ON "pages_blocks_events_page" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_form_block_order_idx" ON "pages_blocks_form_block" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_form_block_parent_id_idx" ON "pages_blocks_form_block" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_form_block_path_idx" ON "pages_blocks_form_block" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_form_block_form_idx" ON "pages_blocks_form_block" USING btree ("form_id");
  CREATE INDEX IF NOT EXISTS "pages_two_col_layout_col_one_cta_links_order_idx" ON "pages_two_col_layout_col_one_cta_links" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_two_col_layout_col_one_cta_links_parent_id_idx" ON "pages_two_col_layout_col_one_cta_links" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_two_col_layout_order_idx" ON "pages_two_col_layout" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_two_col_layout_parent_id_idx" ON "pages_two_col_layout" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_two_col_layout_path_idx" ON "pages_two_col_layout" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_event_cards_order_idx" ON "pages_blocks_event_cards" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_event_cards_parent_id_idx" ON "pages_blocks_event_cards" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_event_cards_path_idx" ON "pages_blocks_event_cards" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_feature_cards_cards_order_idx" ON "pages_blocks_feature_cards_cards" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_feature_cards_cards_parent_id_idx" ON "pages_blocks_feature_cards_cards" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_feature_cards_order_idx" ON "pages_blocks_feature_cards" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_feature_cards_parent_id_idx" ON "pages_blocks_feature_cards" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_feature_cards_path_idx" ON "pages_blocks_feature_cards" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_layout_order_idx" ON "pages_blocks_layout" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_layout_parent_id_idx" ON "pages_blocks_layout" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_layout_path_idx" ON "pages_blocks_layout" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_meta_metadata_meta_metadata_image_idx" ON "pages" USING btree ("meta_metadata_image_id");
  CREATE INDEX IF NOT EXISTS "pages_slug_idx" ON "pages" USING btree ("slug");
  CREATE INDEX IF NOT EXISTS "pages_updated_at_idx" ON "pages" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "pages_created_at_idx" ON "pages" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "pages__status_idx" ON "pages" USING btree ("_status");
  CREATE INDEX IF NOT EXISTS "pages_rels_order_idx" ON "pages_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "pages_rels_parent_idx" ON "pages_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "pages_rels_path_idx" ON "pages_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "pages_rels_pages_id_idx" ON "pages_rels" USING btree ("pages_id");
  CREATE INDEX IF NOT EXISTS "pages_rels_media_id_idx" ON "pages_rels" USING btree ("media_id");
  CREATE INDEX IF NOT EXISTS "pages_rels_events_id_idx" ON "pages_rels" USING btree ("events_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_events_links_order_idx" ON "_pages_v_blocks_events_links" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_events_links_parent_id_idx" ON "_pages_v_blocks_events_links" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_events_order_idx" ON "_pages_v_blocks_events" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_events_parent_id_idx" ON "_pages_v_blocks_events" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_events_path_idx" ON "_pages_v_blocks_events" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_events_image_idx" ON "_pages_v_blocks_events" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_rich_text_order_idx" ON "_pages_v_blocks_rich_text" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_rich_text_parent_id_idx" ON "_pages_v_blocks_rich_text" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_rich_text_path_idx" ON "_pages_v_blocks_rich_text" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_links_block_link_cards_order_idx" ON "_pages_v_blocks_links_block_link_cards" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_links_block_link_cards_parent_id_idx" ON "_pages_v_blocks_links_block_link_cards" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_links_block_link_cards_image_idx" ON "_pages_v_blocks_links_block_link_cards" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_links_block_order_idx" ON "_pages_v_blocks_links_block" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_links_block_parent_id_idx" ON "_pages_v_blocks_links_block" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_links_block_path_idx" ON "_pages_v_blocks_links_block" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_events_page_announcements_order_idx" ON "_pages_v_blocks_events_page_announcements" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_events_page_announcements_parent_id_idx" ON "_pages_v_blocks_events_page_announcements" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_events_page_order_idx" ON "_pages_v_blocks_events_page" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_events_page_parent_id_idx" ON "_pages_v_blocks_events_page" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_events_page_path_idx" ON "_pages_v_blocks_events_page" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_form_block_order_idx" ON "_pages_v_blocks_form_block" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_form_block_parent_id_idx" ON "_pages_v_blocks_form_block" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_form_block_path_idx" ON "_pages_v_blocks_form_block" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_form_block_form_idx" ON "_pages_v_blocks_form_block" USING btree ("form_id");
  CREATE INDEX IF NOT EXISTS "__pages_v_two_col_layout_v_col_one_cta_links_order_idx" ON "__pages_v_two_col_layout_v_col_one_cta_links" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "__pages_v_two_col_layout_v_col_one_cta_links_parent_id_idx" ON "__pages_v_two_col_layout_v_col_one_cta_links" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "__pages_v_two_col_layout_v_order_idx" ON "__pages_v_two_col_layout_v" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "__pages_v_two_col_layout_v_parent_id_idx" ON "__pages_v_two_col_layout_v" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "__pages_v_two_col_layout_v_path_idx" ON "__pages_v_two_col_layout_v" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_event_cards_order_idx" ON "_pages_v_blocks_event_cards" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_event_cards_parent_id_idx" ON "_pages_v_blocks_event_cards" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_event_cards_path_idx" ON "_pages_v_blocks_event_cards" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_feature_cards_cards_order_idx" ON "_pages_v_blocks_feature_cards_cards" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_feature_cards_cards_parent_id_idx" ON "_pages_v_blocks_feature_cards_cards" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_feature_cards_order_idx" ON "_pages_v_blocks_feature_cards" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_feature_cards_parent_id_idx" ON "_pages_v_blocks_feature_cards" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_feature_cards_path_idx" ON "_pages_v_blocks_feature_cards" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_layout_order_idx" ON "_pages_v_blocks_layout" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_layout_parent_id_idx" ON "_pages_v_blocks_layout" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_layout_path_idx" ON "_pages_v_blocks_layout" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_parent_idx" ON "_pages_v" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_version_meta_metadata_version_meta_metadata_image_idx" ON "_pages_v" USING btree ("version_meta_metadata_image_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_version_version_slug_idx" ON "_pages_v" USING btree ("version_slug");
  CREATE INDEX IF NOT EXISTS "_pages_v_version_version_updated_at_idx" ON "_pages_v" USING btree ("version_updated_at");
  CREATE INDEX IF NOT EXISTS "_pages_v_version_version_created_at_idx" ON "_pages_v" USING btree ("version_created_at");
  CREATE INDEX IF NOT EXISTS "_pages_v_version_version__status_idx" ON "_pages_v" USING btree ("version__status");
  CREATE INDEX IF NOT EXISTS "_pages_v_created_at_idx" ON "_pages_v" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "_pages_v_updated_at_idx" ON "_pages_v" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "_pages_v_latest_idx" ON "_pages_v" USING btree ("latest");
  CREATE INDEX IF NOT EXISTS "_pages_v_autosave_idx" ON "_pages_v" USING btree ("autosave");
  CREATE INDEX IF NOT EXISTS "_pages_v_rels_order_idx" ON "_pages_v_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "_pages_v_rels_parent_idx" ON "_pages_v_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_rels_path_idx" ON "_pages_v_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "_pages_v_rels_pages_id_idx" ON "_pages_v_rels" USING btree ("pages_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_rels_media_id_idx" ON "_pages_v_rels" USING btree ("media_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_rels_events_id_idx" ON "_pages_v_rels" USING btree ("events_id");
  CREATE INDEX IF NOT EXISTS "events_updated_at_idx" ON "events" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "events_created_at_idx" ON "events" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX IF NOT EXISTS "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX IF NOT EXISTS "media_sizes_thumbnail_sizes_thumbnail_filename_idx" ON "media" USING btree ("sizes_thumbnail_filename");
  CREATE INDEX IF NOT EXISTS "media_sizes_meta_sizes_meta_filename_idx" ON "media" USING btree ("sizes_meta_filename");
  CREATE INDEX IF NOT EXISTS "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX IF NOT EXISTS "users_email_idx" ON "users" USING btree ("email");
  CREATE INDEX IF NOT EXISTS "forms_blocks_checkbox_order_idx" ON "forms_blocks_checkbox" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "forms_blocks_checkbox_parent_id_idx" ON "forms_blocks_checkbox" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "forms_blocks_checkbox_path_idx" ON "forms_blocks_checkbox" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "forms_blocks_country_order_idx" ON "forms_blocks_country" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "forms_blocks_country_parent_id_idx" ON "forms_blocks_country" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "forms_blocks_country_path_idx" ON "forms_blocks_country" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "forms_blocks_email_order_idx" ON "forms_blocks_email" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "forms_blocks_email_parent_id_idx" ON "forms_blocks_email" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "forms_blocks_email_path_idx" ON "forms_blocks_email" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "forms_blocks_message_order_idx" ON "forms_blocks_message" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "forms_blocks_message_parent_id_idx" ON "forms_blocks_message" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "forms_blocks_message_path_idx" ON "forms_blocks_message" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "forms_blocks_number_order_idx" ON "forms_blocks_number" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "forms_blocks_number_parent_id_idx" ON "forms_blocks_number" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "forms_blocks_number_path_idx" ON "forms_blocks_number" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "forms_blocks_payment_price_conditions_order_idx" ON "forms_blocks_payment_price_conditions" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "forms_blocks_payment_price_conditions_parent_id_idx" ON "forms_blocks_payment_price_conditions" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "forms_blocks_payment_order_idx" ON "forms_blocks_payment" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "forms_blocks_payment_parent_id_idx" ON "forms_blocks_payment" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "forms_blocks_payment_path_idx" ON "forms_blocks_payment" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "forms_blocks_select_options_order_idx" ON "forms_blocks_select_options" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "forms_blocks_select_options_parent_id_idx" ON "forms_blocks_select_options" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "forms_blocks_select_order_idx" ON "forms_blocks_select" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "forms_blocks_select_parent_id_idx" ON "forms_blocks_select" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "forms_blocks_select_path_idx" ON "forms_blocks_select" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "forms_blocks_state_order_idx" ON "forms_blocks_state" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "forms_blocks_state_parent_id_idx" ON "forms_blocks_state" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "forms_blocks_state_path_idx" ON "forms_blocks_state" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "forms_blocks_text_order_idx" ON "forms_blocks_text" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "forms_blocks_text_parent_id_idx" ON "forms_blocks_text" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "forms_blocks_text_path_idx" ON "forms_blocks_text" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "forms_blocks_textarea_order_idx" ON "forms_blocks_textarea" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "forms_blocks_textarea_parent_id_idx" ON "forms_blocks_textarea" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "forms_blocks_textarea_path_idx" ON "forms_blocks_textarea" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "forms_blocks_date_of_birth_order_idx" ON "forms_blocks_date_of_birth" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "forms_blocks_date_of_birth_parent_id_idx" ON "forms_blocks_date_of_birth" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "forms_blocks_date_of_birth_path_idx" ON "forms_blocks_date_of_birth" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "forms_blocks_array_order_idx" ON "forms_blocks_array" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "forms_blocks_array_parent_id_idx" ON "forms_blocks_array" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "forms_blocks_array_path_idx" ON "forms_blocks_array" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "forms_emails_order_idx" ON "forms_emails" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "forms_emails_parent_id_idx" ON "forms_emails" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "forms_updated_at_idx" ON "forms" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "forms_created_at_idx" ON "forms" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "form_submissions_form_idx" ON "form_submissions" USING btree ("form_id");
  CREATE INDEX IF NOT EXISTS "form_submissions_updated_at_idx" ON "form_submissions" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "form_submissions_created_at_idx" ON "form_submissions" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "redirects_from_idx" ON "redirects" USING btree ("from");
  CREATE INDEX IF NOT EXISTS "redirects_updated_at_idx" ON "redirects" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "redirects_created_at_idx" ON "redirects" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "redirects_rels_order_idx" ON "redirects_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "redirects_rels_parent_idx" ON "redirects_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "redirects_rels_path_idx" ON "redirects_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "redirects_rels_pages_id_idx" ON "redirects_rels" USING btree ("pages_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_pages_id_idx" ON "payload_locked_documents_rels" USING btree ("pages_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_events_id_idx" ON "payload_locked_documents_rels" USING btree ("events_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_forms_id_idx" ON "payload_locked_documents_rels" USING btree ("forms_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_form_submissions_id_idx" ON "payload_locked_documents_rels" USING btree ("form_submissions_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_redirects_id_idx" ON "payload_locked_documents_rels" USING btree ("redirects_id");
  CREATE INDEX IF NOT EXISTS "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX IF NOT EXISTS "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX IF NOT EXISTS "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "header_nav_items_order_idx" ON "header_nav_items" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "header_nav_items_parent_id_idx" ON "header_nav_items" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "header_rels_order_idx" ON "header_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "header_rels_parent_idx" ON "header_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "header_rels_path_idx" ON "header_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "header_rels_pages_id_idx" ON "header_rels" USING btree ("pages_id");
  CREATE INDEX IF NOT EXISTS "header_rels_media_id_idx" ON "header_rels" USING btree ("media_id");
  CREATE INDEX IF NOT EXISTS "footer_page_links_order_idx" ON "footer_page_links" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "footer_page_links_parent_id_idx" ON "footer_page_links" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "footer_rels_order_idx" ON "footer_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "footer_rels_parent_idx" ON "footer_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "footer_rels_path_idx" ON "footer_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "footer_rels_pages_id_idx" ON "footer_rels" USING btree ("pages_id");
  CREATE INDEX IF NOT EXISTS "footer_rels_media_id_idx" ON "footer_rels" USING btree ("media_id");
  CREATE INDEX IF NOT EXISTS "company_info_social_order_idx" ON "company_info_social" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "company_info_social_parent_id_idx" ON "company_info_social" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "company_info_hours_order_idx" ON "company_info_hours" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "company_info_hours_parent_id_idx" ON "company_info_hours" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "company_info_rels_order_idx" ON "company_info_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "company_info_rels_parent_idx" ON "company_info_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "company_info_rels_path_idx" ON "company_info_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "company_info_rels_pages_id_idx" ON "company_info_rels" USING btree ("pages_id");
  CREATE INDEX IF NOT EXISTS "company_info_rels_media_id_idx" ON "company_info_rels" USING btree ("media_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_events_links" CASCADE;
  DROP TABLE "pages_blocks_events" CASCADE;
  DROP TABLE "pages_blocks_rich_text" CASCADE;
  DROP TABLE "pages_blocks_links_block_link_cards" CASCADE;
  DROP TABLE "pages_blocks_links_block" CASCADE;
  DROP TABLE "pages_blocks_events_page_announcements" CASCADE;
  DROP TABLE "pages_blocks_events_page" CASCADE;
  DROP TABLE "pages_blocks_form_block" CASCADE;
  DROP TABLE "pages_two_col_layout_col_one_cta_links" CASCADE;
  DROP TABLE "pages_two_col_layout" CASCADE;
  DROP TABLE "pages_blocks_event_cards" CASCADE;
  DROP TABLE "pages_blocks_feature_cards_cards" CASCADE;
  DROP TABLE "pages_blocks_feature_cards" CASCADE;
  DROP TABLE "pages_blocks_layout" CASCADE;
  DROP TABLE "pages" CASCADE;
  DROP TABLE "pages_rels" CASCADE;
  DROP TABLE "_pages_v_blocks_events_links" CASCADE;
  DROP TABLE "_pages_v_blocks_events" CASCADE;
  DROP TABLE "_pages_v_blocks_rich_text" CASCADE;
  DROP TABLE "_pages_v_blocks_links_block_link_cards" CASCADE;
  DROP TABLE "_pages_v_blocks_links_block" CASCADE;
  DROP TABLE "_pages_v_blocks_events_page_announcements" CASCADE;
  DROP TABLE "_pages_v_blocks_events_page" CASCADE;
  DROP TABLE "_pages_v_blocks_form_block" CASCADE;
  DROP TABLE "__pages_v_two_col_layout_v_col_one_cta_links" CASCADE;
  DROP TABLE "__pages_v_two_col_layout_v" CASCADE;
  DROP TABLE "_pages_v_blocks_event_cards" CASCADE;
  DROP TABLE "_pages_v_blocks_feature_cards_cards" CASCADE;
  DROP TABLE "_pages_v_blocks_feature_cards" CASCADE;
  DROP TABLE "_pages_v_blocks_layout" CASCADE;
  DROP TABLE "_pages_v" CASCADE;
  DROP TABLE "_pages_v_rels" CASCADE;
  DROP TABLE "events" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "forms_blocks_checkbox" CASCADE;
  DROP TABLE "forms_blocks_country" CASCADE;
  DROP TABLE "forms_blocks_email" CASCADE;
  DROP TABLE "forms_blocks_message" CASCADE;
  DROP TABLE "forms_blocks_number" CASCADE;
  DROP TABLE "forms_blocks_payment_price_conditions" CASCADE;
  DROP TABLE "forms_blocks_payment" CASCADE;
  DROP TABLE "forms_blocks_select_options" CASCADE;
  DROP TABLE "forms_blocks_select" CASCADE;
  DROP TABLE "forms_blocks_state" CASCADE;
  DROP TABLE "forms_blocks_text" CASCADE;
  DROP TABLE "forms_blocks_textarea" CASCADE;
  DROP TABLE "forms_blocks_date_of_birth" CASCADE;
  DROP TABLE "forms_blocks_array" CASCADE;
  DROP TABLE "forms_emails" CASCADE;
  DROP TABLE "forms" CASCADE;
  DROP TABLE "form_submissions" CASCADE;
  DROP TABLE "redirects" CASCADE;
  DROP TABLE "redirects_rels" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "header_nav_items" CASCADE;
  DROP TABLE "header" CASCADE;
  DROP TABLE "header_rels" CASCADE;
  DROP TABLE "footer_page_links" CASCADE;
  DROP TABLE "footer" CASCADE;
  DROP TABLE "footer_rels" CASCADE;
  DROP TABLE "company_info_social" CASCADE;
  DROP TABLE "company_info_hours" CASCADE;
  DROP TABLE "company_info" CASCADE;
  DROP TABLE "company_info_rels" CASCADE;
  DROP TYPE "public"."enum_pages_blocks_events_links_link_type";
  DROP TYPE "public"."pages_blocks_events_links_link_link_style";
  DROP TYPE "public"."enum_pages_blocks_events_direction";
  DROP TYPE "public"."enum_pages_blocks_links_block_link_cards_link_type";
  DROP TYPE "public"."enum_pages_blocks_links_block_link_cards_image_upload_option";
  DROP TYPE "public"."enum_pages_two_col_layout_col_one_cta_links_link_type";
  DROP TYPE "public"."pages_two_col_layout_col_one_cta_links_link_link_style";
  DROP TYPE "public"."enum_pages_two_col_layout_direction";
  DROP TYPE "public"."enum_pages_two_col_layout_breakpoint";
  DROP TYPE "public"."enum_pages_two_col_layout_col_one_content_type";
  DROP TYPE "public"."enum_pages_two_col_layout_col_one_v_align";
  DROP TYPE "public"."enum_pages_two_col_layout_col_one_cta_heading";
  DROP TYPE "public"."enum_pages_two_col_layout_col_two_content_type";
  DROP TYPE "public"."enum_pages_status";
  DROP TYPE "public"."enum__pages_v_blocks_events_links_link_type";
  DROP TYPE "public"."_pages_v_blocks_events_links_link_link_style";
  DROP TYPE "public"."enum__pages_v_blocks_events_direction";
  DROP TYPE "public"."enum__pages_v_blocks_links_block_link_cards_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_links_block_link_cards_image_upload_option";
  DROP TYPE "public"."enum___pages_v_two_col_layout_v_col_one_cta_links_link_type";
  DROP TYPE "public"."__pages_v_two_col_layout_v_col_one_cta_links_link_link_style";
  DROP TYPE "public"."enum___pages_v_two_col_layout_v_direction";
  DROP TYPE "public"."enum___pages_v_two_col_layout_v_breakpoint";
  DROP TYPE "public"."enum___pages_v_two_col_layout_v_col_one_content_type";
  DROP TYPE "public"."enum___pages_v_two_col_layout_v_col_one_v_align";
  DROP TYPE "public"."enum___pages_v_two_col_layout_v_col_one_cta_heading";
  DROP TYPE "public"."enum___pages_v_two_col_layout_v_col_two_content_type";
  DROP TYPE "public"."enum__pages_v_version_status";
  DROP TYPE "public"."enum_users_role";
  DROP TYPE "public"."enum_forms_blocks_payment_price_conditions_condition";
  DROP TYPE "public"."enum_forms_blocks_payment_price_conditions_operator";
  DROP TYPE "public"."enum_forms_blocks_payment_price_conditions_value_type";
  DROP TYPE "public"."enum_forms_confirmation_type";
  DROP TYPE "public"."enum_form_submissions_payment_status";
  DROP TYPE "public"."enum_redirects_to_type";
  DROP TYPE "public"."enum_header_nav_items_link_type";
  DROP TYPE "public"."enum_footer_page_links_link_type";
  DROP TYPE "public"."enum_company_info_social_link_type";
  DROP TYPE "public"."enum_company_info_hours_type";`)
}
