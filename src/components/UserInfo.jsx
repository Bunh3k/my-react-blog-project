import { FaUser } from "react-icons/fa6";

export default function UserInfo({ article }) {
  return (
    <div className="user-info">
      <FaUser style={{ color: "#61BB61" }} />
      <div className="user-description">
        <span className="user-name">{article.author.username}</span>
        <span className="user-date">
          {new Date(article.createdAt).toLocaleDateString()}
        </span>
      </div>
    </div>
  );
}
