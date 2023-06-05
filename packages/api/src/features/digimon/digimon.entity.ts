export interface DigimonEntity {
  id: number;
  wiki_id: number;
  data: string;
  raw_data: string;
  image_id: string;
  created_at: string;
}

export interface DigimonDataEntity {
  id: number;
  name: string;
  level: string;
  description: string | undefined;
}
