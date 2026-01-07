CREATE TABLE "postcoach_analysis_cache" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"fid" integer NOT NULL,
	"username" text,
	"analysis_json" jsonb NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"expires_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "postcoach_cast_embeddings" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"cast_hash" text NOT NULL,
	"fid" integer NOT NULL,
	"embedding" jsonb NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "postcoach_cast_embeddings_cast_hash_unique" UNIQUE("cast_hash")
);
--> statement-breakpoint
CREATE TABLE "postcoach_rate_limits" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"identifier" text NOT NULL,
	"endpoint" text NOT NULL,
	"request_count" integer DEFAULT 0 NOT NULL,
	"window_start" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "postcoach_user_analysis_history" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"analyzed_fid" integer NOT NULL,
	"analyzed_username" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "postcoach_users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"fid" integer NOT NULL,
	"username" text NOT NULL,
	"display_name" text,
	"pfp_url" text,
	"custody_address" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"last_login_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "postcoach_users_fid_unique" UNIQUE("fid")
);
--> statement-breakpoint
ALTER TABLE "postcoach_user_analysis_history" ADD CONSTRAINT "postcoach_user_analysis_history_user_id_postcoach_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."postcoach_users"("id") ON DELETE cascade ON UPDATE no action;