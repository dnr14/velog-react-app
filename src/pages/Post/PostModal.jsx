import React from 'react';
import PostButtons from '@/Components/PostButtons';
import * as Styled from './styles';

function PostModal({ openModal, setOpenModalHandler, confirmEvent }) {
  const handleCancelClick = () => setOpenModalHandler();
  const handleConfirmClick = () => confirmEvent();

  if (!openModal) return null;

  return (
    <Styled.Wrapper>
      <Styled.InnerWrapper>
        <div>
          <h3>포스트 삭제</h3>
          <Styled.Confirm>정말로 삭제하시겠습니까?</Styled.Confirm>
          <PostButtons
            firstText="취소"
            secondText="확인"
            handleCancelClick={handleCancelClick}
            handleConfirmClick={handleConfirmClick}
          />
        </div>
      </Styled.InnerWrapper>
    </Styled.Wrapper>
  );
}

export default PostModal;
