import React, { useEffect, useRef, useState } from 'react';
import Main from '@/Components/views/MainPage/Main/Main';
import Menu from '@/Components/views/MainPage/Menu/Menu';
import * as Styled from '@/Components/views/MainPage/Main/style';
import * as posts from '@/api/posts';
import Modal from '@/Components/views/InsertPostPage/Modal/Modal';
import Loading from './Loading/Loading';
import useObserver from '@/hooks/useObserver';

function MainPage() {
  const crrentLink = useRef(null);
  const lineRef = useRef(null);
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const [isNoticeOpen, setIsNoticeOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const { observer, call, state, list } = useObserver();
  const { loading, error } = state;

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

  useEffect(() => call(() => posts.get()), [call]);

  useEffect(() => {
    if (error) {
      setIsModalOpen(true);
      setModalMessage(
        <div className="red">
          <span>서버에서 오류 발생 잠시 후 다시 해주세요.</span>
        </div>
      );
    }
  }, [error]);

  return (
    <>
      <Loading loading={loading} />
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          setIsOpen={setIsModalOpen}
          closeDelay={1500}
        >
          {modalMessage}
        </Modal>
      )}
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
        {list && <Main list={list} observer={observer} />}
      </Styled.Container>
    </>
  );
}

export default MainPage;
