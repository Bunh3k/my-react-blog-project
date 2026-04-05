import { FaUser } from 'react-icons/fa6';
import { Link } from 'react-router-dom';

export default function UserInfo({ article }) {
  const avatar = article.author.image;

  return (
    <div className="user-info">
      {avatar ? (
        <img className="user-avatar" src={avatar} alt="avatar" />
      ) : (
        <FaUser className="user-icon" />
      )}
      <div className="user-description">
        <Link to={`/profile/${article.author.username}`} className="user-name">
          {article.author.username}
        </Link>
        <span className="user-date">
          {new Date(article.createdAt).toLocaleDateString()}
        </span>
      </div>
    </div>
  );
}
