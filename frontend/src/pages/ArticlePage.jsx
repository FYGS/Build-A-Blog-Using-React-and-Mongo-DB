import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CommentsList, UpvotesSection } from '../components';
import { AddCommentForm } from '../components/AddCommentForm';
import { ArticlesList } from '../components/ArticlesList';
import { fetchData, configs, articles } from '../data';
import { NotFoundPage } from './NotFoundPage';

export const ArticlePage = () => {
	const { name } = useParams();
	const article = articles.find(article => article.name === name);

	const [articleInfo, setArticleInfo] = useState({
		upvotes: 0,
		comments: [],
	});

	useEffect(() => {
		(async () => {
			const article = await fetchData(
				`${configs.API_BASE_URL}/articles/${name}`,
			);
			setArticleInfo(article);
		})();
	}, [name]);

	if (article === undefined) {
		return <NotFoundPage />;
	}

	const otherArticles = articles.filter(article => article.name !== name);

	return (
		<>
			<h1>{article.title}</h1>
			<UpvotesSection
				articleName={name}
				upvotes={articleInfo.upvotes}
				setArticleInfo={setArticleInfo}
			/>
			<p>This post has been upvoted {articleInfo.upvotes} time(s)</p>
			{article.content.map((p, key) => (
				<p key={key}>{p}</p>
			))}
			{console.log(articleInfo.comments)}
			<CommentsList comments={articleInfo.comments} />
			<AddCommentForm articleName={name} setArticleInfo={setArticleInfo} />
			<h3>Other Articles:</h3>
			<ArticlesList articles={otherArticles} />
		</>
	);
};
