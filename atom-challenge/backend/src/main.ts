import express from 'express';
import * as path from 'path';
import * as functions from 'firebase-functions';

const app = express();

app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to backend! deployed from github actions' });
});

if (process.env.NODE_ENV !== 'production') {
  const port = process.env.PORT || 3333;
  const server = app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}/api`);
  });
  server.on('error', console.error);
}

export const api = functions.https.onRequest(app);