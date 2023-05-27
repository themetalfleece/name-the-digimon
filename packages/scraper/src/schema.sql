CREATE TABLE IF NOT EXISTS digimon (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  wiki_id INTEGER NOT NULL,
  data TEXT NOT NULL,
  raw_data TEXT NOT NULL,
  image_url TEXT NOT NULL,
  created_at TEXT NOT NULL
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_digimon_wiki_id ON digimon(wiki_id);