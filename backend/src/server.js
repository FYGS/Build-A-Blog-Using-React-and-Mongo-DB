import express from "express";
import bodyParser from 'body-parser';

import { articlesInfo } from './data';

const PORT = 8000;

const app = express();

app.use(bodyParser.json());

app.post('/api/articles/:name/upvote', (req, resp) => {
  const { name } = req.params;

  articlesInfo[name].upvotes += 1;
  resp.status(200).send(`${name} now is ${articlesInfo[name].upvotes} upvotes`);
});

app.post('/api/articles/:name/add-comment', (req, resp) => {
  const { name } = req.params;
  const { username, text } = req.body;

  articlesInfo[name].comments.push({username, text});
  resp.status(200).send(articlesInfo[name]);
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));