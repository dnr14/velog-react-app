import styled from 'styled-components';

export const PostTitle = styled.h1`
  font-size: 3.5rem;
  font-weight: 800;
  margin-bottom: 32px;
`;

export const PostDate = styled.span`
  color: #495057;
`;

export const PostManage = styled.div`
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

export const Tag = styled.span`
  color: #08a678;
  font-weight: 500;
  background-color: rgb(235, 235, 235);
  border-radius: 15px;
  padding: 5px 16px;
  cursor: pointer;

  &:hover {
    background-color: #f8f9fa;
  }
`;

export const PostContent = styled.div`
  font-size: 1.2rem;

  p {
    display: flex;
    flex-direction: column;
  }
`;

export const ButtonWrapper = styled.div`
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

export const Form = styled.form`
  margin-bottom: 50px;
  margin-top: 30px;
`;

export const Confirm = styled.div`
  margin: 20px 0;
  font-size: 0.9rem;
`;

export const TextArea = styled.textarea`
  padding: 16px 16px 24px 16px;
  resize: none;
  border: 1px solid #e9ecef;
  border-radius: 5px;
  font-size: 1rem;
  width: 100%;
  margin-bottom: 24px;
  box-sizing: border-box;

  &:focus {
    outline: none;
  }

  //Chrome/Opera/Safari
  &::-webkit-input-placeholder {
    color: rgb(200, 200, 200);
  }
  //Firefox 19+
  &::-moz-placeholder {
    color: rgb(200, 200, 200);
  }
  //IE 10+
  &:-ms-input-placeholder {
    color: rgb(200, 200, 200);
  }
  //Firefox 18-
  &:-moz-placeholder {
    color: rgb(200, 200, 200);
  }
`;

export const CommentWrap = styled.div`
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid #dbdbdb;
  padding: 24px 0;
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

export const Wrapper = styled.div`
  position: fixed;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  background-color: rgba(255, 255, 255, 0.8);
  z-index: 1000;
`;

export const InnerWrapper = styled.div`
  width: 300px;
  padding: 32px 24px;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px,
    rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
  transition: all 600ms cubic-bezier(0.86, 0, 0.07, 1);
  transform: matrix(1, 0, 0, 1, 0, 0);
  border-radius: 5px;
`;

export const PostWrapper = styled.div`
  width: 80vw;
  height: 100%;
  padding: 10%;
`;
export const PostHeader = styled.div`
  margin-bottom: 40px;
`;
export const PostInfo = styled.div`
  display: flex;
  justify-content: space-between;
`;
export const PostTags = styled.div`
  display: flex;
  gap: 14px;
  margin-top: 14px;
`;

export const PostComments = styled.div`
  border-top: 1px solid rgb(219, 219, 219);
  margin-top: 50px;
  padding-top: 50px;
`;

export const CommentsTitle = styled.h4`
  margin: 24px 0 16px 0;
`;
