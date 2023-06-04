import { TRPCError } from '@trpc/server';
import { UserEntity } from './user.entity';

export const upsertUser = async (DB: D1Database, accessToken: string) => {
  const userRes = await DB.prepare(`SELECT * FROM users WHERE access_token = ?`)
    .bind(accessToken)
    .all<UserEntity>();

  const user = userRes.results?.[0];

  if (user) {
    return user;
  }

  const insertResult = await DB.prepare(
    `INSERT INTO users (access_token, created_at) VALUES (?, ?) RETURNING id, access_token`,
  )
    .bind(accessToken, new Date().toISOString())
    .all<UserEntity>();

  const createdUser = insertResult.results?.[0];

  if (!createdUser) {
    throw new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message: 'Failed to create user',
    });
  }

  return createdUser;
};
