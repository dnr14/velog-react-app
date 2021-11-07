import styled, { css } from 'styled-components';

export const ModalContainer = styled.div`
  position: fixed;
  color: white;
  right: 5%;
  cursor: pointer;
  z-index: 0;
  transition: transform 1s, z-index 0.25s ease-in;
  transform: rotateX(90deg);
  box-shadow: rgb(0 0 0 / 4%) 0px 4px 16px 0px;

  ${({ visible }) =>
    visible &&
    css`
      z-index: 20;
      transform: rotateX(0deg);
    `}

  ${({ visible }) =>
    !visible &&
    css`
      transition: transform 0.5s, z-index 1s ease-in;
    `}

  ${({ theme }) => theme.insert.media.tab1} {
    top: 0;
    left: 0;
    right: 0;
  }

  & > div {
    display: flex;
    flex-direction: column;
    line-height: 1.5;
    padding: 1rem;
    padding-right: 3rem;
    &.green {
      background: rgb(18, 184, 134);
    }
    &.red {
      background: #e74c3c;
    }
  }
`;
