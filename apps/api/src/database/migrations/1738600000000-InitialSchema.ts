import type { MigrationInterface, QueryRunner } from 'typeorm';

/**
 * Baseline schema. Safe on fresh DBs and on DBs previously created via synchronize
 * (CREATE IF NOT EXISTS / INDEX IF NOT EXISTS).
 */
export class InitialSchema1738600000000 implements MigrationInterface {
  name = 'InitialSchema1738600000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "pgcrypto"`);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "users" (
        "id" uuid NOT NULL DEFAULT gen_random_uuid(),
        "email" character varying NOT NULL,
        "password_hash" character varying NOT NULL,
        "full_name" character varying NOT NULL,
        "role" character varying(32) NOT NULL DEFAULT 'customer',
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "PK_users" PRIMARY KEY ("id"),
        CONSTRAINT "UQ_users_email" UNIQUE ("email")
      )
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "categories" (
        "id" uuid NOT NULL DEFAULT gen_random_uuid(),
        "name" character varying NOT NULL,
        "slug" character varying NOT NULL,
        "parent_id" uuid,
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "PK_categories" PRIMARY KEY ("id")
      )
    `);
    await queryRunner.query(
      `CREATE UNIQUE INDEX IF NOT EXISTS "IDX_categories_slug" ON "categories" ("slug")`,
    );

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "products" (
        "id" uuid NOT NULL DEFAULT gen_random_uuid(),
        "name" character varying NOT NULL,
        "slug" character varying NOT NULL,
        "description" text NOT NULL DEFAULT '',
        "price" integer NOT NULL,
        "stock" integer NOT NULL DEFAULT 0,
        "category_id" uuid,
        "images" jsonb NOT NULL DEFAULT '[]',
        "is_active" boolean NOT NULL DEFAULT true,
        "is_featured" boolean NOT NULL DEFAULT false,
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "PK_products" PRIMARY KEY ("id")
      )
    `);
    await queryRunner.query(
      `CREATE UNIQUE INDEX IF NOT EXISTS "IDX_products_slug" ON "products" ("slug")`,
    );

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "addresses" (
        "id" uuid NOT NULL DEFAULT gen_random_uuid(),
        "user_id" uuid NOT NULL,
        "label" character varying,
        "full_name" character varying NOT NULL,
        "phone" character varying NOT NULL,
        "province" character varying NOT NULL,
        "city" character varying NOT NULL,
        "postal_code" character varying NOT NULL,
        "line" text NOT NULL,
        "is_default" boolean NOT NULL DEFAULT false,
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "PK_addresses" PRIMARY KEY ("id")
      )
    `);
    await queryRunner.query(
      `CREATE INDEX IF NOT EXISTS "IDX_addresses_user_id" ON "addresses" ("user_id")`,
    );

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "orders" (
        "id" uuid NOT NULL DEFAULT gen_random_uuid(),
        "user_id" uuid NOT NULL,
        "status" character varying NOT NULL DEFAULT 'pending',
        "payment_status" character varying NOT NULL DEFAULT 'pending',
        "subtotal" integer NOT NULL DEFAULT 0,
        "discount" integer NOT NULL DEFAULT 0,
        "coupon_code" character varying(32),
        "shipping_method_id" uuid,
        "shipping_method_name" character varying(80),
        "shipping_cost" integer NOT NULL DEFAULT 0,
        "note" character varying(500),
        "total" integer NOT NULL,
        "payment_authority" character varying,
        "payment_ref_id" character varying,
        "address" jsonb NOT NULL,
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "PK_orders" PRIMARY KEY ("id")
      )
    `);
    await queryRunner.query(
      `CREATE INDEX IF NOT EXISTS "IDX_orders_user_id" ON "orders" ("user_id")`,
    );
    await queryRunner.query(`
      CREATE UNIQUE INDEX IF NOT EXISTS "UQ_orders_payment_authority"
      ON "orders" ("payment_authority")
      WHERE "payment_authority" IS NOT NULL
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "order_items" (
        "id" uuid NOT NULL DEFAULT gen_random_uuid(),
        "order_id" uuid NOT NULL,
        "product_id" uuid NOT NULL,
        "name" character varying NOT NULL,
        "unit_price" integer NOT NULL,
        "quantity" integer NOT NULL,
        CONSTRAINT "PK_order_items" PRIMARY KEY ("id")
      )
    `);
    await queryRunner.query(`
      DO $$ BEGIN
        ALTER TABLE "order_items"
          ADD CONSTRAINT "FK_order_items_order_id"
          FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE CASCADE;
      EXCEPTION
        WHEN duplicate_object THEN NULL;
      END $$
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "reviews" (
        "id" uuid NOT NULL DEFAULT gen_random_uuid(),
        "product_id" uuid NOT NULL,
        "user_id" uuid NOT NULL,
        "rating" integer NOT NULL,
        "comment" text NOT NULL,
        "status" character varying(20) NOT NULL DEFAULT 'approved',
        "reply" text,
        "replied_at" TIMESTAMPTZ,
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "PK_reviews" PRIMARY KEY ("id")
      )
    `);
    await queryRunner.query(
      `CREATE INDEX IF NOT EXISTS "IDX_reviews_product_id" ON "reviews" ("product_id")`,
    );
    await queryRunner.query(
      `CREATE INDEX IF NOT EXISTS "IDX_reviews_user_id" ON "reviews" ("user_id")`,
    );
    await queryRunner.query(
      `CREATE INDEX IF NOT EXISTS "IDX_reviews_status" ON "reviews" ("status")`,
    );
    await queryRunner.query(`
      DO $$ BEGIN
        ALTER TABLE "reviews"
          ADD CONSTRAINT "UQ_reviews_product_user" UNIQUE ("product_id", "user_id");
      EXCEPTION
        WHEN duplicate_object THEN NULL;
      END $$
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "coupons" (
        "id" uuid NOT NULL DEFAULT gen_random_uuid(),
        "code" character varying(32) NOT NULL,
        "type" character varying(16) NOT NULL,
        "value" integer NOT NULL,
        "min_order_amount" integer NOT NULL DEFAULT 0,
        "max_uses" integer,
        "used_count" integer NOT NULL DEFAULT 0,
        "expires_at" TIMESTAMPTZ,
        "is_active" boolean NOT NULL DEFAULT true,
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "PK_coupons" PRIMARY KEY ("id")
      )
    `);
    await queryRunner.query(
      `CREATE UNIQUE INDEX IF NOT EXISTS "IDX_coupons_code" ON "coupons" ("code")`,
    );

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "contact_messages" (
        "id" uuid NOT NULL DEFAULT gen_random_uuid(),
        "name" character varying(80) NOT NULL,
        "email" character varying(120) NOT NULL,
        "phone" character varying(20),
        "subject" character varying(120) NOT NULL,
        "message" text NOT NULL,
        "status" character varying(20) NOT NULL DEFAULT 'new',
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "PK_contact_messages" PRIMARY KEY ("id")
      )
    `);
    await queryRunner.query(
      `CREATE INDEX IF NOT EXISTS "IDX_contact_messages_status" ON "contact_messages" ("status")`,
    );

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "shipping_methods" (
        "id" uuid NOT NULL DEFAULT gen_random_uuid(),
        "name" character varying(80) NOT NULL,
        "description" character varying(300),
        "price" integer NOT NULL DEFAULT 0,
        "estimated_days" integer NOT NULL DEFAULT 3,
        "free_above" integer,
        "sort_order" integer NOT NULL DEFAULT 0,
        "is_active" boolean NOT NULL DEFAULT true,
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "PK_shipping_methods" PRIMARY KEY ("id")
      )
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "refresh_tokens" (
        "id" uuid NOT NULL DEFAULT gen_random_uuid(),
        "user_id" uuid NOT NULL,
        "token_hash" character varying(64) NOT NULL,
        "expires_at" TIMESTAMPTZ NOT NULL,
        "revoked_at" TIMESTAMPTZ,
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "PK_refresh_tokens" PRIMARY KEY ("id")
      )
    `);
    await queryRunner.query(
      `CREATE INDEX IF NOT EXISTS "IDX_refresh_tokens_user_id" ON "refresh_tokens" ("user_id")`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX IF NOT EXISTS "IDX_refresh_tokens_token_hash" ON "refresh_tokens" ("token_hash")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS "refresh_tokens"`);
    await queryRunner.query(`DROP TABLE IF EXISTS "shipping_methods"`);
    await queryRunner.query(`DROP TABLE IF EXISTS "contact_messages"`);
    await queryRunner.query(`DROP TABLE IF EXISTS "coupons"`);
    await queryRunner.query(`DROP TABLE IF EXISTS "reviews"`);
    await queryRunner.query(`DROP TABLE IF EXISTS "order_items"`);
    await queryRunner.query(`DROP TABLE IF EXISTS "orders"`);
    await queryRunner.query(`DROP TABLE IF EXISTS "addresses"`);
    await queryRunner.query(`DROP TABLE IF EXISTS "products"`);
    await queryRunner.query(`DROP TABLE IF EXISTS "categories"`);
    await queryRunner.query(`DROP TABLE IF EXISTS "users"`);
  }
}
