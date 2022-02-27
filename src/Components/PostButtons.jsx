import React from 'react';
import styled from 'styled-components';

const PostButtons = ({
  size,
  firstText,
  secondText,
  handleCancelClick,
  handleConfirmClick,
}) => {
  if (size === 1) {
    return (
      <ButtonWrapper>
        <button type="button" className="confirm" onClick={handleConfirmClick}>
          {firstText}
        </button>
      </ButtonWrapper>
    );
  }

  return (
    <ButtonWrapper>
      <button type="button" className="cancel" onClick={handleCancelClick}>
        {firstText}
      </button>
      <button type="button" className="confirm" onClick={handleConfirmClick}>
        {secondText}
      </button>
    </ButtonWrapper>
  );
};

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 32px;

  button {
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 500;
    height: 32px;
    padding: 0 20px;
    color: #ffffff;
    border-radius: 5px;
    font-size: 1rem;
    cursor: pointer;
  }

  .confirm {
    background-color: #14b885;

    &:hover {
      background-color: #20c997;
    }
  }

  .cancel {
    background-color: #858e96;

    &:hover {
      background-color: #acb5bd;
    }
  }
`;

export default PostButtons;
