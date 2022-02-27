import React, { useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import {
  getBrandColor1,
  tab1,
  pc1,
  getDarkColor2,
  getWhiteColor2,
  getDarkColor4,
  getWhiteColor3,
  getDarkColor5,
  getWhiteColor4,
  getBrandColor4,
  getWhiteColor5,
  getDarkColor3,
} from '@/assets/style/theme';

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
    <ThumbModal visible={visible}>
      <ThumbModalWrraper>
        <div>
          <section>
            <h3>포스트 미리보기</h3>
            {file && (
              <ImageRemoveButton>
                <button type="button" onClick={s3Fileupload}>
                  제거
                </button>
              </ImageRemoveButton>
            )}
            <div className="content">
              <div>
                <div>
                  <ImageBox>
                    {file ? (
                      <img src={file.path} alt="img" />
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
                  </ImageBox>
                </div>
              </div>
            </div>
            <ButtonBox>
              <Button color="gray" type="button" onClick={modalClose}>
                취소
              </Button>
              <Button color="teal" type="submit">
                출간하기
              </Button>
            </ButtonBox>
          </section>
        </div>
      </ThumbModalWrraper>
    </ThumbModal>
  );
};

const ThumbModal = styled.div`
  min-width: 350px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  box-sizing: border-box;
  left: 0px;
  top: 0px;
  width: 100%;
  height: 100%;
  background: ${getWhiteColor2};
  z-index: -1;
  transition: z-index 0.25s ease-in, transform 0.25s ease-in;
  transform: translateY(100%);

  ${({ visible }) =>
    visible &&
    css`
      transform: translateY(0%);
      z-index: 15;
    `}

  ${tab1} {
    align-items: flex-start;
    padding: 2rem 1rem;
    overflow: auto;
  }
`;
const ThumbModalWrraper = styled.div`
  width: 768px;
  display: flex;
  justify-content: center;

  h3 {
    font-size: 1.3125rem;
    color: ${getDarkColor2};
    line-height: 1.5;
    margin-bottom: 0.5rem;
    margin-top: 0px;
  }

  & > div {
    flex: 1 1 0%;
    min-width: 0px;
  }

  .content > div {
    width: 100%;
    padding-top: 55.11%;
    position: relative;
  }
  .content > div > div {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0px;
    top: 0px;
    box-shadow: rgb(0 0 0 / 3%) 0px 0px 4px 0px;
  }

  ${pc1} {
    width: 704px;
  }
`;
const ImageRemoveButton = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 1rem;

  button {
    background: none;
    outline: none;
    border: none;
    font-size: 1rem;
    color: ${getDarkColor4};
    cursor: pointer;
    padding: 0px;
    text-decoration: underline;
  }
`;
const ImageBox = styled.div`
  background: ${getWhiteColor3};
  width: 100%;
  height: 100%;
  display: flex;
  -webkit-box-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  align-items: center;
  flex-direction: column;
  box-sizing: border-box;
  padding: 1rem;

  label {
    margin-top: 1rem;
    padding: 0.25rem 2rem;
    background: ${getWhiteColor2};
    border-radius: 4px;
    box-shadow: rgb(0 0 0 / 2%) 0px 0px 4px;
    font-size: 1rem;
    line-height: 1.5;
    color: ${getBrandColor1};
    outline: none;
    border: none;
    cursor: pointer;
    transition: all 0.125s ease-in 0s;
    font-weight: bold;
  }
  img {
    width: 100%;
    height: 100%;
  }

  input[type='file'] {
    position: absolute;
    width: 0;
    height: 0;
    padding: 0;
    overflow: hidden;
    border: 0;
  }
`;
const ButtonBox = styled.div`
  display: flex;
  margin-top: 1rem;
`;
const Button = styled.button`
  display: inline-flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  font-weight: bold;
  cursor: pointer;
  outline: none;
  border: none;
  color: ${getDarkColor5};
  border-radius: 4px;
  padding: 0px 1.25rem;
  height: 2.5rem;
  font-size: 1.125rem;

  & + & {
    margin-left: 0.75rem;
  }

  svg {
    font-size: 1.25rem;
    margin-right: 0.5rem;
  }

  ${({ color }) => {
    if (color === 'lightGray') {
      return css`
        background-color: ${getWhiteColor3};
        color: black;
        &:focus,
        &:hover {
          background-color: ${getWhiteColor4};
        }
      `;
    }
    if (color === 'teal') {
      return css`
        color: ${getWhiteColor2};
        background-color: ${getBrandColor1};
        &:focus,
        &:hover {
          background-color: ${getBrandColor4};
        }
      `;
    }
    if (color === 'gray') {
      return css`
        background: ${getDarkColor4};
        color: ${getWhiteColor2};
        &:focus,
        &:hover {
          background-color: ${getWhiteColor5}|;
        }
      `;
    }
    return css`
      background-color: transparent;
      &:hover {
        background: ${getDarkColor3};
      }
    `;
  }}
`;

export default Thumb;
