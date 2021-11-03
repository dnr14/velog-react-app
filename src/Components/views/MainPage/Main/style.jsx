import styled from 'styled-components';

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
export const Item = styled.div`
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

export const ImgBox = styled.div`
  position: relative;
  width: 100%;
  padding-top: 52%;
  & > img {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    display: block;
    object-fit: cover;
  }
`;

export const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 0%;
  padding: 1rem;

  h4 {
    font-size: 1rem;
    font-weight: 700;
    margin-bottom: 0.25rem;
    line-height: 1.5;
    word-break: break-word;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    color: rgb(33, 37, 41);
  }

  p {
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
  }

  & > div:last-child {
    font-size: 0.75rem;
    line-height: 1.5;
    color: rgb(134, 142, 150);

    & > span:nth-child(2) {
      margin-left: 0.25rem;
      margin-right: 0.25rem;
    }
  }
`;
