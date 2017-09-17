import * as axios from 'axios';
import * as uuid from 'uuid';

const api = axios.create({
  baseURL: 'http://localhost:3001',
  timeout: 1000,
  headers: {
    authorization: 'whatever',
  },
});

export function fetchPosts() {
  return api.get(`/posts`).then(response => {
    console.log(response);
    return response.data;
  });
}

export function fetchCategories() {
  return api.get(`/categories`).then(response => {
    console.log(response);
    return response.data.categories;
  });
}

export function addPost(post) {
  const { title, body, author, category } = post;
  return api
    .post(`/posts`, {
      id: uuid.v4(),
      timestamp: new Date().getTime(),
      title,
      body,
      author,
      category,
    })
    .then(response => {
      console.log(response);
    });
}

export function deletePost(id) {
  return api.delete(`/posts/${id}`);
}
