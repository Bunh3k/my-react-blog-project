import { FaUser } from "react-icons/fa6";

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
        <span className="user-name">{article.author.username}</span>
        <span className="user-date">
          {new Date(article.createdAt).toLocaleDateString()}
        </span>
      </div>
    </div>
  );
}
