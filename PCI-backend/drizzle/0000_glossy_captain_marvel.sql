DO $$ BEGIN
 CREATE TYPE "currency" AS ENUM('USD', 'EUR', 'GBP');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "news_status" AS ENUM('draft', 'published', 'archived');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "account" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" varchar(255) NOT NULL,
	"first_name" varchar(255) NOT NULL,
	"last_name" varchar(255) NOT NULL,
	"currency" "currency" DEFAULT 'USD' NOT NULL,
	"balance" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "categories" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"description" text,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "categories_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "news_classification_assignments" (
	"id" serial PRIMARY KEY NOT NULL,
	"news_id" integer NOT NULL,
	"classification_id" integer NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "news_classifications" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(50) NOT NULL,
	"priority" integer DEFAULT 0 NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "news_classifications_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "news" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(255) NOT NULL,
	"slug" varchar(255) NOT NULL,
	"excerpt" text NOT NULL,
	"content" text NOT NULL,
	"featured_image" varchar(500),
	"other_images" text[],
	"category_id" integer NOT NULL,
	"status" "news_status" DEFAULT 'draft' NOT NULL,
	"view_count" integer DEFAULT 0 NOT NULL,
	"read_time" integer,
	"meta_description" varchar(160),
	"meta_keywords" varchar(255),
	"published_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "news_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "news_tags" (
	"id" serial PRIMARY KEY NOT NULL,
	"news_id" integer NOT NULL,
	"tag_id" integer NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tags" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(50) NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "tags_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "categories_active_name_idx" ON "categories" ("is_active","name");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "categories_name_idx" ON "categories" ("name");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "categories_active_idx" ON "categories" ("is_active");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "news_classification_unique_idx" ON "news_classification_assignments" ("news_id","classification_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "news_classification_news_id_idx" ON "news_classification_assignments" ("news_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "news_classification_classification_id_idx" ON "news_classification_assignments" ("classification_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "news_classifications_active_priority_idx" ON "news_classifications" ("is_active","priority");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "news_classifications_name_idx" ON "news_classifications" ("name");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "news_classifications_active_idx" ON "news_classifications" ("is_active");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "news_status_published_idx" ON "news" ("status","published_at");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "news_slug_idx" ON "news" ("slug");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "news_category_status_idx" ON "news" ("category_id","status");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "news_published_at_idx" ON "news" ("published_at");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "news_title_idx" ON "news" ("title");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "news_view_count_idx" ON "news" ("view_count");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "news_category_id_idx" ON "news" ("category_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "news_tags_unique_idx" ON "news_tags" ("news_id","tag_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "news_tags_news_id_idx" ON "news_tags" ("news_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "news_tags_tag_id_idx" ON "news_tags" ("tag_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "tags_active_name_idx" ON "tags" ("is_active","name");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "tags_name_idx" ON "tags" ("name");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "tags_active_idx" ON "tags" ("is_active");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "tags_created_at_idx" ON "tags" ("created_at");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "news_classification_assignments" ADD CONSTRAINT "news_classification_assignments_news_id_news_id_fk" FOREIGN KEY ("news_id") REFERENCES "news"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "news_classification_assignments" ADD CONSTRAINT "news_classification_assignments_classification_id_news_classifications_id_fk" FOREIGN KEY ("classification_id") REFERENCES "news_classifications"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "news" ADD CONSTRAINT "news_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "news_tags" ADD CONSTRAINT "news_tags_news_id_news_id_fk" FOREIGN KEY ("news_id") REFERENCES "news"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "news_tags" ADD CONSTRAINT "news_tags_tag_id_tags_id_fk" FOREIGN KEY ("tag_id") REFERENCES "tags"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
