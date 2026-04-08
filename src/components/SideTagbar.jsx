import { useEffect, useState } from 'react';
import { getTags } from '../services/api';

export default function SideTagbar() {
  const [tags, setTags] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchTags() {
      setError('');
      try {
        const data = await getTags();

        setTags(data.tags.slice(0, 5));
      } catch (error) {
        setError(error.message);
      }
    }

    fetchTags();
  }, []);

  return (
    <div className="side-tagbar">
      <p>Popular tags</p>

      {error && <p className="error">{error}</p>}

      <div className="tagbar">
        {tags.map((tag) => (
          <span className="tag-pills" key={tag}>
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
