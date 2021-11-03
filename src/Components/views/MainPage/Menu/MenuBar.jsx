import React, { useEffect, useRef, useState } from 'react';
import * as Styled from './style';

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
    <Styled.MenuBar onClick={modalClose} visible={visible}>
      <Styled.MenuBarWrraper visible={visible}>
        {children}
      </Styled.MenuBarWrraper>
    </Styled.MenuBar>
  );
};

export default MenuBar;
