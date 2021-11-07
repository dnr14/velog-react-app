import { useLayoutEffect, useRef, useState } from 'react';

const useResize = () => {
  const [textAreaHeight, setTextAreaHeight] = useState(0);
  const [textAreaWidth, setTextAreaWidth] = useState(0);
  const textareaRef = useRef(null);
  const tagInputRef = useRef(null);
  // 리사이즈
  useLayoutEffect(() => {
    let timer;
    let eventHandler;
    const throttling = (cb, delay) => {
      eventHandler = () => {
        if (timer) return;
        timer = setTimeout(() => {
          cb();
          timer = null;
        }, delay);
      };
      return eventHandler;
    };

    function resize() {
      const currentH = window.innerWidth > 767 ? 66 : 43;
      setTextAreaWidth(textareaRef.current.clientWidth);
      setTextAreaHeight(currentH);
    }
    resize();
    window.addEventListener('resize', throttling(resize, 200));
    return () => window.removeEventListener('resize', eventHandler);
  }, []);

  return { textAreaHeight, textAreaWidth, textareaRef, tagInputRef };
};

export default useResize;
