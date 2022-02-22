import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  insertTransientStorageAddAction,
  insertTransientStorageRemoveAction,
} from '@/modules/insertTransientStorage';
import { newlineCount } from '@/utils/textUtil';
import Write from './Write';
import * as posts from '@/api/posts';
import useResize from '@/hooks/useResize';
import s3Upload from '@/utils/s3Upload';

const KEY_ENUM = {
  enter: 'Enter',
  backspace: 'Backspace',
  comma: 'Comma',
};
const TITLE_MAX_NEW_LINE = 10;
const TITLE_MAX_TEXT = 50;
const TAGS_MAX_COUNT = 7;
const TAGS_MAX_LENGTH = 20;

function InsertPostPage() {
  const history = useHistory();
  const [form, setForm] = useState({});
  const [isThumbOpen, setIsThumbOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalCloseDelay, setModalCloseDelay] = useState(3000);
  const transientStorageState = useSelector(
    ({ insertTransientStorage }) => insertTransientStorage
  );
  const dispatch = useDispatch();
  const [modalMessage, setModalMessage] = useState('');
  const { textAreaHeight, textAreaWidth, textareaRef, tagInputRef } =
    useResize();
  const { tags, title, file, body } = form;

  // 태그 클릭시 제거
  const tagClick = useCallback(
    e => {
      const { textContent } = e.target;
      const { tags } = form;
      if (tags.delete(textContent)) {
        setForm(prev => ({ ...prev, tags: new Set([...tags]) }));
      }
    },
    [form]
  );

  // 태그 쉼표 등록 및 백스페이스 제거
  const handlekeyDown = useCallback(() => {
    let timer;
    return e => {
      const { code, target } = e;
      const { id, value } = target;
      if (code === KEY_ENUM.backspace) {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
          setForm(prev => {
            const { tags } = prev;
            if (tags && tags.size !== 0 && tagInputRef.current.value === '') {
              return {
                ...prev,
                tags: new Set([...tags].slice(0, tags.size - 1)),
              };
            }
            return prev;
          });
        }, 200);
      }

      if (code === KEY_ENUM.comma) {
        // 입력으로 들어온 콤마 무효 시키기
        e.preventDefault();
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
          setForm(prev => {
            if (value === '') return prev;
            if (!prev[`${id}`]) return { ...prev, [`${id}`]: new Set([value]) };
            if (prev[`${id}`].has(value)) return prev;
            if (prev[`${id}`].size === TAGS_MAX_COUNT) return prev;
            if (value.length > TAGS_MAX_LENGTH) return prev;
            const tags = new Set([...prev[`${id}`], value]);
            return { ...prev, [`${id}`]: tags };
          });
          tagInputRef.current.value = '';
        }, 200);
      }
    };
  }, [tagInputRef]);

  // 태그 등록
  const handlekeyPress = useCallback(() => {
    let timer;
    return e => {
      const { code, target } = e;
      if (code === KEY_ENUM.enter) {
        e.preventDefault();
        const { id, value } = target;
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
          setForm(prev => {
            if (value === '') return prev;
            // 첫 등록
            if (!prev[`${id}`]) return { ...prev, [`${id}`]: new Set([value]) };
            // 동일한 내용이 있다면 태그 추가를 안합니다.
            if (prev[`${id}`].has(value)) return prev;
            // 태그 갯수 조절.
            if (prev[`${id}`].size === TAGS_MAX_COUNT) return prev;
            if (value.length > TAGS_MAX_LENGTH) return prev;
            const tags = new Set([...prev[`${id}`], value]);
            return { ...prev, [`${id}`]: tags };
          });
          tagInputRef.current.value = '';
        }, 200);
      }
    };
  }, [tagInputRef]);

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
            path: result,
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

  // 게시글 등록
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
            setModalCloseDelay(1500);
            setIsModalOpen(true);
            setModalMessage(
              <div className="green">
                <span>게시글이 등록 되었습니다.</span>
              </div>
            );
            dispatch(insertTransientStorageRemoveAction());
            setTimeout(() => history.push('/'), 2000);
          }
        } catch (error) {
          setIsModalOpen(true);
          setModalMessage(
            <div className="red">
              <span>서버에서 오류 발생 잠시 후 다시 해주세요.</span>
            </div>
          );
        }
      } else {
        setIsModalOpen(true);
        setModalMessage(
          <div className="red">
            <span>타이틀, 내용은 필수 입니다.</span>
          </div>
        );
      }
    },
    [form, history, dispatch]
  );
  // 임시 등록
  const handleTransientStorage = () => {
    dispatch(
      insertTransientStorageAddAction({
        title,
        body,
        tags: [...tags],
      })
    );
    setModalMessage(
      <div className="green">
        <span>임시등록 되었습니다.</span>
      </div>
    );
    setIsModalOpen(true);
  };

  // 썸네일 모달 오픈
  const thumbModalOpen = () => setIsThumbOpen(true);

  // 뒤로가기
  const goBack = useCallback(() => history.goBack(), [history]);

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

  // 임시저장하고 다시 새로 등록 들어왔을때 form 초기화
  useEffect(() => {
    if (transientStorageState.data) {
      const { data } = transientStorageState;
      setForm(prev => ({
        ...prev,
        ...data,
        tags: new Set([...data.tags]),
      }));
    }
  }, [transientStorageState]);

  return (
    <>
      <Write onSubmit={handleSubmit}>
        {/* {isThumbOpen && (
          <Thumb
            file={file}
            isOpen={isThumbOpen}
            setIsOpen={setIsThumbOpen}
            s3Fileupload={s3Fileupload}
          />
        )}
        {isModalOpen && (
          <Modal
            isOpen={isModalOpen}
            setIsOpen={setIsModalOpen}
            closeDelay={modalCloseDelay}
          >
            {modalMessage}
          </Modal>
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
                <Styled.Tag key={idx} onClick={tagClick}>
                  {tag}
                </Styled.Tag>
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

            <Styled.InputMessage>
              {tags && tags.size === 7 ? messages[1] : messages[0]}
            </Styled.InputMessage>
          </Styled.TagBox>
        </Styled.Title>
        <Styled.Body>
          <Editor
            onChange={ckEditorChange}
            data={transientStorageState.data.body}
          />
        </Styled.Body>
        <Styled.ButtonBox
          style={{ width: textAreaWidth > 767 ? `${textAreaWidth}px` : `auto` }}
        >
          <div>
            <Styled.Button type="button" onClick={goBack}>
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
              <Styled.Button
                type="button"
                color="lightGray"
                onClick={handleTransientStorage}
              >
                임시저장
              </Styled.Button>
              <Styled.Button
                type="button"
                color="teal"
                onClick={thumbModalOpen}
              >
                출간하기
              </Styled.Button>
            </div>
          </div>
        </Styled.ButtonBox> */}
      </Write>
    </>
  );
}

export default InsertPostPage;
