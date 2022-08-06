import { useParams } from "react-router-dom";
import { ArticlesList } from "../components/ArticlesList";
import { articles } from "../data";
import { NotFoundPage } from "./NotFoundPage";

export const ArticlePage = () => {
	const { name } = useParams();
	
	const article = articles.find(article => article.name === name);

	if (article === undefined) {
		return <NotFoundPage />
	}

	const otherArticles = articles.filter(article => article.name !== name);
	
	return (
		<>
		<h1>{article.name}</h1>
		{article.content.map((paragraph, key) => (
			<p key={key}>{paragraph}</p>
		))}
		<h1>Other Articles</h1>
		<ArticlesList articles={otherArticles} />
	</>
	);
};
