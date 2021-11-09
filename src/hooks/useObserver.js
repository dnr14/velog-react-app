import { useEffect, useRef, useState } from 'react';
import useFetch from './useFatch';
import * as comments from '@/api/comments';
import * as posts from '@/api/posts';

let timer;
const REQUEST_DELAY = 1000;

const useObserver = () => {
  const lastPageCheck = useRef(false);
  const observerRef = useRef();
  const { state, call } = useFetch();
  const [list, setList] = useState(null);
  const { success } = state;

  const observer = node => {
    if (node === null || lastPageCheck.current === true) {
      return;
    }
    if (observerRef.current) observerRef.current.disconnect();

    // 타겟이된 노드에 접근을 했다면 옵저버가 구독된 이벤트를 실행시켜준다.
    observerRef.current = new IntersectionObserver(([entry], observer) => {
      // 타겟이 접근을 했는지 감지한다.
      if (entry.isIntersecting) {
        // 서버에게 자주 호출하는 걸 방지 하기 위해 디바운스
        if (timer) {
          return clearTimeout(timer);
        }

        const { state } = list;
        const currentLimit = state.limit;
        const currentPage = state.page;
        const currentTotalPages = state.totalPages;
        // 게시글의 마지막 페이지에 왔으면 구독 해제 더 이상 서버에 요청 x
        if (currentTotalPages === currentPage) {
          lastPageCheck.current = true;
          return observer.unobserve(entry.target);
        }

        timer = setTimeout(
          call(async () => {
            const postsResponse = await posts.get(
              currentLimit,
              currentPage + 1
            );
            const { results, page, totalPages, limit } = postsResponse.data;
            const newPosts = await comments.getComments(results);
            return {
              posts: [...newPosts],
              state: { page, totalPages, limit },
            };
          }),
          REQUEST_DELAY
        );
      }
    });
    observerRef.current.observe(node);
  };

  useEffect(() => {
    if (success) {
      const { state, posts } = success;
      setList(prev => {
        const oldPosts = prev?.posts ?? [];
        return {
          posts: [...oldPosts, ...posts],
          state,
        };
      });
      timer = null;
    }
  }, [success, setList]);

  return {
    observer,
    call,
    setList,
    state,
    list,
  };
};

export default useObserver;
