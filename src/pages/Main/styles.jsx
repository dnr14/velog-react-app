import styled from 'styled-components';
import {
  getDarkColor1,
  getBrandColor1,
  getWhiteColor1,
  getWhiteColor2,
  getDarkColor2,
  getDarkColor4,
  getDarkColor5,
  tab1,
  tab2,
  pc1,
  getDarkColor3,
} from '@/assets/style/theme';

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
      color: ${getDarkColor4};
      height: 3rem;
      transition: color 0.5s ease-in, font-weight 0.5s ease-in;
      & > svg {
        font-size: 1.5rem;
        margin-right: 0.5rem;
      }
      &.active {
        color: ${getDarkColor2};
        font-weight: bold;
      }
      ${tab2} {
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
      background-color: ${getDarkColor3};
      width: 50%;
      transition: transform 0.25s ease-in;
      &.active {
        transform: translateX(100%);
      }
    }

    ${tab2} {
      width: 10rem;
    }
  }
`;

export const SelectBox = styled.div`
  display: flex;
  background: ${getWhiteColor2};
  height: 2rem;
  width: 5rem;
  border-radius: 4px;
  justify-content: space-between;
  align-items: center;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  font-weight: 600;
  color: ${getDarkColor5};
  font-size: 0.875rem;
  box-shadow: rgb(0 0 0 / 5%) 0px 0px 4px;
  cursor: pointer;

  & > svg {
    width: 1.5rem;
    height: 1.5rem;
  }

  ${pc1} {
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
    border-top: 1px solid ${getWhiteColor1};
  }
  li:hover {
    background: ${getWhiteColor2};
    color: ${getBrandColor1};
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
    color: ${getDarkColor4};
  }
`;

export const ListWrapper = styled.div`
  margin: -1rem;
  & > div {
    display: flex;
    flex-wrap: wrap;
  }
  ${tab1} {
    margin: 0px;
  }
`;

export const ItemWrapper = styled.div`
  width: 20rem;
  background-color: ${getWhiteColor2};
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
  ${pc1} {
    width: calc(50% - 2rem);
    &:hover {
      transform: translateY(0px);
      box-shadow: rgb(0 0 0 / 8%) 0px 12px 20px 0px;
    }
  }
  ${tab1} {
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
  color: ${getDarkColor1};
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
  color: ${getDarkColor5};
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  display: -webkit-box;
`;

export const Date = styled.div`
  font-size: 0.75rem;
  line-height: 1.5;
  color: ${getDarkColor4};
`;

export const Etc = styled.span`
  & + & {
    margin-left: 0.25rem;
  }
`;
