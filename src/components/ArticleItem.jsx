import { FaHeart } from "react-icons/fa";
import UserInfo from "./UserInfo";
import { Link } from "react-router-dom";

export default function ArticleItem({ article }) {
  return (
    <div className="article-item">
      <div className="post-heading">
        <UserInfo article={article} />
        <button className="heart">
          <FaHeart /> {article.favoritesCount}
        </button>
      </div>
      <div className="post-content">
        <Link to={`/articles/${article.slug}`} className="post-link">
          <h1 className="post-header">{article.title}</h1>
        </Link>
        <p className="post-body">{article.description}</p>
        <div className="tagbar">
          {article.tagList?.map((tag) => (
            <span className="tag-pills" key={`${tag}-${article.slug}`}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
