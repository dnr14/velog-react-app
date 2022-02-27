import styled from 'styled-components';
import {
  tab1,
  pc1,
  getDarkColor1,
  getDarkColor4,
  getWhiteColor3,
  getDarkColor5,
} from '@/assets/style/theme';

export const StyledSvg = styled.svg`
  width: 1.5rem;
  height: 1.5rem;
  margin-right: 1.25rem;
  transition: all 0.125s ease-in 0s;
  fill: ${getDarkColor1};
  flex-shrink: 0;

  ${tab1} {
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

  ${pc1} {
    padding-left: 1rem;
    padding-right: 1rem;
  }
  ${tab1} {
    margin-top: 0.5rem;
    width: 100%;
  }
`;

export const InputBox = styled.div`
  margin-bottom: 1.5rem;
  position: relative;
  display: flex;
  border: 1px solid ${getDarkColor1};
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
    color: ${getDarkColor5};
    min-width: 0px;

    &::placeholder {
      color: rgb(173, 181, 189);
    }
  }

  ${tab1} {
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
  color: ${getDarkColor5};
  b {
    color: ${getDarkColor1};
  }

  ${tab1} {
    font-size: 1rem;
    margin-bottom: 1rem;
  }
`;

export const ListBox = styled.div``;
export const ItemWrapper = styled.div`
  padding-top: 4rem;
  padding-bottom: 4rem;
  line-height: 1.5;
  &:first-child {
    padding-top: 0px;
  }

  & + & {
    border-top: 1px solid ${getWhiteColor3};
  }

  h2 {
    font-size: 1.5rem;
    margin: 0px;
    color: ${getDarkColor1};
    word-break: keep-all;
  }

  p {
    margin-bottom: 2rem;
    margin-top: 0.5rem;
    font-size: 1rem;
    color: ${getDarkColor5};
    word-break: keep-all;
    overflow-wrap: break-word;
  }

  .subinfo {
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    margin-top: 1rem;
    color: ${getDarkColor4};
    font-size: 0.875rem;
  }
  .separator {
    margin-left: 0.5rem;
    margin-right: 0.5rem;
  }

  ${tab1} {
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
