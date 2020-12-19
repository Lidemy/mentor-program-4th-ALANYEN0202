import { getAuthToken } from "./utilis";

const BASE_URL = "https://student-json-api.lidemy.me";

export const getPosts = () => {
  return fetch(`${BASE_URL}/posts`).then((res) => res.json());
};

export const getLimitPosts = (limit, pages) => {
  return fetch(
    `${BASE_URL}/posts?_sort=createdAt&_order=desc&_limit=${limit}&_page=${pages}`
  ).then((res) => res)
};

export const getSinglePage = (id) => {
  return fetch(`${BASE_URL}/posts/${id}`).then((res) => res.json());
};

export const login = (username, password) => {
  return fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      username,
      password,
    }),
  }).then((res) => res.json());
};

export const getMe = () => {
  const token = getAuthToken();
  return fetch(`${BASE_URL}/me`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json());
};

export const register = (nickname, username, password) => {
  return fetch(`${BASE_URL}/register`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      nickname,
      username,
      password,
    }),
  }).then((res) => res.json());
};

export const postArticle = (title, body) => {
  const token = getAuthToken();
  return fetch(`${BASE_URL}/posts`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      title,
      body,
    }),
  }).then((res) => res.json());
};

export const updateArticle = (title, body, id) => {
    return fetch(`${BASE_URL}/posts/${id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        title,
        body,
      }),
    }).then((res) => res.json());
  }

export const deleteArticle = (id) => {
  return fetch(`${BASE_URL}/posts/${id}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
    }).then((res) => res.json());
}
