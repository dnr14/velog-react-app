import React, { forwardRef } from 'react';
import styled from 'styled-components';
import { newlineCount } from '@/utils/textUtil';
import {
  getBrandColor1,
  getWhiteColor1,
  getDarkColor2,
  tab1,
  getDarkColor1,
  getDarkColor5,
  getWhiteColor2,
} from '@/assets/style/theme';

const Title = (
  {
    tags,
    title,
    handleChange,
    textAreaHeight,
    tagClick,
    handlekeyDown,
    handlekeyPress,
    messages,
  },
  [textareaRef, tagInputRef]
) => {
  return (
    <TitleWrapper>
      <textarea
        id="title"
        ref={textareaRef}
        value={title}
        onChange={handleChange}
        placeholder="제목을 입력하세요."
        style={{
          height: `${newlineCount(title) * textAreaHeight}px`,
        }}
      />
      <Line />
      <TagBox>
        {tags &&
          [...tags].map((tag, idx) => (
            <Tag key={idx} onClick={tagClick}>
              {tag}
            </Tag>
          ))}
        <input
          type="text"
          id="tags"
          placeholder="태그를 입력해주세요."
          ref={tagInputRef}
          autoComplete="off"
          onKeyDown={handlekeyDown()}
          onKeyPress={handlekeyPress()}
        />

        <InputMessage>
          {tags && tags.size === 7 ? messages[1] : messages[0]}
        </InputMessage>
      </TagBox>
    </TitleWrapper>
  );
};

const TitleWrapper = styled.div`
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
    color: ${getDarkColor1};
    overflow-y: hidden;
    &::placeholder {
      color: rgba(33, 37, 41, 0.5);
    }

    ${tab1} {
      font-size: 1.8rem;
    }
  }

  ${tab1} {
    padding: 1rem;
  }
`;
const Line = styled.div`
  background: ${getDarkColor5};
  height: 6px;
  width: 4rem;
  margin-top: 1.5rem;
  margin-bottom: 1rem;
  border-radius: 1px;
  ${tab1} {
    margin-top: 1rem;
    margin-bottom: 0.66rem;
  }
`;

const TagBox = styled.div`
  color: ${getDarkColor2};
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
    ${tab1} {
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

const Tag = styled.div`
  font-size: 1rem;
  display: inline-flex;
  -webkit-box-align: center;
  align-items: center;
  height: 2rem;
  border-radius: 1rem;
  padding-left: 1rem;
  padding-right: 1rem;
  background: ${getWhiteColor1};
  color: ${getBrandColor1};
  margin-right: 0.75rem;
  transition: all 0.125s ease-in 0s;
  cursor: pointer;
  margin-bottom: 0.75rem;
  animation: 0.125s ease-in-out 0s 1 normal forwards running iMKika;
  ${tab1} {
    height: 1.5rem;
    font-size: 0.75rem;
    border-radius: 0.75rem;
    padding-left: 0.75rem;
    padding-right: 0.75rem;
    margin-right: 0.5rem;
    margin-bottom: 0.5rem;
  }
`;

const InputMessage = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  gap: 2px;
  width: 330px;
  background: rgba(73, 80, 87, 1);
  padding: 0.7rem 1rem;
  color: ${getWhiteColor2};
  line-height: 1.5;
  font-size: 0.8rem;
  z-index: -1;
  top: 100%;
  transition: opacity 0.5s, z-index 0.5s, transform 0.35s ease-in;
  opacity: 0;
  transform: translateY(-30px);
  ${tab1} {
    width: 55%;
  }
`;

export default forwardRef(Title);
