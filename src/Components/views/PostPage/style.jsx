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

export const ButtonWrap = styled.div`
  display: flex;
  justify-content: flex-end;

  button {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #14b885;
    font-weight: 500;
    height: 32px;
    padding: 0 20px;
    color: #ffffff;
    border-radius: 5px;
    font-size: 1rem;
    cursor: pointer;

    &:hover {
      background-color: #20c997;
    }
  }
`;

export const Form = styled.form`
  margin-bottom: 50px;
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
