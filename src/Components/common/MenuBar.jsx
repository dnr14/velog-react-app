import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const MenuBar = ({ isOpen, setIsOpen, children }) => {
  const [visible, setVisible] = useState(false);
  const close = useRef(false);

  const modalClose = () => {
    setVisible(false);
    close.current = true;
  };

  useEffect(() => {
    if (!visible && isOpen && !close.current) {
      setTimeout(() => setVisible(true), 400);
    } else if (close.current) {
      setTimeout(() => setIsOpen(false), 400);
      close.current = false;
    }
  }, [visible, isOpen, setIsOpen]);

  return (
    <MenuBarWrapper onClick={modalClose} visible={visible}>
      <MenuBarInnerWrraper visible={visible}>{children}</MenuBarInnerWrraper>
    </MenuBarWrapper>
  );
};

const MenuBarWrapper = styled.div`
  position: absolute;
  right: 0;
  top: 100%;
  z-index: 0;
  transition: z-index 0.25s ease-in;

  ${({ visible }) =>
    visible &&
    css`
      z-index: 1;
    `}
`;

const MenuBarInnerWrraper = styled.div`
  margin-top: 0.5rem;
  width: 12rem;
  box-shadow: rgb(0 0 0 / 10%) 0px 0px 8px 0px;
  background: white;
  color: rgb(33, 37, 41);
  transform-origin: right top;
  opacity: 0;
  transition: opacity 0.35s, transform 0.35s, z-index 0.35s ease-in;
  transform: scale(0);

  ${({ visible }) =>
    visible &&
    css`
      opacity: 1;
      transform: scale(1);
    `}

  .contact {
    line-height: 1rem;
    border-top: 1px solid rgb(241, 243, 245);
    padding: 1rem;
    h5 {
      margin: 0px;
      font-size: 0.75rem;
    }
    .email {
      color: rgb(52, 58, 64);
      font-size: 0.75rem;
    }
  }

  .checked {
    color: rgb(248, 249, 250);
    background: rgb(18, 184, 134);
  }
`;

export default MenuBar;
