import React, { forwardRef } from 'react';
import { Link } from 'react-router-dom';
import MenuBar from './MenuBar';
import * as Styled from './style';

const Menu = (
  {
    handleManubarClick,
    handleClick,
    setIsSelectOpen,
    setIsNoticeOpen,
    isNoticeOpen,
    isSelectOpen,
  },
  [crrentLink, lineRef]
) => {
  return (
    <Styled.FlexBox>
      <Styled.RightBox>
        <div>
          <Link
            to="/"
            className="active"
            ref={crrentLink}
            onClick={handleClick}
          >
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 24 24"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z" />
            </svg>
            트렌딩
          </Link>
          <Link to="/" onClick={handleClick}>
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 24 24"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
            </svg>
            최신
          </Link>
          <div className="line" ref={lineRef} />
        </div>
        <Styled.SelectBox onClick={handleManubarClick} id="select">
          이번 주
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
        </Styled.SelectBox>
        {isSelectOpen && (
          <MenuBar isOpen={isSelectOpen} setIsOpen={setIsSelectOpen}>
            <Styled.UlWrapper>
              <li>오늘</li>
              <li>이번 주</li>
              <li>이번 달</li>
              <li>올해</li>
            </Styled.UlWrapper>
          </MenuBar>
        )}
      </Styled.RightBox>
      <Styled.NoticeBox onClick={handleManubarClick} id="notice">
        <svg
          stroke="currentColor"
          fill="currentColor"
          strokeWidth="0"
          viewBox="0 0 24 24"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
        </svg>
        {isNoticeOpen && (
          <MenuBar isOpen={isNoticeOpen} setIsOpen={setIsNoticeOpen}>
            <Styled.UlWrapper>
              <li>공지사항</li>
              <li>태그 목록</li>
              <li>서비스 정책</li>
              <li>Slack</li>
            </Styled.UlWrapper>
            <div className="contact">
              <h5>문의</h5>
              <div className="email">contact@velog.io</div>
            </div>
          </MenuBar>
        )}
      </Styled.NoticeBox>
    </Styled.FlexBox>
  );
};

export default forwardRef(Menu);
