import { TRPCError } from '@trpc/server';

export const upsertUser = async (DB: D1Database, accessToken: string) => {
  const userRes = await DB.prepare(`SELECT * FROM users WHERE access_token = ?`)
    .bind(accessToken)
    .all();

  const user = userRes.results?.[0];

  if (!user) {
    const insertResult = await DB.prepare(
      `INSERT INTO users (access_token, created_at) VALUES (?, ?) RETURNING id, access_token`,
    )
      .bind(accessToken, new Date().toISOString())
      .all<{ id: string; access_token: string }>();

    const createdUser = insertResult.results?.[0];

    if (!createdUser) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Failed to create user',
      });
    }

    return {
      id: createdUser.id,
      accessToken: createdUser.access_token,
    };
  }
};
