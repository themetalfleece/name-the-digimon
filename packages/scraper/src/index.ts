import { getEnglishName } from './getEnglishName.util';

export interface Env {
  DB: D1Database;
  CLOUDFLARE_IMAGES_API_TOKEN: string;
  CLOUDFLARE_ACCOUNT_ID: string;
  ENVIRONMENT: 'dev' | 'staging' | 'production';
}

export default {
  async scheduled(
    _controller: ScheduledController,
    env: Env,
    _ctx: ExecutionContext,
  ): Promise<void> {
    const lastWikiIdInDbRes = await env.DB.prepare(
      'SELECT wiki_id FROM digimon ORDER BY wiki_id DESC LIMIT 1',
    ).first<{
      wiki_id: number;
    }>();

    const lastWikiIdInDb = lastWikiIdInDbRes?.wiki_id ?? 0;

    const wikiIdToFetch = lastWikiIdInDb + 1;

    const digimonRawData: any = await fetch(
      `https://digimon-api.com/api/v1/digimon/${wikiIdToFetch}`,
    ).then((res) => res.json());

    const digimonData = {
      id: digimonRawData.id,
      name: getEnglishName(digimonRawData.name),
      level: digimonRawData.levels?.[0]?.level || '',
      description: digimonRawData.descriptions?.find(
        ({ language }: { language: string }) => language === 'en_us',
      )?.description,
    };

    if (!digimonData?.id) {
      return;
    }

    let imageId = '';
    const apiImageUrl = digimonRawData.images?.[0]?.href;
    if (apiImageUrl) {
      const formData = new FormData();
      formData.append('url', apiImageUrl);
      formData.append('requireSignedURLs', 'false');
      formData.append(
        'metadata',
        JSON.stringify({
          source: 'name-the-digimon',
          environment: env.ENVIRONMENT,
          wikiId: wikiIdToFetch,
        }),
      );

      const response = await fetch(
        `https://api.cloudflare.com/client/v4/accounts/${env.CLOUDFLARE_ACCOUNT_ID}/images/v1`,
        {
          body: formData,
          method: 'POST',
          headers: {
            Authorization: `Bearer ${env.CLOUDFLARE_IMAGES_API_TOKEN}`,
          },
        },
      );

      imageId = (await response.json<any>()).result.id;
    }

    await env.DB.prepare(
      `
    	INSERT INTO digimon (wiki_id, data, raw_data, image_id, created_at)
    	VALUES (?, ?, ?, ?, ?)
    `,
    )
      .bind(
        wikiIdToFetch,
        JSON.stringify(digimonData),
        JSON.stringify(digimonRawData),
        imageId,
        new Date().toISOString(),
      )
      .run();
  },
};
