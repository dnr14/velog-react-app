import http from '@/api/http';

export function get() {
  return http.get('/comments');
}
