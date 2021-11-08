import http from '@/api/http';

export const get = (limit = 10, page = 1) =>
  http.get(`/posts?sortBy=createdAt:desc&limit=${limit}&page=${page}`);

export const insert = data => http.post(`/posts`, data);

export const update = (id, data) => http.patch(`/posts/${id}`, data);

export const postsById = id => http.get(`/posts/${id}`);
