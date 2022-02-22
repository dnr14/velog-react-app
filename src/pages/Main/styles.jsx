import styled from 'styled-components';

export const MenuWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1.5rem;
  margin-bottom: 2rem;
  height: 3rem;
`;

export const RightSelectWrapper = styled.div`
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

export const Container = styled.div`
  max-width: 1728px;
  margin: 0 auto;
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

export const LayOut = styled.div`
  margin: -1rem;
  ${({ theme }) => theme.main.media.tab1} {
    margin: 0px;
  }
`;

export const ListBox = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
export const ItemWrapper = styled.div`
  width: 20rem;
  background-color: white;
  border-radius: 4px;
  box-shadow: rgb(0 0 0 / 4%) 0px 4px 16px 0px;
  transition: box-shadow 0.25s ease-in 0s, transform 0.25s ease-in 0s;
  margin: 1rem;
  overflow: hidden;
  display: flex;
  flex-direction: column;

  &:hover {
    transform: translateY(-8px);
    box-shadow: rgb(0 0 0 / 8%) 0px 12px 20px 0px;
  }
  ${({ theme }) => theme.main.media.pc1} {
    width: calc(50% - 2rem);
    &:hover {
      transform: translateY(0px);
      box-shadow: rgb(0 0 0 / 8%) 0px 12px 20px 0px;
    }
  }
  ${({ theme }) => theme.main.media.tab1} {
    width: 100%;
    margin: 0px;
    & + & {
      margin-top: 1rem;
    }
  }
`;

export const ImgWrapper = styled.div`
  position: relative;
  width: 100%;
  padding-top: 52%;
`;

export const Img = styled.img`
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 0%;
  padding: 1rem;
`;

export const Title = styled.div`
  font-size: 1rem;
  font-weight: 700;
  margin-bottom: 0.25rem;
  line-height: 1.5;
  word-break: break-word;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  color: rgb(33, 37, 41);
`;

export const Content = styled.p`
  margin: 0px 0px 1.5rem;
  word-break: break-word;
  overflow-wrap: break-word;
  font-size: 0.875rem;
  line-height: 1.5;
  height: 3.9375rem;
  overflow: hidden;
  text-overflow: ellipsis;
  color: rgb(73, 80, 87);
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  display: -webkit-box;
`;

export const Date = styled.div`
  font-size: 0.75rem;
  line-height: 1.5;
  color: rgb(134, 142, 150);
`;

export const Etc = styled.span`
  & + & {
    margin-left: 0.25rem;
  }
`;
