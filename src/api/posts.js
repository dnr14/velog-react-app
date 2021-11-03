import http from '@/api/http';

export function get() {
  return http.get('/posts');
}
export function insert(data) {
  return http.get(`/posts`, data);
}
