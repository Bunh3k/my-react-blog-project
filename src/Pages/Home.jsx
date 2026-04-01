import Banner from "../components/Banner";
import SideTagbar from "../components/SideTagbar";
import ArticleList from "../components/ArticleList";
import Pagination from "../components/Pagination";
import { useEffect, useState } from "react";
import { getArticles } from "../services/api";
import Loading from "../components/Loading";

export default function Home() {
  const [articles, setArticles] = useState([]);
  const [articlesCount, setArticlesCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);

  const limit = 3;
  const totalPages = Math.ceil(articlesCount / limit);

  async function fetchArticles() {
    try {
      setLoading(true);
      setError("");
      const data = await getArticles(page, limit);
      setArticles(data.articles);
      setArticlesCount(data.articlesCount);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchArticles();
  }, [page]);

  return (
    <div className="home">
      <Banner />
      <div className="home-container">
        <SideTagbar />

        {loading && <Loading />}
        {error && <p className="status-text">{error}</p>}

        {!loading && !error && <ArticleList articles={articles} />}
        {!loading && !error && (
          <Pagination
            totalPages={totalPages}
            currentPage={page}
            onPageChange={setPage}
          />
        )}
      </div>
    </div>
  );
}
