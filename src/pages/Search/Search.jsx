import React from 'react';
import withLoading from '@/hoc/withLoading';
import * as Styled from './style';
import Item from './Item';
import { SelectBox, UlWrapper } from '@/pages/Main/styles';
import MenuBar from '@/Components/common/MenuBar';

const Search = ({
  list,
  selectBoxContent,
  isSelectOpen,
  keyWord,
  setIsSelectOpen,
  handleSearchChange,
  handleKeyWordChange,
  handleMenubarClick,
  children,
}) => {
  const { posts, state } = list || {};

  const lis = [
    {
      id: 'title',
      content: '제목',
      className: keyWord === 'title' ? 'checked' : '',
    },
    {
      id: 'body',
      content: '내용',
      className: keyWord === 'body' ? 'checked' : '',
    },
    {
      id: 'tags',
      content: '태그',
      className: keyWord === 'tags' ? 'checked' : '',
    },
  ];

  return (
    <Styled.Container>
      <Styled.InputBox>
        <Styled.StyledSvg width="17" height="17" viewBox="0 0 17 17">
          <path
            fillRule="evenodd"
            d="M13.66 7.36a6.3 6.3 0 1 1-12.598 0 6.3 6.3 0 0 1 12.598 0zm-1.73 5.772a7.36 7.36 0 1 1 1.201-1.201l3.636 3.635c.31.31.31.815 0 1.126l-.075.075a.796.796 0 0 1-1.126 0l-3.636-3.635z"
            clipRule="evenodd"
          />
        </Styled.StyledSvg>
        <input
          type="text"
          placeholder="검색어를 입력해주세요."
          onChange={handleSearchChange()}
          maxLength={50}
        />

        <SelectBox id="select" onClick={handleMenubarClick}>
          {selectBoxContent}
          <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 24 24"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M7 10l5 5 5-5z" />
          </svg>
        </SelectBox>
        {isSelectOpen && (
          <MenuBar isOpen={isSelectOpen} setIsOpen={setIsSelectOpen}>
            <UlWrapper onClick={handleKeyWordChange}>
              {lis.map((li, idx) => (
                <li key={idx} id={li.id} className={li.className}>
                  {li.content}
                </li>
              ))}
            </UlWrapper>
          </MenuBar>
        )}
      </Styled.InputBox>
      {posts && (
        <div>
          {posts.length === 0 ? (
            <Styled.CountBox>검색 결과가 없습니다.</Styled.CountBox>
          ) : (
            <>
              <Styled.CountBox>
                총 <b>{state.totalResults}개</b>의 포스트를 찾았습니다.
              </Styled.CountBox>
              <Styled.ListBox>
                {posts.map(post => (
                  <Item key={post.id} {...post} />
                ))}
                {children}
              </Styled.ListBox>
            </>
          )}
        </div>
      )}
    </Styled.Container>
  );
};

export default withLoading(Search);
