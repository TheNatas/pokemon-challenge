import express, { json, Request, Response, Router } from 'express';
import { routes } from './routes';
import path from 'path';
import fs from 'fs';

const app = express();
const port = 8080;

app.use(express.static(path.join(__dirname, '..', 'public')));

app.get('/pokemon/:id', (req, res) => {
  const id = req.params.id;
  const filePath = path.join(__dirname, '..', 'public', 'pokemon.html');

  // Check if file exists before sending
  if (fs.existsSync(filePath)) {
    res.sendFile(filePath);
  } else {
    res.status(404).send('Page not found');
  }
});

// Body Parser
app.use(json({ limit: '1mb' }));

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