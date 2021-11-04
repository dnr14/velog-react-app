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
        const promises = [posts.get(), comments.get()];
        const [postsResponse, commentsResponse] = await Promise.all(promises);
        setList({
          posts: postsResponse.data.results,
          comments: commentsResponse.data.results,
        });
      } catch (error) {
        // 모달 창 작업 해야된다.
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
