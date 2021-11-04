import http from '@/api/http';

export function get() {
  return http.get(`/posts?sortBy=createdAt:desc`);
}
export function insert(data) {
  return http.post(`/posts`, data);
}
