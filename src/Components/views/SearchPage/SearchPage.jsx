import React, { useEffect, useRef, useState } from 'react';
import useFetch from '@/hooks/useFatch';
import Search from './Search/Search';
import { postsByKeyWord } from '@/api/posts';
import { getComments } from '@/api/comments';
import Modal from '../InsertPostPage/Modal/Modal';
import Loading from '../MainPage/Loading/Loading';

const REQUEST_DELAY = 1000;
let timer;

const SearchPage = () => {
  const lastPageCheck = useRef(false);
  const observerRef = useRef();
  const [list, setList] = useState(null);
  const [keyWord, setKeyWord] = useState('title');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const [selectBoxContent, setselectBoxContent] = useState('제목');
  const [modalMessage, setModalMessage] = useState('');
  const { state, call } = useFetch();
  const { loading, error, success } = state;

  const observer = node => {
    if (node === null || lastPageCheck.current === true) {
      return;
    }
    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver(([entry], observer) => {
      if (entry.isIntersecting) {
        if (timer) {
          clearTimeout(timer);
          return;
        }
        const { state, keyWord, value } = list;
        const currentLimit = state.limit;
        const currentPage = state.page;
        const currentTotalPages = state.totalPages;
        if (currentTotalPages === currentPage) {
          lastPageCheck.current = true;
          return observer.unobserve(entry.target);
        }

        timer = setTimeout(
          call(async () => {
            const postsResponse = await postsByKeyWord(
              keyWord,
              value,
              currentLimit,
              currentPage + 1
            );
            const { results, page, totalPages, limit, totalResults } =
              postsResponse.data;
            const newPosts = await getComments(results);
            return {
              keyWord,
              value,
              posts: [...newPosts],
              state: { page, totalPages, limit, totalResults },
            };
          }),
          REQUEST_DELAY
        );
      }
    });
    observerRef.current.observe(node);
  };

  // 검색
  const handleSearchChange = () => {
    let timer;
    return ({ target }) => {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        call(async () => {
          setList(null);
          const { value } = target;
          const response = await postsByKeyWord(keyWord, value);
          const { results, limit, page, totalPages, totalResults } =
            response.data;
          const newPosts = await getComments(results);
          return {
            keyWord,
            value,
            posts: [...newPosts],
            state: { limit, page, totalPages, totalResults },
          };
        });
      }, 1000);
    };
  };

  const handleKeyWordChange = ({ target }) => {
    let content = '';
    const { id } = target;
    if (id === 'title') {
      content = '제목';
    } else if (id === 'body') {
      content = '내용';
    } else {
      content = '태그';
    }
    setselectBoxContent(content);
    setKeyWord(id);
  };
  const handleMenubarClick = () => setIsSelectOpen(true);
  useEffect(() => {
    if (success) {
      const { state, posts, keyWord, value } = success;
      setList(prev => {
        const oldPosts = prev?.posts ?? [];
        return {
          keyWord,
          value,
          posts: [...oldPosts, ...posts],
          state,
        };
      });
      timer = null;
    }
  }, [success]);

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
          closeDelay={2000}
        >
          {modalMessage}
        </Modal>
      )}
      <Search
        list={list}
        isSelectOpen={isSelectOpen}
        keyWord={keyWord}
        selectBoxContent={selectBoxContent}
        handleMenubarClick={handleMenubarClick}
        setIsSelectOpen={setIsSelectOpen}
        handleSearchChange={handleSearchChange}
        handleKeyWordChange={handleKeyWordChange}
      >
        <div ref={observer} />
      </Search>
    </>
  );
};

export default SearchPage;
