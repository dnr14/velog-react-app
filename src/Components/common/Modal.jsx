import React, { useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';

const DELAY = 500;
const Modal = ({ isOpen, setIsOpen, children, closeDelay }) => {
  const [visible, setVisible] = useState(false);
  const close = useRef(false);

  const modalClose = () => {
    setVisible(false);
    close.current = true;
  };

  useEffect(() => {
    if (!visible && isOpen && !close.current) {
      setTimeout(() => setVisible(true), DELAY);
    } else if (close.current) {
      setTimeout(() => setIsOpen(false), DELAY);
      close.current = false;
    }
  }, [visible, isOpen, setIsOpen]);

  useEffect(() => setTimeout(() => modalClose(), closeDelay), [closeDelay]);

  return (
    <ModalWrapper onClick={modalClose} visible={visible}>
      {children}
    </ModalWrapper>
  );
};

const ModalWrapper = styled.div`
  position: fixed;
  color: white;
  top: 5%;
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

export default Modal;
