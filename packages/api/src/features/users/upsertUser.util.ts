import { TRPCError } from '@trpc/server';
import { UserEntity } from './user.entity';

export const upsertUser = async (DB: D1Database, accessToken: string) => {
  const user = await DB.prepare(`SELECT * FROM users WHERE access_token = ?`)
    .bind(accessToken)
    .first<UserEntity>();

  if (user) {
    return user;
  }

  const createdUser = await DB.prepare(
    `INSERT INTO users (access_token, created_at) VALUES (?, ?) RETURNING id, access_token`,
  )
    .bind(accessToken, new Date().toISOString())
    .first<UserEntity>();

  if (!createdUser) {
    throw new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message: 'Failed to create user',
    });
  }

  return createdUser;
};
