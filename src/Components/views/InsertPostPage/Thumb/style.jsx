import styled, { css } from 'styled-components';

export const ThumbModal = styled.div`
  min-width: 350px;
  background-color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  box-sizing: border-box;
  left: 0px;
  top: 0px;
  width: 100%;
  height: 100%;
  background: rgb(248, 249, 250);
  z-index: -1;
  transition: z-index 0.25s ease-in, transform 0.25s ease-in;
  transform: translateY(100%);

  ${({ visible }) =>
    visible &&
    css`
      transform: translateY(0%);
      z-index: 15;
    `}

  ${({ theme }) => theme.insert.media.tab1} {
    align-items: flex-start;
    padding: 2rem 1rem;
    overflow: auto;
  }
`;

export const ThumbModalWrraper = styled.div`
  width: 768px;
  display: flex;
  justify-content: center;

  h3 {
    font-size: 1.3125rem;
    color: rgb(52, 58, 64);
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

  ${({ theme }) => theme.insert.media.pc1} {
    width: 704px;
  }
`;

export const ImageRemoveButton = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 1rem;

  button {
    background: none;
    outline: none;
    border: none;
    font-size: 1rem;
    color: rgb(134, 142, 150);
    cursor: pointer;
    padding: 0px;
    text-decoration: underline;
  }
`;

export const ImageBox = styled.div`
  background: rgb(233, 236, 239);
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
    background: white;
    border-radius: 4px;
    box-shadow: rgb(0 0 0 / 2%) 0px 0px 4px;
    font-size: 1rem;
    line-height: 1.5;
    color: rgb(32, 201, 151);
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
export const ButtonBox = styled.div`
  display: flex;
  margin-top: 1rem;
`;
