import { initTRPC } from '@trpc/server';
import { taskRouter } from './routers/taskRouter';

const t = initTRPC.create();

export const appRouter = t.router({
  task: taskRouter,
});