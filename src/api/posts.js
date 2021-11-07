import http from '@/api/http';

export function get() {
  return http.get(`/posts?sortBy=createdAt:desc`);
}

export function insert(data) {
  return http.post(`/posts`, data);
}

export function update(id, data) {
  return http.patch(`/posts/${id}`, data);
}

export function postsById(id) {
  return http.get(`/posts/${id}`);
}
