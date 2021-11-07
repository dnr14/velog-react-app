import React, { useEffect, useRef, useState } from 'react';
import { Button } from '../Write/style';
import * as Styled from './style';

const Thumb = ({ file, isOpen, setIsOpen, s3Fileupload }) => {
  const [visible, setVisible] = useState(false);
  const close = useRef(false);

  const modalClose = () => {
    setVisible(false);
    close.current = true;
  };

  useEffect(() => {
    document.body.style.cssText = `
    position: fixed; 
    top: -${window.scrollY}px;
    overflow-y: scroll;
    width: 100%;`;
    return () => {
      const scrollY = document.body.style.top;
      document.body.style.cssText = '';
      window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
    };
  }, []);

  useEffect(() => {
    if (!visible && isOpen && !close.current) {
      setTimeout(() => setVisible(true), 400);
    } else if (close.current) {
      setTimeout(() => setIsOpen(false), 400);
      close.current = false;
    }
  }, [visible, isOpen, setIsOpen]);

  return (
    <Styled.ThumbModal visible={visible}>
      <Styled.ThumbModalWrraper>
        <div>
          <section>
            <h3>포스트 미리보기</h3>
            {file && (
              <Styled.ImageRemoveButton>
                <button type="button" onClick={s3Fileupload}>
                  제거
                </button>
              </Styled.ImageRemoveButton>
            )}
            <div className="content">
              <div>
                <div>
                  <Styled.ImageBox>
                    {file ? (
                      <img src={file.base64} alt="img" />
                    ) : (
                      <>
                        <svg
                          width="107"
                          height="85"
                          fill="none"
                          viewBox="0 0 107 85"
                        >
                          <path
                            fill="#868E96"
                            d="M105.155 0H1.845A1.844 1.844 0 0 0 0 1.845v81.172c0 1.02.826 1.845 1.845 1.845h103.31A1.844 1.844 0 0 0 107 83.017V1.845C107 .825 106.174 0 105.155 0zm-1.845 81.172H3.69V3.69h99.62v77.482z"
                          />
                          <path
                            fill="#868E96"
                            d="M29.517 40.84c5.666 0 10.274-4.608 10.274-10.271 0-5.668-4.608-10.276-10.274-10.276-5.665 0-10.274 4.608-10.274 10.274 0 5.665 4.609 10.274 10.274 10.274zm0-16.857a6.593 6.593 0 0 1 6.584 6.584 6.593 6.593 0 0 1-6.584 6.584 6.591 6.591 0 0 1-6.584-6.582c0-3.629 2.954-6.586 6.584-6.586zM12.914 73.793a1.84 1.84 0 0 0 1.217-.46l30.095-26.495 19.005 19.004a1.843 1.843 0 0 0 2.609 0 1.843 1.843 0 0 0 0-2.609l-8.868-8.868 16.937-18.548 20.775 19.044a1.846 1.846 0 0 0 2.492-2.72L75.038 31.846a1.902 1.902 0 0 0-1.328-.483c-.489.022-.95.238-1.28.6L54.36 51.752l-8.75-8.75a1.847 1.847 0 0 0-2.523-.081l-31.394 27.64a1.845 1.845 0 0 0 1.22 3.231z"
                          />
                        </svg>
                        <label htmlFor="file" className="fileBox">
                          썸네일 업로드
                          <input
                            type="file"
                            id="file"
                            onChange={s3Fileupload}
                          />
                        </label>
                      </>
                    )}
                  </Styled.ImageBox>
                </div>
              </div>
            </div>
            <Styled.ButtonBox>
              <Button color="gray" type="button" onClick={modalClose}>
                취소
              </Button>
              <Button color="teal" type="submit">
                출간하기
              </Button>
            </Styled.ButtonBox>
          </section>
        </div>
      </Styled.ThumbModalWrraper>
    </Styled.ThumbModal>
  );
};

export default Thumb;
