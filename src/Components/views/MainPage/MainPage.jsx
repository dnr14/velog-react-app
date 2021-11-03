import React, { useEffect, useRef, useState } from 'react';
import { get } from '@/api/posts';
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
    get().then(({ data }) => {
      const { results } = data;
      setList(results);
    });
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
        <Main list={list} />
      </Styled.Container>
    </>
  );
}

export default MainPage;
