import React, { memo } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';
import loding from '@/assets/images/loading.gif';
import { pc1 } from '@/assets/style/theme';

const Loading = ({ loading }) => {
  if (!loading) return null;

  return createPortal(
    <LoaingWrapper>
      <img src={loding} alt="loading" />
    </LoaingWrapper>,
    document.querySelector('#modal')
  );
};

const LoaingWrapper = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;

  & > img {
    width: 200px;
    height: 200px;
    -webkit-user-drag: none;
  }
`;

export default memo(Loading);
