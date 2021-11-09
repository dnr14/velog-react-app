import styled from 'styled-components';

export const Height = styled.div`
  height: 4rem;
`;

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1728px;
  margin: 0 auto;
  height: 100%;

  ${({ theme }) => theme.main.media.pc3} {
    width: 1376px;
  }
  ${({ theme }) => theme.main.media.pc2} {
    width: 1024px;
  }
  ${({ theme }) => theme.main.media.pc1} {
    width: calc(100% - 2rem);
  }
`;

export const Logo = styled.div`
  display: flex;
  align-items: center;
  -webkit-box-pack: center;
  -webkit-box-align: center;
  justify-content: center;
  font-weight: bold;
  color: rgb(52, 58, 64);
  font-size: 1.3125rem;
  text-decoration: none;

  a {
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    color: inherit;
    text-decoration: none;
  }
  svg {
    ${({ theme }) => theme.main.media.pc1} {
      height: 1.25rem;
    }
  }
`;

export const SearchBox = styled.div`
  display: flex;
  align-items: center;

  & > a:first-child {
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
    background: transparent;
    border: none;
    width: 2.5rem;
    height: 2.5rem;
    outline: none;
    border-radius: 50%;
    cursor: pointer;
    margin-right: 0.75rem;
    & > svg {
      width: 1.125rem;
      height: 1.125rem;
    }
    &:hover {
      background: rgba(0, 0, 0, 0.043);
    }
  }
`;

export const InsertButton = styled.button`
  height: 2rem;
  padding-left: 1rem;
  padding-right: 1rem;
  font-size: 1rem;
  border-radius: 1rem;
  outline: none;
  font-weight: bold;
  word-break: keep-all;
  background: white;
  border: 1px solid rgb(52, 58, 64);
  color: rgb(52, 58, 64);
  transition: all 0.125s ease-in 0s;
  cursor: pointer;
  &:hover {
    background: rgb(52, 58, 64);
    color: white;
  }
  ${({ theme }) => theme.main.media.pc1} {
    display: none;
  }
`;
