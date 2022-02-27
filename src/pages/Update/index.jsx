import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import Thumb from '@/Components/common/Thumb';
import {
  updateTransientStorageAddAction,
  updateTransientStorageRemoveAction,
} from '@/modules/updateTransientStorage';
import { decodeEntities } from '@/utils/editorUtil.js';
import { newlineCount } from '@/utils/textUtil';
import useResize from '@/hooks/useResize';
import * as posts from '@/api/posts';
import s3Upload from '@/utils/s3Upload';
import Modal from '@/Components/common/Modal';
import Editor from '@/Components/common/Editor';
import Form from '@/Components/common/Form';
import Title from '@/Components/Title';
import Buttons from '@/Components/Buttons';

const KEY_ENUM = {
  enter: 'Enter',
  backspace: 'Backspace',
  comma: 'Comma',
};
const TITLE_MAX_NEW_LINE = 10;
const TITLE_MAX_TEXT = 50;
const TAGS_MAX_COUNT = 7;
const TAGS_MAX_LENGTH = 20;

function UpdatePostPage() {
  const { id } = useParams();
  const disptach = useDispatch();
  const transientStorageState = useSelector(
    ({ updateTransientStorage }) => updateTransientStorage
  );

  const [form, setForm] = useState({});
  const history = useHistory();
  const [isThumbOpen, setIsThumbOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalCloseDelay, setModalCloseDelay] = useState(3000);
  const [modalMessage, setModalMessage] = useState('');
  const { textAreaHeight, textAreaWidth, textareaRef, tagInputRef } =
    useResize();
  const { tags, title, file, body } = form;

  // 타이틀 입력
  const handleChange = useCallback(e => {
    const { id, value } = e.target;
    setForm(prev => {
      if (newlineCount(value) === TITLE_MAX_NEW_LINE) return prev;
      if (value.length === TITLE_MAX_TEXT) return prev;
      return { ...prev, [`${id}`]: value };
    });
  }, []);

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

  // 게시글 등록
  const handleSubmit = useCallback(
    async e => {
      e.preventDefault();
      const { tags = [], title, body, file } = form;
      if (title && body) {
        try {
          // 애초에 파일이 없느 게시글은 undefiend
          // 썸네일이 있지만 제거 undefiend
          // 썸네일은 있지만 수정 x path만 있다.
          let response;
          if (!file) {
            response = await posts.update(id, {
              title,
              body,
              tags: [...tags],
              thumbnail: '',
            });
          } else if (file) {
            if (file.resource) {
              const { resource } = file;
              const { Location } = await s3Upload(resource).promise();
              response = await posts.update(id, {
                title,
                body,
                thumbnail: Location,
                tags: [...tags],
              });
            } else {
              response = await posts.update(id, {
                title,
                body,
                tags: [...tags],
                thumbnail: file.path,
              });
            }
          }

          const { data } = response;
          if (data) {
            setModalCloseDelay(1500);
            setIsModalOpen(true);
            setModalMessage(
              <div className="green">
                <span>게시글이 수정 되었습니다.</span>
              </div>
            );
            disptach(updateTransientStorageRemoveAction(id));
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
    [form, history, id, disptach]
  );

  // 내용 입력
  const ckEditorChange = (_, editor) => {
    const data = editor.getData();
    setForm(prev => ({ ...prev, body: data }));
  };

  // s3 파일 업로드
  const s3Fileupload = async e => {
    const { files } = e.target;
    if (!files) {
      setForm(prev => {
        return Object.entries(prev).reduce(
          (arr, cur) =>
            cur[0] !== 'file'
              ? {
                  ...arr,
                  [`${cur[0]}`]: cur[1],
                }
              : arr,
          {}
        );
      });
    } else if (files.length === 1 && /image\/.*/gi.test(files[0].type)) {
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

  const handleTransientStorage = () => {
    const { tags } = form;
    disptach(
      updateTransientStorageAddAction(id, {
        ...form,
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

  // 게시글 첫 로딩 때 form 데이터 세팅
  useEffect(() => {
    (async () => {
      let result;
      if (transientStorageState[id]) {
        const { title, body, tags, file } = transientStorageState[id];
        const newTags = new Set([...tags]);
        result = {
          title,
          body,
          tags: newTags,
        };
        if (file) {
          result = Object.assign(result, { file });
        }
      } else {
        try {
          const response = await posts.postsById(id);
          const { data } = response;
          const { title, body, tags, thumbnail } = data;
          result = {
            title,
            body: decodeEntities(body),
            tags: new Set([...tags]),
          };
          if (thumbnail) {
            result = Object.assign(result, {
              file: {
                resorce: null,
                path: data.thumbnail,
              },
            });
          }
        } catch (error) {
          setIsModalOpen(true);
          setModalMessage(
            <div className="red">
              <span>서버에서 오류 발생 잠시 후 다시 해주세요.</span>
            </div>
          );
        }
      }
      setForm(result);
    })();
  }, [id, transientStorageState]);

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
    <Form onSubmit={handleSubmit}>
      {isThumbOpen && (
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
      <Title
        ref={[textareaRef, tagInputRef]}
        tags={tags}
        title={title}
        textAreaHeight={textAreaHeight}
        messages={messages}
        handleChange={handleChange}
        tagClick={tagClick}
        handlekeyDown={handlekeyDown}
        handlekeyPress={handlekeyPress}
      />
      <Editor
        onChange={ckEditorChange}
        data={transientStorageState[id] ? transientStorageState[id].body : body}
      />
      <Buttons
        textAreaWidth={textAreaWidth}
        thumbModalOpen={thumbModalOpen}
        handleTransientStorage={handleTransientStorage}
      />
    </Form>
  );
}

export default UpdatePostPage;
