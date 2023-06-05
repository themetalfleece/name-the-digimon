import { t } from '../../trpc/trpc.util';
import { DigimonDataEntity, DigimonEntity } from './digimon.entity';

const toDigimon = (
  cloudflareAccountHash: string,
  digimonEntity: DigimonEntity,
) => {
  const data: DigimonDataEntity = JSON.parse(digimonEntity.data);

  return {
    id: digimonEntity.id,
    name: data.name,
    level: data.level,
    description: data.description,
    imageUrl: `https://imagedelivery.net/${cloudflareAccountHash}/${digimonEntity.image_id}/public`,
  };
};

export const digimonRouter = t.router({
  getRandom: t.procedure.query(async ({ ctx }) => {
    try {
      const { DB } = ctx;
      const { id: userId } = ctx.user;

      const digimon = await DB.prepare(
        `
          SELECT id, data, image_id FROM digimon
          WHERE id NOT IN (SELECT digimon_id FROM guesses WHERE user_id = ?)
          AND is_playable = 1
          ORDER BY RANDOM()
          LIMIT 1
        `,
      )
        .bind(userId)
        .first<DigimonEntity>();

      if (digimon) {
        return toDigimon(ctx.CLOUDFLARE_ACCOUNT_HASH, digimon);
      }

      const randomDigimon = await DB.prepare(
        'SELECT id, data, image_id FROM digimon WHERE is_playable = 1 ORDER BY RANDOM() LIMIT 1',
      ).first<DigimonEntity>();

      return toDigimon(ctx.CLOUDFLARE_ACCOUNT_HASH, randomDigimon);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }),
});
