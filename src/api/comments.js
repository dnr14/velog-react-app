import http from '@/api/http';

export const get = params =>
  http.get('/comments', {
    params,
  });

export async function getComments(posts) {
  const promises = posts.map(({ id }) => get({ postId: id }));
  const promiseArray = await Promise.all(promises);
  const newPosts = posts.map((post, idx) => ({
    ...post,
    commentsTotalResults: promiseArray[idx].data.totalResults,
  }));
  return newPosts;
}
