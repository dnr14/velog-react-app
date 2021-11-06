import React, { useEffect, useRef, useState } from 'react';
import * as posts from '@/api/posts';
import * as comments from '@/api/comments';
import Main from './Main/Main';
import Menu from './Menu/Menu';
import * as Styled from './Main/style';

function MainPage() {
  const crrentLink = useRef(null);
  const lineRef = useRef(null);
  const [list, setList] = useState(null);
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const [isNoticeOpen, setIsNoticeOpen] = useState(false);

  const handleManubarClick = ({ currentTarget }) => {
    const { id } = currentTarget;
    if (id === 'notice') setIsNoticeOpen(true);
    if (id === 'select') setIsSelectOpen(true);
  };

  const handleClick = e => {
    e.preventDefault();
    const { currentTarget } = e;
    if (crrentLink.current !== currentTarget) {
      crrentLink.current.classList.toggle('active');
      currentTarget.classList.toggle('active');
      crrentLink.current = currentTarget;
      lineRef.current.classList.toggle('active');
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const postsResponse = await posts.get();
        const { results } = postsResponse.data;
        const commentsPromises = results.map(result =>
          comments.get({ postId: result.id })
        );
        const commentsResponse = await Promise.all(commentsPromises);
        const newPosts = results.map((result, idx) => ({
          ...result,
          totalResults: commentsResponse[idx].data.totalResults,
        }));
        setList({ posts: newPosts });
      } catch (error) {
        // 모달 창 작업 해야된다.
        console.log(error);
        alert('서버에러');
      }
    })();
  }, []);

  return (
    <>
      <Styled.Container>
        <Menu
          handleManubarClick={handleManubarClick}
          handleClick={handleClick}
          setIsSelectOpen={setIsSelectOpen}
          setIsNoticeOpen={setIsNoticeOpen}
          isNoticeOpen={isNoticeOpen}
          isSelectOpen={isSelectOpen}
          ref={[crrentLink, lineRef]}
        />
        {list && <Main list={list} />}
      </Styled.Container>
    </>
  );
}

export default MainPage;
