import styled from 'styled-components';

export const StyledSvg = styled.svg`
  width: 1.5rem;
  height: 1.5rem;
  margin-right: 1.25rem;
  transition: all 0.125s ease-in 0s;
  fill: rgb(33, 37, 41);
  flex-shrink: 0;

  ${({ theme }) => theme.main.media.tab1} {
    width: 1rem;
    height: 1rem;
    margin-right: 0.75rem;
  }
`;

export const Container = styled.div`
  margin-top: 3.5rem;
  width: 768px;
  margin-left: auto;
  margin-right: auto;
  box-sizing: border-box;

  ${({ theme }) => theme.main.media.pc1} {
    padding-left: 1rem;
    padding-right: 1rem;
  }
  ${({ theme }) => theme.main.media.tab1} {
    margin-top: 0.5rem;
    width: 100%;
  }
`;

export const InputBox = styled.div`
  margin-bottom: 1.5rem;
  position: relative;
  display: flex;
  border: 1px solid rgb(33, 37, 41);
  -webkit-box-align: center;
  align-items: center;
  transition: all 0.125s ease-in 0s;
  cursor: text;
  height: 4rem;
  padding: 0px 1.5rem;

  input {
    height: 100%;
    background-color: transparent;
    font-size: 1.5rem;
    line-height: 2rem;
    height: 2rem;
    transition: all 0.125s ease-in 0s;
    flex: 1 1 0%;
    display: block;
    line-height: 1rem;
    padding: 0px;
    border: none;
    outline: 0px;
    color: rgb(73, 80, 87);
    min-width: 0px;

    &::placeholder {
      color: rgb(173, 181, 189);
    }
  }

  ${({ theme }) => theme.main.media.tab1} {
    height: 2.25rem;
    padding-left: 1rem;
    padding-right: 1rem;

    input {
      flex: 1 1 0%;
      font-size: 1.125rem;
      line-height: 1.5;
    }
    svg {
      width: 1rem;
      height: 1rem;
      margin-right: 0.75rem;
    }
  }
`;

export const CountBox = styled.p`
  margin-bottom: 4rem;
  font-size: 1.125rem;
  line-height: 1.5;
  color: rgb(73, 80, 87);
  b {
    color: rgb(33, 37, 41);
  }

  ${({ theme }) => theme.main.media.tab1} {
    font-size: 1rem;
    margin-bottom: 1rem;
  }
`;

export const ListBox = styled.div``;
export const ItemBox = styled.div`
  padding-top: 4rem;
  padding-bottom: 4rem;
  line-height: 1.5;
  &:first-child {
    padding-top: 0px;
  }

  & + & {
    border-top: 1px solid rgb(233, 236, 239);
  }

  h2 {
    font-size: 1.5rem;
    margin: 0px;
    color: rgb(33, 37, 41);
    word-break: keep-all;
  }

  p {
    margin-bottom: 2rem;
    margin-top: 0.5rem;
    font-size: 1rem;
    color: rgb(73, 80, 87);
    word-break: keep-all;
    overflow-wrap: break-word;
  }

  .subinfo {
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    margin-top: 1rem;
    color: rgb(134, 142, 150);
    font-size: 0.875rem;
  }
  .separator {
    margin-left: 0.5rem;
    margin-right: 0.5rem;
  }

  ${({ theme }) => theme.main.media.tab1} {
    padding-top: 2rem;
    padding-bottom: 2rem;
    h2 {
      font-size: 1rem;
    }
    p {
      font-size: 0.875rem;
      margin-bottom: 1.5rem;
    }

    .subinfo {
      font-size: 0.75rem;
    }
  }
`;

export const SelectBox = styled.select`
  width: 100px;
  height: 100%;
`;
