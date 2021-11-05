import React, { useState } from 'react';
import axios from 'axios';
import * as Styled from '../style';
import { makeYYMMDD } from '@/utils/dateUtil';
import instance from '@/api/http';

function Comment(props) {
  const { comment } = props;
  const [OpenUpdate, setOpenUpdate] = useState(false);
  const [CommentBody, setCommentBody] = useState(comment.body);

  const deleteCommentHandler = () => {
    instance.delete(`/comments/${comment.id}`).then(() => {
      props.deleteComment(comment.id);
    });
  };

  const openUpdateWindow = () => {
    setCommentBody(comment.body);
    setOpenUpdate(!OpenUpdate);
  };

  const updateCommentHandler = () => {
    if (CommentBody.length === 0) return;

    const variable = {
      body: CommentBody,
    };

    instance.patch(`/comments/${comment.id}`, variable).then(() => {
      setOpenUpdate(!OpenUpdate);
    });
  };

  return (
    <Styled.CommentWrap>
      <Styled.CommentInfo>
        <span>{makeYYMMDD(comment.createdAt)}</span>
        {!OpenUpdate && (
          <Styled.CommentManage>
            <span onClick={openUpdateWindow}>수정</span>
            <span onClick={deleteCommentHandler}>삭제</span>
          </Styled.CommentManage>
        )}
      </Styled.CommentInfo>
      {!OpenUpdate ? (
        <p style={{ margin: '18px 0', fontSize: '1.1rem' }}>{CommentBody}</p>
      ) : (
        <Styled.Form style={{ marginTop: '30px' }}>
          <Styled.TextArea
            placeholder="댓글을 작성하세요"
            value={CommentBody}
            onChange={e => {
              setCommentBody(e.target.value);
            }}
          />
          <Styled.ButtonWrap>
            <button
              type="button"
              className="cancelBtn"
              onClick={openUpdateWindow}
            >
              취소
            </button>
            <button
              type="button"
              className="insertBtn"
              onClick={updateCommentHandler}
            >
              댓글 수정
            </button>
          </Styled.ButtonWrap>
        </Styled.Form>
      )}
    </Styled.CommentWrap>
  );
}

export default Comment;
