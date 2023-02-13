import { z } from 'zod';
import { procedure, router } from '../trpc';
import todo from './todo';
export const appRouter = router({
  hello: procedure
    .input(
      z.object({
        text: z.string(),
      })
    )
    .query(({ input }) => {
      return {
        greeting: `hello ${input.text}`,
      };
    }),
  ...todo,
});
// export type definition of API
export type AppRouter = typeof appRouter;
