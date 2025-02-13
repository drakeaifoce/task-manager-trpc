import express from 'express';
import { createExpressMiddleware } from '@trpc/server/adapters/express';
import { appRouter } from './trpc';
import cors from 'cors';

const app = express();
const PORT = 4000;


app.use(cors());
app.use(express.json());

app.use('/trpc', createExpressMiddleware({ router: appRouter }));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

export type AppRouter = typeof appRouter;