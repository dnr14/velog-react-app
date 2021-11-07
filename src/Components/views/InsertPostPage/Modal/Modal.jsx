import React, { useEffect, useRef, useState } from 'react';
import { ModalContainer } from './styled';

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
    <ModalContainer onClick={modalClose} visible={visible}>
      {children}
    </ModalContainer>
  );
};

export default Modal;
