import { EventEmitter } from 'events';
import { observable } from '@trpc/server/observable';
import { z } from 'zod';
import { procedure, router } from '../trpc';

const eventEmitter = new EventEmitter();

export const socketAppRouter = router({
  update: procedure
    .input(
      z.object({
        text: z.string(),
      })
    )
    .mutation(({ input }) => {
      eventEmitter.emit('update', `someone said: ${input.text}`);
      return 'success';
    }),
  onUpdate: procedure.subscription(() => {
    return observable<string>((emit) => {
      eventEmitter.on('update', emit.next);

      return () => {
        eventEmitter.off('update', emit.next);
      };
    });
  }),
});
// export type definition of API
export type SocketAppRouter = typeof socketAppRouter;
