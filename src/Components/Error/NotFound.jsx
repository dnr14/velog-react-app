import React, { memo } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import NotFoundImg from '@/assets/images/404.png';

const StyledDiv = styled.div`
  display: flex;
  position: fixed;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-top: 10%;
  margin-bottom: 10%;
  color: rgba(46, 204, 113, 1);
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  & > div {
    display: flex;
    align-items: center;
    gap: 20px;
    flex-wrap: wrap;
    justify-content: center;
  }

  img {
    width: 200px;
  }
  span {
    font-weight: 900;
    font-size: 2rem;
  }

  button {
    padding: 0.8rem 1.5rem;
    cursor: pointer;
    background: rgba(46, 204, 113, 1);
    border-radius: 5px;
    font-weight: 900;
    color: #fff;
    border: none;
    box-shadow: 0px 2px 5px rgba(00, 00, 00, 0.8);

    &:hover {
      background: rgba(46, 204, 113, 0.8);
    }
  }
`;

const NotFount = () => {
  return (
    <StyledDiv>
      <div>
        <img src={NotFoundImg} alt="404" />
        <span>NOT FOUND</span>
      </div>
      <span>잘못 된 페이지입니다.</span>
      <Link to="/">
        <button type="button">홈으로</button>
      </Link>
    </StyledDiv>
  );
};

export default memo(NotFount);
