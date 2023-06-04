import { t } from '../../trpc/trpc.util';

export const progressRouter = t.router({
  get: t.procedure.query(async ({ ctx }) => {
    const { id: userId } = ctx.user;
    const { DB } = ctx;

    const correctGuessesRes = await DB.prepare(
      'SELECT count(id) as correct_guesses FROM guesses WHERE user_id = ? AND is_correct = 1',
    )
      .bind(userId)
      .all<{ correct_guesses: number }>();

    const totalGuessesRes = await DB.prepare(
      'SELECT count(id) as total_guesses FROM guesses WHERE user_id = ?',
    )
      .bind(userId)
      .all<{ total_guesses: number }>();

    const totalDigimon = await DB.prepare(
      'SELECT count(id) as total_digimon FROM digimon',
    ).all<{ total_digimon: number }>();

    const correctGuesses = correctGuessesRes.results?.[0]?.correct_guesses ?? 0;
    const totalGuesses = totalGuessesRes.results?.[0]?.total_guesses ?? 0;
    const totalDigimonCount = totalDigimon.results?.[0]?.total_digimon ?? 0;

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
});
