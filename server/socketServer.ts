import { applyWSSHandler } from '@trpc/server/adapters/ws';
import { socketAppRouter } from './routers/_socketApp';
import express from 'express';
import cors from 'cors';
import { createExpressMiddleware } from '@trpc/server/adapters/express';
import ws from 'ws';

const app = express();
app.use(cors());

app.use(
  '/trpc',
  createExpressMiddleware({
    router: socketAppRouter,
  })
);

const server = app.listen(3001, () => {
  console.log('Listening on port 3001');
});

applyWSSHandler({
  wss: new ws.Server({ server }),
  router: socketAppRouter,
  createContext: () => ({ isAdmin: true }),
});
