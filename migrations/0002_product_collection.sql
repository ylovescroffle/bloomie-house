-- Shop collection for CMS products (beauty / wedding / others)
ALTER TABLE products ADD COLUMN collection TEXT NOT NULL DEFAULT 'others';
CREATE INDEX IF NOT EXISTS idx_products_collection ON products(collection);
