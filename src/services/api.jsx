export const BASE_URL = 'https://realworld.habsida.net/api';

export async function getArticles(page = 1, limit = 3) {
  const offset = (page - 1) * limit;
  const token = localStorage.getItem('token');

  const res = await fetch(
    `${BASE_URL}/articles?limit=${limit}&offset=${offset}`,
    {
      headers: token ? { Authorization: `Token ${token}` } : {},
    },
  );

  return res.json();
}

export async function getArticle(slug) {
  const token = localStorage.getItem('token');

  const res = await fetch(`${BASE_URL}/articles/${slug}`, {
    headers: token ? { Authorization: `Token ${token}` } : {},
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error('Failed to fetch article.');
  }

  return data;
}

export async function loginUser({ email, password }) {
  const res = await fetch(`${BASE_URL}/users/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      user: { email, password },
    }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error('Username or password is wrong');
  }
  return data;
}

export async function registerUser({ username, email, password }) {
  const res = await fetch(`${BASE_URL}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      user: { username, email, password },
    }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw data;
  }
  return data;
}

export async function getCurrentUser(token) {
  const res = await fetch(`${BASE_URL}/user`, {
    headers: {
      Authorization: `Token ${token}`,
    },
  });

  const data = await res.json();

  if (!res.ok) {
    throw data;
  }

  return data;
}

export async function updateUser(token, userData) {
  const res = await fetch(`${BASE_URL}/user`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify({
      user: userData,
    }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw data;
  }
  return data;
}

export async function getArticlesByAuthor(username, limit = 3, offset = 0) {
  const token = localStorage.getItem('token');

  const res = await fetch(
    `${BASE_URL}/articles?author=${username}&limit=${limit}&offset=${offset}`,
    {
      headers: token ? { Authorization: `Token ${token}` } : {},
    },
  );

  return res.json();
}

export async function getFeedArticles(limit = 3, offset = 0) {
  const token = localStorage.getItem('token');

  const res = await fetch(
    `${BASE_URL}/articles/feed?limit=${limit}&offset=${offset}`,
    {
      headers: {
        Authorization: `Token ${token}`,
      },
    },
  );

  if (!res.ok) throw new Error('Failed to fetch feed');
  return res.json();
}

export async function createArticle(token, articleData) {
  const res = await fetch(`${BASE_URL}/articles`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify({
      article: articleData,
    }),
  });

  const data = await res.json();

  if (!res.ok) throw data;

  return data;
}

export async function updateArticle(token, slug, body) {
  const res = await fetch(`${BASE_URL}/articles/${slug}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify(body),
  });

  return res.json()
}

export async function deleteArticle(token, slug) {
  const res = await fetch(`${BASE_URL}/articles/${slug}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Token ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error('Failed to delete');
  }
}

export async function favoriteArticle(token, slug) {
  const res = await fetch(`${BASE_URL}/articles/${slug}/favorite`, {
    method: 'POST',
    headers: {
      Authorization: `Token ${token}`,
    },
  });

  const data = await res.json();

  if (!res.ok) throw data;
  return data;
}

export async function unfavoriteArticle(token, slug) {
  const res = await fetch(`${BASE_URL}/articles/${slug}/favorite`, {
    method: 'DELETE',
    headers: {
      Authorization: `Token ${token}`,
    },
  });

  const data = await res.json();

  if (!res.ok) throw data;
  return data;
}

export async function getProfile(username) {
  const token = localStorage.getItem('token');

  const res = await fetch(`${BASE_URL}/profiles/${username}`, {
    headers: token ? { Authorization: `Token ${token}` } : {},
  });

  return res.json();
}

export async function followUser(token, username) {
  const res = await fetch(`${BASE_URL}/profiles/${username}/follow`, {
    method: 'POST',
    headers: {
      Authorization: `Token ${token}`,
    },
  });

  return res.json();
}

export async function unfollowUser(token, username) {
  const res = await fetch(`${BASE_URL}/profiles/${username}/follow`, {
    method: 'DELETE',
    headers: {
      Authorization: `Token ${token}`,
    },
  });

  return res.json();
}

export async function getTags(){
  const res = await fetch(`${BASE_URL}/tags`);

  if(!res.ok){
    throw new Error("Failed to fetch tags")
  }

  return res.json();
}