import { configs, postData } from "../data";

export const UpvotesSection = ({ articleName, upvotes, setArticleInfo }) => {
  const upvoteArticle = async () => {
      const body = await postData(`${configs.API_BASE_URL}/articles/${articleName}/upvote`);
      setArticleInfo(body);
  }
  return (
      <div id="upvotes-section">
          <button onClick={() => upvoteArticle()}>Add Upvote</button>
          <p>This post has been upvoted {upvotes} times</p>
      </div>
  );
}
