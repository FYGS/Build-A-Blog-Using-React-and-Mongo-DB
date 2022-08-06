import express from "express";
import bodyParser from 'body-parser';
import { MongoClient } from 'mongodb';

import { articlesInfo } from './data';

const PORT = 8000;

const app = express();

app.use(bodyParser.json());

app.get('/api/articles/:name', async (req, resp) => {
  try {
    const { name } = req.params;

  const client = await MongoClient.connect('mongodb://localhost:27017', { useNewUrlParser: true });
  const db = client.db('my-blog');

  const articleInfo = await db.collection('articles').findOne({ name });

  resp.status(200).json(articleInfo);

  client.close();
  } catch (error) {
    resp.status(500).json({ message: 'Error connecting to db' }, error);
  }
});

app.post('/api/articles/:name/upvote', async (req, resp) => {
  try {
    const { name } = req.params;

  const client = await MongoClient.connect('mongodb://localhost:27017', { useNewUrlParser: true });
  const db = client.db('my-blog');

  const articleInfo = await db.collection('articles').findOne({ name });
  await db.collection('articles').updateOne({ name }, {
    '$set': {
      upvotes: articleInfo.upvotes + 1,
    },
  });
  const updatedArticleInfo = await db.collection('articles').findOne({ name });

  resp.status(200).json(updatedArticleInfo);

  client.close();
  } catch (error) {
    resp.status(500).json({ message: 'Error connecting to db' }, error);
    
  }
});

app.post('/api/articles/:name/add-comment', (req, resp) => {
  const { name } = req.params;
  const { username, text } = req.body;

  articlesInfo[name].comments.push({username, text});
  resp.status(200).send(articlesInfo[name]);
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));