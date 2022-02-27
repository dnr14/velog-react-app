import http from '@/api/http';

export const get = (limit = 20, page = 1) =>
  http.get(`/posts?sortBy=createdAt:desc&limit=${limit}&page=${page}`);
export const insert = data => http.post(`/posts`, data);
export const update = (id, data) => http.patch(`/posts/${id}`, data);
export const postsById = id => http.get(`/posts/${id}`);
export const postsByKeyWord = (keyWord, data, limit = 10, page = 1) =>
  http.get(`/posts/?${keyWord}=${data}&limit=${limit}&page=${page}`);
export const postsInfo = id => http.get(`/posts/${id}`);
export const getCommetns = id =>
  http.get('/comments', { params: { postId: id, limit: 100 } });
