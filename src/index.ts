import express, { json, Request, Response, Router } from 'express';
import { routes } from './routes';

const app = express();
const port = 8080;

// Body Parser
app.use(json({ limit: '1mb' }));

app.get('/', (req: Request, res: Response) => {
  res.send('Hello from TypeScript!');
});

const router = Router();

routes(router);

app.use(router)

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });
}

export {
  app
}