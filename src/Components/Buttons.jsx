import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import Button from './common/Button';

const Buttons = ({ textAreaWidth, thumbModalOpen, handleTransientStorage }) => {
  const history = useHistory();
  const goBack = useCallback(() => history.goBack(), [history]);

  return (
    <ButtonsWrapper
      style={{ width: textAreaWidth > 767 ? `${textAreaWidth}px` : `auto` }}
    >
      <Button type="button" onClick={goBack}>
        <svg
          stroke="currentColor"
          fill="currentColor"
          strokeWidth="0"
          viewBox="0 0 24 24"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
        </svg>
        나가기
      </Button>
      <div>
        <Button
          type="button"
          color="lightGray"
          onClick={handleTransientStorage}
        >
          임시저장
        </Button>
        <Button type="button" color="teal" onClick={thumbModalOpen}>
          출간하기
        </Button>
      </div>
    </ButtonsWrapper>
  );
};

const ButtonsWrapper = styled.div`
  position: fixed;
  bottom: 0;
  margin: 0 auto;
  left: 0;
  right: 0;

  gap: 1rem;
  padding: 1rem 1rem;
  box-shadow: rgb(0 0 0 / 10%) 0px 0px 8px;
  background: rgba(255, 255, 255, 0.85);
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  & > div {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
`;

export default Buttons;
