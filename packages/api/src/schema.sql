CREATE TABLE IF NOT EXISTS digimon (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  wiki_id INTEGER NOT NULL,
  data TEXT NOT NULL,
  raw_data TEXT NOT NULL,
  image_id TEXT NOT NULL,
  created_at TEXT NOT NULL,
  is_playable INTEGER NOT NULL DEFAULT 1
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_digimon_wiki_id ON digimon(wiki_id);
CREATE INDEX IF NOT EXISTS idx_digimon_image_id ON digimon(image_id);

CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  access_token TEXT NOT NULL,
  created_at TEXT NOT NULL
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_users_access_token ON users(access_token);

CREATE TABLE IF NOT EXISTS guesses(
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  digimon_id INTEGER NOT NULL,
  is_correct INTEGER NOT NULL,
  created_at TEXT NOT NULL,
  FOREIGN KEY(user_id) REFERENCES users(id),
  FOREIGN KEY(digimon_id) REFERENCES digimon(id)
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_guesses_user_digimon ON guesses(user_id, digimon_id);
