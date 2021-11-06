import http from '@/api/http';

export function get(params) {
  return http.get('/comments', {
    params,
  });
}
