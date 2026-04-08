import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { getArticle, updateArticle } from '../services/api';

export default function EditArticlePage() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const [error, setError] = useState('');

  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState([]);

  const { slug } = useParams();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setError('');
    try {
      const token = localStorage.getItem('token');

      const res = await updateArticle(token, slug, {
        article: { ...data, tagList: tags },
      });

      navigate(`/articles/${res.article.slug}`);
    } catch (error) {
      setError(error.message) || 'Failed to update article';
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();

      const value = tagInput.trim();

      if (!value) return;
      if (tags.includes(value)) return;

      setTags([...tags, value]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (indexToRemove) => {
    setTags((prevTags) =>
      prevTags.filter((_, index) => index !== indexToRemove),
    );
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) navigate('sign-in');
  }, [navigate]);

  useEffect(() => {
    async function loadArticle() {
      setError('');
      try {
        const data = await getArticle(slug);
        const article = data.article;

        setValue('title', article.title);
        setValue('description', article.description);
        setValue('body', article.body);

        setTags(article.tagList || []);
      } catch (error) {
        setError(error.message) || 'Failed to load article';
      }
    }

    loadArticle();
  }, [slug, setValue]);

  return (
    <div className="edit-article-page">
      <h1>Edit Article</h1>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          placeholder="Title"
          {...register('title', {
            required: 'Title is required',
          })}
        />
        {errors.title && <p className="error">{errors.title.message}</p>}

        <input
          placeholder="Description"
          {...register('description', {
            required: 'Description is required',
          })}
        />
        {errors.description && (
          <p className="error">{errors.description.message}</p>
        )}

        <textarea
          placeholder="Input your text"
          {...register('body', {
            required: 'Body is required',
          })}
        />
        {errors.body && <p className="error">{errors.body.message}</p>}

        <input
          placeholder="Enter tags and press Enter"
          value={tagInput}
          onChange={(e) => setTagInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />

        <div className="tag-list">
          {tags.map((tag, index) => (
            <span className="tag-pill" key={`${tag}-${index}`}>
              {tag}
              <button type="button" onClick={() => handleRemoveTag(index)}>
                ❌
              </button>
            </span>
          ))}
        </div>

        <button type="submit">Update Article</button>
      </form>
    </div>
  );
}
