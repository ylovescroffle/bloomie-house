/**
 * Ensure portal schema exists (idempotent). Used when migrations were not
 * applied yet on a fresh D1 binding / local SQLite file.
 */
export async function ensureSchema(env) {
  if (!env.DB) return;
  await env.DB.batch([
    env.DB.prepare(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT NOT NULL UNIQUE COLLATE NOCASE,
        name TEXT NOT NULL DEFAULT '',
        phone TEXT NOT NULL DEFAULT '',
        business_name TEXT NOT NULL DEFAULT '',
        role TEXT NOT NULL DEFAULT 'member' CHECK (role IN ('member', 'staff')),
        password_hash TEXT,
        password_salt TEXT,
        created_at TEXT NOT NULL DEFAULT (datetime('now')),
        updated_at TEXT NOT NULL DEFAULT (datetime('now'))
      )
    `),
    env.DB.prepare(
      `CREATE INDEX IF NOT EXISTS idx_users_role ON users(role)`
    ),
    env.DB.prepare(`
      CREATE TABLE IF NOT EXISTS sessions (
        token TEXT PRIMARY KEY,
        user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        expires_at TEXT NOT NULL,
        created_at TEXT NOT NULL DEFAULT (datetime('now'))
      )
    `),
    env.DB.prepare(
      `CREATE INDEX IF NOT EXISTS idx_sessions_user ON sessions(user_id)`
    ),
    env.DB.prepare(
      `CREATE INDEX IF NOT EXISTS idx_sessions_expires ON sessions(expires_at)`
    ),
    env.DB.prepare(`
      CREATE TABLE IF NOT EXISTS magic_links (
        token TEXT PRIMARY KEY,
        email TEXT NOT NULL COLLATE NOCASE,
        expires_at TEXT NOT NULL,
        used_at TEXT,
        created_at TEXT NOT NULL DEFAULT (datetime('now'))
      )
    `),
    env.DB.prepare(
      `CREATE INDEX IF NOT EXISTS idx_magic_links_email ON magic_links(email)`
    ),
    env.DB.prepare(`
      CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        slug TEXT NOT NULL UNIQUE,
        name TEXT NOT NULL,
        niche TEXT NOT NULL DEFAULT '',
        platform TEXT NOT NULL DEFAULT '',
        category TEXT NOT NULL DEFAULT 'canva',
        badge TEXT NOT NULL DEFAULT '',
        price REAL NOT NULL DEFAULT 0,
        original_price REAL,
        description TEXT NOT NULL DEFAULT '',
        features_json TEXT NOT NULL DEFAULT '[]',
        images_json TEXT NOT NULL DEFAULT '[]',
        video_url TEXT NOT NULL DEFAULT '',
        published INTEGER NOT NULL DEFAULT 1,
        sort_order INTEGER NOT NULL DEFAULT 0,
        created_at TEXT NOT NULL DEFAULT (datetime('now')),
        updated_at TEXT NOT NULL DEFAULT (datetime('now'))
      )
    `),
    env.DB.prepare(
      `CREATE INDEX IF NOT EXISTS idx_products_published ON products(published)`
    ),
    env.DB.prepare(`
      CREATE TABLE IF NOT EXISTS orders (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        order_number TEXT NOT NULL UNIQUE,
        user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        status TEXT NOT NULL DEFAULT 'pending'
          CHECK (status IN ('pending', 'paid', 'processing', 'completed', 'cancelled')),
        total REAL NOT NULL DEFAULT 0,
        currency TEXT NOT NULL DEFAULT 'AUD',
        notes TEXT NOT NULL DEFAULT '',
        created_at TEXT NOT NULL DEFAULT (datetime('now')),
        updated_at TEXT NOT NULL DEFAULT (datetime('now'))
      )
    `),
    env.DB.prepare(
      `CREATE INDEX IF NOT EXISTS idx_orders_user ON orders(user_id)`
    ),
    env.DB.prepare(
      `CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status)`
    ),
    env.DB.prepare(`
      CREATE TABLE IF NOT EXISTS order_items (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        order_id INTEGER NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
        product_id INTEGER REFERENCES products(id) ON DELETE SET NULL,
        product_name TEXT NOT NULL,
        price REAL NOT NULL DEFAULT 0,
        quantity INTEGER NOT NULL DEFAULT 1
      )
    `),
    env.DB.prepare(
      `CREATE INDEX IF NOT EXISTS idx_order_items_order ON order_items(order_id)`
    ),
    env.DB.prepare(`
      CREATE TABLE IF NOT EXISTS downloads (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        order_id INTEGER NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
        title TEXT NOT NULL,
        file_url TEXT NOT NULL,
        sort_order INTEGER NOT NULL DEFAULT 0,
        created_at TEXT NOT NULL DEFAULT (datetime('now'))
      )
    `),
    env.DB.prepare(
      `CREATE INDEX IF NOT EXISTS idx_downloads_order ON downloads(order_id)`
    ),
    env.DB.prepare(`
      CREATE TABLE IF NOT EXISTS guidelines (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        order_id INTEGER NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
        title TEXT NOT NULL,
        body TEXT NOT NULL DEFAULT '',
        file_url TEXT NOT NULL DEFAULT '',
        sort_order INTEGER NOT NULL DEFAULT 0,
        created_at TEXT NOT NULL DEFAULT (datetime('now'))
      )
    `),
    env.DB.prepare(
      `CREATE INDEX IF NOT EXISTS idx_guidelines_order ON guidelines(order_id)`
    ),
    env.DB.prepare(`
      CREATE TABLE IF NOT EXISTS template_requests (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        title TEXT NOT NULL,
        description TEXT NOT NULL DEFAULT '',
        niche TEXT NOT NULL DEFAULT '',
        status TEXT NOT NULL DEFAULT 'open'
          CHECK (status IN ('open', 'planned', 'done', 'closed')),
        vote_count INTEGER NOT NULL DEFAULT 0,
        created_at TEXT NOT NULL DEFAULT (datetime('now')),
        updated_at TEXT NOT NULL DEFAULT (datetime('now'))
      )
    `),
    env.DB.prepare(
      `CREATE INDEX IF NOT EXISTS idx_template_requests_status ON template_requests(status)`
    ),
    env.DB.prepare(
      `CREATE INDEX IF NOT EXISTS idx_template_requests_votes ON template_requests(vote_count DESC)`
    ),
    env.DB.prepare(`
      CREATE TABLE IF NOT EXISTS template_request_votes (
        request_id INTEGER NOT NULL REFERENCES template_requests(id) ON DELETE CASCADE,
        user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        created_at TEXT NOT NULL DEFAULT (datetime('now')),
        PRIMARY KEY (request_id, user_id)
      )
    `),
  ]);
}
