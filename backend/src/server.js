import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';

import { withDB } from './data';

const PORT = 8000;

const app = express();

app.use(express.static(path.join(__dirname, '/build')));
app.use(bodyParser.json());

app.get('/api/articles/:name', async (req, resp) => {
	await withDB(async db => {
		const { name } = req.params;

		const articleInfo = await db.collection('articles').findOne({ name });

		resp.status(200).json(articleInfo);
	}, resp);
});

app.post('/api/articles/:name/upvote', async (req, resp) => {
	await withDB(async db => {
		const { name } = req.params;

		const articleInfo = await db.collection('articles').findOne({ name });
		await db.collection('articles').updateOne(
			{ name },
			{
				$set: {
					upvotes: articleInfo.upvotes + 1,
				},
			},
		);
		const updatedArticleInfo = await db
			.collection('articles')
			.findOne({ name });

		resp.status(200).json(updatedArticleInfo);
	}, resp);
});

app.post('/api/articles/:name/add-comment', async (req, resp) => {
	await withDB(async db => {
		const { name } = req.params;
		const { username, text } = req.body;

		const articleInfo = await db.collection('articles').findOne({ name });
		await db.collection('articles').updateOne(
			{ name },
			{
				$set: {
					comments: [...articleInfo.comments, { username, text }],
				},
			},
		);
		const updatedArticleInfo = await db
			.collection('articles')
			.findOne({ name });

		resp.status(200).json(updatedArticleInfo);
	}, resp);
});

app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, '/build/index.html'));
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
