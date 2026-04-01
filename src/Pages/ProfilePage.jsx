import { useEffect, useState } from "react";
import { getArticlesByAuthor, getFeedArticles } from "../services/api";
import ArticleList from "../components/ArticleList";
import Loading from "../components/Loading";
import Pagination from "../components/Pagination";
import SideTagbar from "../components/SideTagbar";

export default function ProfilePage() {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [activeTab, setActiveTab] = useState("feed");

  const [articles, setArticles] = useState([]);
  const [articlesCount, setArticlesCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [page, setPage] = useState(1);

  const limit = 3;
  const totalPages = Math.ceil(articlesCount / limit);

  const fetchArticles = async () => {
    if (!user) return;

    try {
      setLoading(true);
      setError("");

      let data;
      const offset = (page - 1) * limit;

      if (activeTab === "feed") {
        data = await getFeedArticles(limit, offset);
      } else {
        data = await getArticlesByAuthor(user.username, limit, offset);
      }

      setArticles(data.articles);
      setArticlesCount(data.articlesCount);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchArticles();
  }, [user, activeTab, page]);

  if (!user) return <Loading />;

  return (
    <div className="profile-page">
      {/* Banner */}
      <div className="profile-banner">
        <img
          className="profile-avatar"
          src={user.image || "http://via.placeholder.com/100"}
          alt="avatar"
        />

        <h2 className="profile-username">{user.username}</h2>
      </div>

      <div className="profile-content">
        <SideTagbar />
        {/* Tabs */}
        <div className="profile-tabs">
          <button
            className={activeTab === "feed" ? "active" : ""}
            onClick={() => {
              setActiveTab("feed");
              setPage(1);
            }}
          >
            My Feed
          </button>

          <button
            className={activeTab === "my" ? "active" : ""}
            onClick={() => {
              setActiveTab("my");
              setPage(1);
            }}
          >
            My Articles
          </button>
        </div>

        {/* Articles */}
        <div className="profile-articles">
          {loading && <Loading />}
          {error && <p className="status-text">{error}</p>}

          {!loading && !error && articles.length === 0 && (
            <p>No articles here yet...</p>
          )}

          {!loading && !error && articles.length > 0 && (
            <>
              <ArticleList articles={articles} />
              <Pagination
                totalPages={totalPages}
                currentPage={page}
                onPageChange={setPage}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
