import { z } from 'zod';
import { t } from '../../trpc/trpc.util';

export const progressRouter = t.router({
  get: t.procedure.query(async ({ ctx }) => {
    const { id: userId } = ctx.user;
    const { DB } = ctx;

    const correctGuessesRes = await DB.prepare(
      'SELECT count(id) as correct_guesses FROM guesses WHERE user_id = ? AND is_correct = 1',
    )
      .bind(userId)
      .first<{ correct_guesses: number }>();

    const totalGuessesRes = await DB.prepare(
      'SELECT count(id) as total_guesses FROM guesses WHERE user_id = ?',
    )
      .bind(userId)
      .first<{ total_guesses: number }>();

    const totalDigimon = await DB.prepare(
      'SELECT count(id) as total_digimon FROM digimon',
    ).first<{ total_digimon: number }>();

    const correctGuesses = correctGuessesRes.correct_guesses ?? 0;
    const totalGuesses = totalGuessesRes.total_guesses ?? 0;
    const totalDigimonCount = totalDigimon.total_digimon ?? 0;

    const correctGuessPercentage =
      Math.round((correctGuesses / totalGuesses) * 100) || 0;

    const digimonRemaining = totalDigimonCount - totalGuesses;

    return {
      correctGuesses,
      totalGuesses,
      correctGuessPercentage,
      digimonRemaining,
    };
  }),
  guess: t.procedure
    .input(
      z.object({
        digimonId: z.number(),
        isCorrect: z.boolean(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { id: userId } = ctx.user;
      const { digimonId, isCorrect } = input;
      const { DB } = ctx;

      await DB.prepare(
        'INSERT INTO guesses (user_id, digimon_id, is_correct, created_at) VALUES (?, ?, ?, ?)',
      )
        .bind(userId, digimonId, isCorrect ? 1 : 0, new Date().toISOString())
        .run();
    }),
});
