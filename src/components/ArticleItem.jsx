import { FaHeart } from 'react-icons/fa';
import UserInfo from './UserInfo';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { favoriteArticle, unfavoriteArticle } from '../services/api';

export default function ArticleItem({ article }) {
  const [favorited, setFavorited] = useState(article.favorited);
  const [count, setCount] = useState(article.favoritesCount);
  const [error, setError] = useState('');

  const handleFavorite = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;
    setError('');
    try {
      let res;

      if (favorited === false) {
        res = await favoriteArticle(token, article.slug);
      } else {
        res = await unfavoriteArticle(token, article.slug);
      }

      setFavorited(res.article.favorited);
      setCount(res.article.favoritesCount);
    } catch (error) {
      setError(error.message) || 'Failed to update favorite';
    }
  };

  return (
    <div className="article-item">
      {error && <p className="error">{error}</p>}
      <div className="post-heading">
        <UserInfo article={article} />
        <button
          className={`heart ${favorited ? 'favorited' : ''}`}
          onClick={handleFavorite}
        >
          <FaHeart /> {count}
        </button>
      </div>
      <div className="post-content">
        <Link to={`/articles/${article.slug}`} className="post-link">
          <h1 className="post-header">{article.title}</h1>
        </Link>
        <p className="post-body">{article.description}</p>

        {article.tagList?.filter((tag) => tag && tag.trim() !== '').length >
          0 && (
          <div className="tagbar">
            {article.tagList
              .filter((tag) => tag && tag.trim() !== '')
              .map((tag) => (
                <span className="tag-pills" key={`${tag}-${article.slug}`}>
                  {tag}
                </span>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}
