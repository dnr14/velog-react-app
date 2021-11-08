import React, { useEffect, useRef, useState } from 'react';
import Main from '@/Components/views/MainPage/Main/Main';
import Menu from '@/Components/views/MainPage/Menu/Menu';
import useFetch from '@/hooks/useFatch';
import * as Styled from '@/Components/views/MainPage/Main/style';
import * as posts from '@/api/posts';
import * as comments from '@/api/comments';
import Modal from '@/Components/views/InsertPostPage/Modal/Modal';
import Loading from './Loading/Loading';

let timer;
const REQUEST_DELAY = 1000;

function MainPage() {
  const crrentLink = useRef(null);
  const lineRef = useRef(null);
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const [isNoticeOpen, setIsNoticeOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [list, setList] = useState(null);
  const { state, callApi } = useFetch();
  const { loading, success, error } = state;
  const lastPageCheck = useRef(false);
  const observerRef = useRef();

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
        if (timer) return clearTimeout(timer);

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
          callApi(() => posts.get(currentLimit, currentPage + 1)),
          REQUEST_DELAY
        );
      }
    });
    observerRef.current.observe(node);
  };

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

  useEffect(() => callApi(() => posts.get()), [callApi]);

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

  useEffect(() => {
    if (success) {
      (async () => {
        const { results, page, totalPages, limit } = success.data;
        const newPosts = await comments.getComments(results);
        setList(prev => ({
          posts: [...(prev?.posts ?? []), ...newPosts],
          state: { page, totalPages, limit },
        }));
        timer = null;
      })();
    }
  }, [success, setList]);

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
