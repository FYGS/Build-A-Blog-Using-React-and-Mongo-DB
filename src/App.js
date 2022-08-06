import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { AboutPage, ArticlePage, ArticlesListPage, HomePage } from './pages';
import { NavBar } from './components';

import './App.css';

function App() {
	return (
		<Router>
			<div className="App">
        <NavBar />
				<div id="page-body">
					<Routes>
						<Route path="/" element={<HomePage />} exact />
						<Route path="about" element={<AboutPage />} />
						<Route path="articles-list" element={<ArticlesListPage />} />
						<Route path="article" element={<ArticlePage />} />
					</Routes>
				</div>
			</div>
		</Router>
	);
}

export default App;
