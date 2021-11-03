import styled, { css } from 'styled-components';

export const FlexBox = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1.5rem;
  margin-bottom: 2rem;
  height: 3rem;
`;

export const RightBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  & > div:first-child {
    position: relative;
    display: flex;
    width: 14rem;

    & > a {
      display: flex;
      width: 7rem;
      align-items: center;
      justify-content: center;
      font-size: 1.125rem;
      text-decoration: none;
      color: rgb(134, 142, 150);
      height: 3rem;
      transition: color 0.5s ease-in, font-weight 0.5s ease-in;
      & > svg {
        font-size: 1.5rem;
        margin-right: 0.5rem;
      }
      &.active {
        color: rgb(52, 58, 64);
        font-weight: bold;
      }
      ${({ theme }) => theme.main.media.tab2} {
        font-size: 1rem;
        width: 5rem;
        & > svg {
          font-size: 1.25rem;
        }
      }
    }

    .line {
      bottom: 0;
      position: absolute;
      height: 2px;
      background-color: black;
      width: 50%;
      transition: transform 0.25s ease-in;
      &.active {
        transform: translateX(100%);
      }
    }

    ${({ theme }) => theme.main.media.tab2} {
      width: 10rem;
    }
  }
`;

export const SelectBox = styled.div`
  display: flex;
  background: white;
  height: 2rem;
  width: 5rem;
  border-radius: 4px;
  justify-content: space-between;
  align-items: center;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  font-weight: 600;
  color: rgb(73, 80, 87);
  font-size: 0.875rem;
  box-shadow: rgb(0 0 0 / 5%) 0px 0px 4px;
  cursor: pointer;

  & > svg {
    width: 1.5rem;
    height: 1.5rem;
  }

  ${({ theme }) => theme.main.media.pc1} {
    width: 4.25rem;
    font-size: 0.75rem;
  }
`;

export const MenuBar = styled.div`
  position: absolute;
  right: 0;
  top: 100%;
  z-index: 0;
  transition: z-index 0.25s ease-in;

  ${({ visible }) =>
    visible &&
    css`
      z-index: 1;
    `}
`;

export const MenuBarWrraper = styled.div`
  margin-top: 0.5rem;
  width: 12rem;
  box-shadow: rgb(0 0 0 / 10%) 0px 0px 8px 0px;
  background: white;
  color: rgb(33, 37, 41);
  transform-origin: right top;
  opacity: 0;
  transition: opacity 0.35s, transform 0.35s, z-index 0.35s ease-in;
  transform: scale(0);

  ${({ visible }) =>
    visible &&
    css`
      opacity: 1;
      transform: scale(1);
    `}

  .contact {
    line-height: 1rem;
    border-top: 1px solid rgb(241, 243, 245);
    padding: 1rem;
    h5 {
      margin: 0px;
      font-size: 0.75rem;
    }
    .email {
      color: rgb(52, 58, 64);
      font-size: 0.75rem;
    }
  }
`;

export const UlWrapper = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;

  li {
    cursor: pointer;
    font-weight: 600;
    font-size: 0.875rem;
    padding: 0.75rem 1rem;
  }
  li + li {
    border-top: 1px solid rgb(241, 243, 245);
  }
  li:hover {
    background: rgb(248, 249, 250);
    color: rgb(18, 184, 134);
  }
`;

export const NoticeBox = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  & > svg {
    cursor: pointer;
    font-size: 1.5rem;
    color: rgb(134, 142, 150);
  }
`;
