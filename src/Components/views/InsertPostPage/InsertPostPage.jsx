import React, { useLayoutEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { newlineCount } from '@/utils/TextUtil';
import Write from './Write/Write';
import * as Styled from './Write/style';
import * as posts from '@/api/posts';

const KEY_ENUM = {
  enter: 'Enter',
};

function InsertPostPage() {
  const history = useHistory();
  const [form, setForm] = useState({});
  const [textAreaHeight, setTextAreaHeight] = useState(0);
  const [textAreaWidth, setTextAreaWidth] = useState(0);
  const textareaRef = useRef(null);
  const inputRef = useRef(null);
  const { tags, title, body } = form;

  const handlekeyPress = e => {
    const { code, target } = e;
    if (code === KEY_ENUM.enter && target.id === 'tags') {
      e.preventDefault();
      const { id, value } = target;
      inputRef.current.value = '';
      if (value !== '') {
        setForm(prev => {
          if (prev[`${id}`]?.has(value)) return prev;
          return {
            ...prev,
            [`${id}`]: prev[`${id}`]
              ? new Set([...prev[`${id}`], value])
              : new Set([value]),
          };
        });
      }
    }
  };
  const handleChange = e => {
    const { id, value } = e.target;
    if (id !== 'tags') {
      setForm(prev => ({
        ...prev,
        [`${id}`]: value,
      }));
    }
  };
  const handleSubmit = e => {
    e.preventDefault();
    const { tags = [], title, body } = form;
    if (title && body) {
      (async () => {
        try {
          const response = await posts.insert({
            title,
            body,
            tags: [...tags],
          });
          const { data } = response;
          if (data) {
            history.push('/');
          }
        } catch (error) {
          alert('서버에러');
        }
      })();
    } else {
      alert('타이틀 태그 내용을 입력해주세요.');
    }
  };

  useLayoutEffect(() => {
    let timer;
    let eventHandler;
    const throttling = (cb, delay) => {
      eventHandler = () => {
        if (timer) return;
        timer = setTimeout(() => {
          cb();
          timer = null;
        }, delay);
      };
      return eventHandler;
    };

    function resize() {
      const currentH = window.innerWidth > 767 ? 66 : 43;
      setTextAreaWidth(textareaRef.current.clientWidth);
      setTextAreaHeight(currentH);
    }
    resize();
    window.addEventListener('resize', throttling(resize, 200));
    return () => window.removeEventListener('resize', eventHandler);
  }, []);

  return (
    <Write
      onChange={handleChange}
      onSubmit={handleSubmit}
      onKeyPress={handlekeyPress}
    >
      <Styled.Title>
        <textarea
          ref={textareaRef}
          id="title"
          value={title}
          placeholder="제목을 입력하세요."
          style={{
            height: `${newlineCount(title) * textAreaHeight}px`,
          }}
        />
        <Styled.Line />
        <Styled.TagBox>
          {tags &&
            [...tags].map((tag, idx) => (
              <Styled.Tag key={idx}>{tag}</Styled.Tag>
            ))}
          <input
            type="text"
            id="tags"
            placeholder="태그를 입력해주세요."
            ref={inputRef}
          />
        </Styled.TagBox>
      </Styled.Title>
      <Styled.Body>
        <textarea
          id="body"
          placeholder="당신이 이야기를 적어주세요."
          value={body}
          style={{
            height: `${newlineCount(body) * textAreaHeight}px`,
          }}
        />
      </Styled.Body>
      <Styled.ButtonBox
        style={{ width: textAreaWidth > 767 ? `${textAreaWidth}px` : `auto` }}
      >
        <div>
          <Styled.Button type="button">
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 24 24"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
            </svg>
            나가기
          </Styled.Button>
          <div>
            <Styled.Button type="button" color="lightGray">
              임시저장
            </Styled.Button>
            <Styled.Button type="submit" color="teal">
              출간하기
            </Styled.Button>
          </div>
        </div>
      </Styled.ButtonBox>
    </Write>
  );
}

export default InsertPostPage;
