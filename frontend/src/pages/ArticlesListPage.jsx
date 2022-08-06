import { ArticlesList } from '../components/ArticlesList';
import { articles } from '../data';

export const ArticlesListPage = () => (
	<>
		<h1>Articles</h1>
		<ArticlesList articles={articles} />
	</>
);
