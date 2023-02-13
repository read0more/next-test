import { z } from 'zod';
import { procedure } from '../trpc';

const todoList: string[] = ['todo1', 'todo2'];
const todo = {
  addTodo: procedure
    .input(z.object({ content: z.string() }))
    .mutation(({ input }) => {
      todoList.push(input.content);
      return 'success';
    }),
  getTodo: procedure.query(() => {
    return todoList;
  }),
};

export default todo;
