import express from 'express';
import * as path from 'path';
import * as functions from 'firebase-functions';

const app = express();

app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to backend! deployed from GitHub Actions' });
});

export const api = functions.https.onRequest(app);