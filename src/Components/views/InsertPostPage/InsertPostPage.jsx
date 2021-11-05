import React, {
  useCallback,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useHistory } from 'react-router-dom';
import { newlineCount } from '@/utils/textUtil';
import Write from './Write/Write';
import * as Styled from './Write/style';
import * as posts from '@/api/posts';
import CoustomEditor from './Editor/CoustomEditor';
import Thumb from './Thumb/Thumb';
import s3Upload from '@/utils/s3Upload';

const KEY_ENUM = {
  enter: 'Enter',
};
const TITLE_MAX_NEW_LINE = 5;
const TITLE_MAX_TEXT = 30;
const TAGS_MAX_COUNT = 7;

function InsertPostPage() {
  const history = useHistory();
  const [form, setForm] = useState({});
  const [textAreaHeight, setTextAreaHeight] = useState(0);
  const [textAreaWidth, setTextAreaWidth] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const textareaRef = useRef(null);
  const tagInputRef = useRef(null);
  const { tags, title, file } = form;

  // 태그 제거
  const tagRemove = e => {
    const { textContent } = e.target;
    const { tags } = form;
    if (tags.delete(textContent)) {
      setForm(prev => ({ ...prev, tags: new Set([...tags]) }));
    }
  };

  // 태그 등록
  const handlekeyPress = useCallback(e => {
    const { code, target } = e;
    if (code === KEY_ENUM.enter && target.id === 'tags') {
      e.preventDefault();
      const { id, value } = target;
      setForm(prev => {
        if (value === '') return prev;
        // 첫 등록
        if (!prev[`${id}`]) return { ...prev, [`${id}`]: new Set([value]) };
        // 동일한 내용이 있다면 태그 추가를 안합니다.
        if (prev[`${id}`].has(value)) return prev;
        // 태그 갯수 조절.
        if (prev[`${id}`].size === TAGS_MAX_COUNT) return prev;
        const tags = new Set([...prev[`${id}`], value]);
        return { ...prev, [`${id}`]: tags };
      });
      tagInputRef.current.value = '';
    }
  }, []);

  // 타이틀 입력
  const handleChange = useCallback(e => {
    const { id, value } = e.target;
    setForm(prev => {
      if (newlineCount(value) === TITLE_MAX_NEW_LINE) return prev;
      if (value.length === TITLE_MAX_TEXT) return prev;
      return { ...prev, [`${id}`]: value };
    });
  }, []);

  // 내용 입력
  const ckEditorChange = (_, editor) => {
    const data = editor.getData();
    setForm(prev => {
      const { body } = prev;
      if (!body) return { ...prev, body: data };
      return { ...prev, body: data };
    });
  };

  // s3 파일 업로드
  const s3Fileupload = async e => {
    const { files } = e.target;
    if (!files) {
      setForm(prev => ({
        ...prev,
        file: null,
      }));
      return;
    }
    if (files.length === 1 && /image\/.*/gi.test(files[0].type)) {
      const file = files[0];
      const toBase64 = file =>
        new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result);
          reader.onerror = error => reject(error);
        });

      try {
        const result = await toBase64(file);
        setForm(prev => ({
          ...prev,
          file: {
            resource: file,
            base64: result,
          },
        }));
      } catch (error) {
        setForm(prev => ({
          ...prev,
          file: null,
        }));
      }
    }
  };

  const handleSubmit = useCallback(
    async e => {
      e.preventDefault();
      const { tags = [], title, body, file } = form;
      if (title && body) {
        try {
          let thumbnail = '';
          if (file) {
            const { resource } = file;
            const { Location } = await s3Upload(resource).promise();
            thumbnail = Location;
          }
          const response = await posts.insert({
            title,
            body,
            thumbnail,
            tags: [...tags],
          });
          const { data } = response;
          if (data) {
            history.push('/');
          }
        } catch (error) {
          alert('서버에러');
          throw error;
        }
      } else {
        alert('타이틀 내용을 입력해주세요.');
      }
    },
    [form, history]
  );

  // 썸네일 모달 오픈
  const thumbModalOpne = () => setIsOpen(true);

  // 리사이즈
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

  const messages = useMemo(
    () => [
      <>
        <span>쉼표 혹은 엔터를 입력하여 태그를 등록 할 수 있습니다.</span>
        <span>등록된 태그를 클릭하면 삭제됩니다.</span>
      </>,
      <>
        <span>태그는 최대 {TAGS_MAX_COUNT}개 까지 등록 가능합니다.</span>
      </>,
    ],
    []
  );

  return (
    <>
      <Write onSubmit={handleSubmit} onKeyPress={handlekeyPress}>
        {isOpen && (
          <Thumb
            file={file}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            s3Fileupload={s3Fileupload}
          />
        )}
        <Styled.Title>
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
          <Styled.Line />
          <Styled.TagBox>
            {tags &&
              [...tags].map((tag, idx) => (
                <Styled.Tag key={idx} onClick={tagRemove}>
                  {tag}
                </Styled.Tag>
              ))}
            <input
              type="text"
              id="tags"
              placeholder="태그를 입력해주세요."
              ref={tagInputRef}
              autoComplete="off"
            />

            <Styled.InputMessage>
              {tags && tags.size === 7 ? messages[1] : messages[0]}
            </Styled.InputMessage>
          </Styled.TagBox>
        </Styled.Title>
        <Styled.Body>
          <CoustomEditor onChange={ckEditorChange} />
        </Styled.Body>
        <Styled.ButtonBox
          style={{ width: textAreaWidth > 767 ? `${textAreaWidth}px` : `auto` }}
        >
          <div>
            <Styled.Button type="button" onClick={() => history.goBack()}>
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
              <Styled.Button
                type="button"
                color="teal"
                onClick={thumbModalOpne}
              >
                출간하기
              </Styled.Button>
            </div>
          </div>
        </Styled.ButtonBox>
      </Write>
    </>
  );
}

export default InsertPostPage;
