import { useParams } from "react-router-dom";
import { articles } from "../data";

export const ArticlePage = () => {
	const { name } = useParams();
	
	const article = articles.find(article => article.name === name);

	if (article === undefined) {
		return <h1>Article {name} does not exist !</h1>
	}
	
	return (
		<>
		<h1>{article.name}</h1>
		{article.content.map((paragraph, key) => (
			<p key={key}>{paragraph}</p>
		))}
	</>
	);
};
