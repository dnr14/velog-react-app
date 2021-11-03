import styled from 'styled-components';

export const CommentWrap = styled.div`
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid #dbdbdb;
  padding: 24px 0;

  $:last-child {
    border-bottom: 1px solid pink;
  }
`;

export const CommentManage = styled.div`
  display: flex;
  gap: 10px;

  span {
    color: gray;
    cursor: pointer;

    &:hover {
      color: black;
    }
  }
`;

export const CommentInfo = styled.div`
  display: flex;
  justify-content: space-between;

  span {
    color: #868e96;
    font-size: 0.9rem;
  }
`;
