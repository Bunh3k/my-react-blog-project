import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { createArticle } from '../services/api';
import { useEffect, useState } from 'react';

export default function NewArticlePlage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [error, setError] = useState('');

  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      navigate('sign-in');
    }
  }, []);

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

  const onSubmit = async (data) => {
    setError('');
    try {
      const token = localStorage.getItem('token');

      const res = await createArticle(token, { ...data, tagList: tags });
      navigate(`/articles/${res.article.slug}`);
    } catch (error) {
      setError(error.message) || 'Failed to create article';
    }
  };

  return (
    <div className="new-article-page">
      <h1>Create New Article</h1>
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
          {tags.map((tag) => (
            <span className="tag-pill" key={tag}>
              {tag}
              <button type="button" onClick={() => handleRemoveTag(tag)}>
                ❌
              </button>
            </span>
          ))}
        </div>

        <button type="submit">Publish Article</button>
      </form>
    </div>
  );
}
