import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { deleteArticle, getArticle } from "../services/api";
import { ArticleBanner } from "../components/Banner";
import UserInfo from "../components/UserInfo";
import ReactMarkdown from "react-markdown";
import Loading from "../components/Loading";

export default function ArticlePage() {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const currentUser = JSON.parse(localStorage.getItem("user"));
  const isAuthor = currentUser?.username === article?.author?.username;

  async function fetchArticle() {
    try {
      setLoading(true);
      setError("");
      const data = await getArticle(slug);
      setArticle(data.article);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchArticle();
  }, [slug]);

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure?");

    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");

      await deleteArticle(token, article.slug);

      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="article-page">
      {loading && <Loading />}
      {error && <p className="status-text">{error}</p>}

      {!loading && article && (
        <>
          <ArticleBanner article={article} />
          <div className="article-banner-body">
            <div className="article-body">
              <ReactMarkdown>{article.body}</ReactMarkdown>
            </div>
            <div className="tagbar">
              {article.tagList?.map((tag) => (
                <span className="tag-pills" key={tag}>
                  {tag}
                </span>
              ))}
            </div>
            <div className="banner-footer">
              <UserInfo article={article} />
              <button className="favorite-article">Favorite article</button>
            </div>

            {isAuthor && (
              <div className="article-actions">
                <button
                  onClick={() => navigate(`/articles/${article.slug}/edit`)}
                >
                  Edit
                </button>

                <button onClick={handleDelete}>Delete</button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
