-- One-shot: convert remaining money int columns to bigint (dev sync-safe).
-- Run via: docker exec -i shop-postgres psql -U postgres -d shop < scripts/db-fix-money-bigint.sql

ALTER TABLE orders ALTER COLUMN subtotal TYPE bigint USING COALESCE(subtotal, 0)::bigint;
ALTER TABLE orders ALTER COLUMN subtotal SET DEFAULT 0;
ALTER TABLE orders ALTER COLUMN subtotal SET NOT NULL;

ALTER TABLE orders ALTER COLUMN discount TYPE bigint USING COALESCE(discount, 0)::bigint;
ALTER TABLE orders ALTER COLUMN discount SET DEFAULT 0;
ALTER TABLE orders ALTER COLUMN discount SET NOT NULL;

ALTER TABLE orders ALTER COLUMN shipping_cost TYPE bigint USING COALESCE(shipping_cost, 0)::bigint;
ALTER TABLE orders ALTER COLUMN shipping_cost SET DEFAULT 0;
ALTER TABLE orders ALTER COLUMN shipping_cost SET NOT NULL;

ALTER TABLE orders ALTER COLUMN total TYPE bigint USING COALESCE(total, 0)::bigint;
ALTER TABLE orders ALTER COLUMN total SET DEFAULT 0;
ALTER TABLE orders ALTER COLUMN total SET NOT NULL;

ALTER TABLE order_items ALTER COLUMN unit_price TYPE bigint USING COALESCE(unit_price, 0)::bigint;
ALTER TABLE order_items ALTER COLUMN unit_price SET DEFAULT 0;
ALTER TABLE order_items ALTER COLUMN unit_price SET NOT NULL;

ALTER TABLE products ALTER COLUMN price TYPE bigint USING COALESCE(price, 0)::bigint;
ALTER TABLE products ALTER COLUMN price SET DEFAULT 0;
ALTER TABLE products ALTER COLUMN price SET NOT NULL;

ALTER TABLE shipping_methods ALTER COLUMN price TYPE bigint USING COALESCE(price, 0)::bigint;
ALTER TABLE shipping_methods ALTER COLUMN price SET DEFAULT 0;
ALTER TABLE shipping_methods ALTER COLUMN price SET NOT NULL;

ALTER TABLE shipping_methods ALTER COLUMN free_above TYPE bigint USING free_above::bigint;

ALTER TABLE coupons ALTER COLUMN min_order_amount TYPE bigint USING COALESCE(min_order_amount, 0)::bigint;
ALTER TABLE coupons ALTER COLUMN min_order_amount SET DEFAULT 0;
ALTER TABLE coupons ALTER COLUMN min_order_amount SET NOT NULL;

ALTER TABLE orders ADD COLUMN IF NOT EXISTS tracking_code character varying(80);
