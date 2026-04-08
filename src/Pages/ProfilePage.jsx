import { useEffect, useState } from 'react';
import {
  followUser,
  getArticlesByAuthor,
  getFeedArticles,
  getProfile,
  unfollowUser,
} from '../services/api';
import ArticleList from '../components/ArticleList';
import Loading from '../components/Loading';
import Pagination from '../components/Pagination';
import SideTagbar from '../components/SideTagbar';
import { useParams } from 'react-router-dom';
import { FaHeart } from 'react-icons/fa';

export default function ProfilePage() {
  const { username } = useParams();

  const [activeTab, setActiveTab] = useState('feed');

  const [articles, setArticles] = useState([]);
  const [articlesCount, setArticlesCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [myPage, setMyPage] = useState(1);
  const [feedPage, setFeedPage] = useState(1);

  const [profile, setProfile] = useState(null);
  const [following, setFollowing] = useState(false);

  const currentUser = JSON.parse(localStorage.getItem('user'));
  const isOwnProfile = currentUser?.username === profile?.username;

  const limit = 3;
  const totalPages = Math.ceil(articlesCount / limit);

  const currentPage = activeTab === 'feed' ? feedPage : myPage;

  const fetchArticles = async () => {
    if (!username) return;

    try {
      setLoading(true);
      setError('');

      let data;
      const offset = (currentPage - 1) * limit;

      if (isOwnProfile && activeTab === 'feed') {
        const token = localStorage.getItem('token');

        if (!token) {
          setArticles([]);
          return;
        }

        data = await getFeedArticles(limit, offset);
      } else {
        data = await getArticlesByAuthor(username, limit, offset);
      }

      setArticles(data.articles);
      setArticlesCount(data.articlesCount);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchProfile = async () => {
    setError('');
    try {
      const data = await getProfile(username);
      setProfile(data.profile);
      setFollowing(data.profile.following);
    } catch (error) {
      setError(error.message) || 'Failed to load profile';
    }
  };

  const handleFollow = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;
    setError('');
    try {
      let res;

      if (!following) {
        res = await followUser(token, username);
      } else {
        res = await unfollowUser(token, username);
      }

      setFollowing(res.profile.following);
    } catch (error) {
      setError(error.message) || 'Failed to update follow';
    }
  };

  useEffect(() => {
    if (!profile) return;
    fetchArticles();
  }, [profile, activeTab, feedPage, myPage]);

  useEffect(() => {
    fetchProfile();
  }, [username]);

  useEffect(() => {
    setActiveTab('feed');
    setFeedPage(1);
    setMyPage(1);
  }, [username]);

  if (!profile) return <Loading />;

  return (
    <div className="profile-page">
      {/* Banner */}
      <div className="profile-banner">
        <img
          className="profile-avatar"
          src={profile?.image || 'http://via.placeholder.com/100'}
          alt="avatar"
        />

        <h2 className="profile-username">{profile?.username}</h2>

        {!isOwnProfile && (
          <button className="follow-btn" onClick={handleFollow}>
            <FaHeart className="heart-icon" />
            {following ? 'Unfollow' : 'Follow'}
          </button>
        )}
      </div>

      <div className="profile-content">
        <SideTagbar />
        {/* Tabs */}
        <div className="profile-tabs">
          {!isOwnProfile && <button>{`${profile.username}'s Articles`}</button>}

          {isOwnProfile && (
            <>
              <button
                className={activeTab === 'feed' ? 'active' : ''}
                onClick={() => {
                  setActiveTab('feed');
                  setFeedPage(1);
                }}
              >
                My Feed
              </button>

              <button
                className={activeTab === 'my' ? 'active' : ''}
                onClick={() => {
                  setActiveTab('my');
                  setMyPage(1);
                }}
              >
                My Articles
              </button>
            </>
          )}
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
                currentPage={currentPage}
                onPageChange={activeTab === 'feed' ? setFeedPage : setMyPage}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
