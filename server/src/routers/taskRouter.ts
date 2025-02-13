import { z } from 'zod';
import { initTRPC } from '@trpc/server';

const t = initTRPC.create();

interface Task {
  id: string;
  title: string;
  completed: boolean;
}

// fake database
let tasks: Task[] = []; 

export const taskRouter = t.router({
  getAll: t.procedure.query(() => tasks),

  addTask: t.procedure
    .input(z.object({ title: z.string() }))
    .mutation(({ input }) => {
      const newTask = { id: Date.now().toString(), title: input.title, completed: false };
      tasks.push(newTask);
      return newTask;
    }),

  toggleTask: t.procedure
    .input(z.object({ id: z.string() }))
    .mutation(({ input }) => {
      tasks = tasks.map(task =>
        task.id === input.id ? { ...task, completed: !task.completed } : task
      );
      return tasks.find(task => task.id === input.id);
    }),

  deleteTask: t.procedure
    .input(z.object({ id: z.string() }))
    .mutation(({ input }) => {
      tasks = tasks.filter(task => task.id !== input.id);
      return { success: true };
    }),
});
