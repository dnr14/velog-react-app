import styled, { css } from 'styled-components';

export const Form = styled.form`
  flex: 1;
`;
export const Button = styled.button`
  display: inline-flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  font-weight: bold;
  cursor: pointer;
  outline: none;
  border: none;
  color: rgb(73, 80, 87);
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
        background-color: rgb(233, 236, 239);
        color: black;
        &:focus,
        &:hover {
          background-color: rgba(233, 236, 239, 0.8);
        }
      `;
    }
    if (color === 'teal') {
      return css`
        color: white;
        background-color: rgb(18, 184, 134);
        &:focus,
        &:hover {
          background-color: rgba(18, 184, 134, 0.8);
        }
      `;
    }
    if (color === 'gray') {
      return css`
        background: rgb(134, 142, 150);
        color: white;
        &:focus,
        &:hover {
          background-color: rgba(134, 142, 150, 0.8);
        }
      `;
    }
    return css`
      background-color: transparent;
      &:hover {
        background: rgba(0, 0, 0, 0.05);
      }
    `;
  }}
`;
export const Container = styled.div`
  display: flex;
`;

export const Body = styled.div`
  /* padding-top: 2rem; */
  padding-left: 3rem;
  padding-right: 3rem;

  ${({ theme }) => theme.insert.media.tab1} {
    padding: 1rem;
  }
`;

export const ButtonBox = styled.div`
  position: fixed;
  bottom: 0;
  margin: 0 auto;
  left: 0;
  right: 0;

  & > div {
    gap: 1rem;
    padding: 1rem 1rem;
    box-shadow: rgb(0 0 0 / 10%) 0px 0px 8px;
    background: rgba(255, 255, 255, 0.85);
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
  }

  & > div > div {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
`;

export const Title = styled.div`
  padding-top: 2rem;
  padding-left: 3rem;
  padding-right: 3rem;
  transition: all 0.5s;

  & > textarea {
    display: block;
    padding: 0px;
    font-size: 2.75rem;
    width: 100%;
    resize: none;
    line-height: 1.5;
    outline: none;
    border: none;
    font-weight: bold;
    background: transparent;
    color: rgb(33, 37, 41);
    overflow-y: hidden;
    &::placeholder {
      color: rgba(33, 37, 41, 0.5);
    }

    ${({ theme }) => theme.insert.media.tab1} {
      font-size: 1.8rem;
    }
  }

  ${({ theme }) => theme.insert.media.tab1} {
    padding: 1rem;
  }
`;

export const Line = styled.div`
  background: rgb(73, 80, 87);
  height: 6px;
  width: 4rem;
  margin-top: 1.5rem;
  margin-bottom: 1rem;
  border-radius: 1px;
  ${({ theme }) => theme.insert.media.tab1} {
    margin-top: 1rem;
    margin-bottom: 0.66rem;
  }
`;

export const TagBox = styled.div`
  color: rgb(52, 58, 64);
  font-size: 1.125rem;
  display: flex;
  flex-wrap: wrap;
  position: relative;

  input {
    display: inline-flex;
    outline: none;
    cursor: text;
    font-size: 1.125rem;
    line-height: 2rem;
    margin-bottom: 0.75rem;
    min-width: 8rem;
    border: none;
    background: transparent;
    ${({ theme }) => theme.insert.media.tab1} {
      line-height: 1.5rem;
      font-size: 0.75rem;
    }

    &:focus + div {
      opacity: 1;
      transform: translateY(0px);
      z-index: 5;
    }
  }
`;

export const Tag = styled.div`
  font-size: 1rem;
  display: inline-flex;
  -webkit-box-align: center;
  align-items: center;
  height: 2rem;
  border-radius: 1rem;
  padding-left: 1rem;
  padding-right: 1rem;
  background: rgb(241, 243, 245);
  color: rgb(12, 166, 120);
  margin-right: 0.75rem;
  transition: all 0.125s ease-in 0s;
  cursor: pointer;
  margin-bottom: 0.75rem;
  animation: 0.125s ease-in-out 0s 1 normal forwards running iMKika;
  ${({ theme }) => theme.insert.media.tab1} {
    height: 1.5rem;
    font-size: 0.75rem;
    border-radius: 0.75rem;
    padding-left: 0.75rem;
    padding-right: 0.75rem;
    margin-right: 0.5rem;
    margin-bottom: 0.5rem;
  }
`;

export const InputMessage = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  gap: 2px;
  width: 330px;
  background: rgba(73, 80, 87, 1);
  padding: 0.7rem 1rem;
  color: white;
  line-height: 1.5;
  font-size: 0.8rem;
  z-index: -1;
  top: 100%;
  transition: opacity 0.5s, z-index 0.5s, transform 0.35s ease-in;
  opacity: 0;
  transform: translateY(-30px);
  ${({ theme }) => theme.insert.media.tab1} {
    width: 55%;
  }
`;
