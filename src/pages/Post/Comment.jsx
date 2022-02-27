import React, { useState } from 'react';
import * as Styled from './styles';
import { makeYYMMDD } from '@/utils/dateUtil';
import http from '@/api/http';
import PostButtons from '@/Components/PostButtons';

function Comment({ comment }) {
  const [OpenUpdate, setOpenUpdate] = useState(false);
  const [CommentBody, setCommentBody] = useState(comment.body);

  const deleteCommentHandler = () => http.delete(`/comments/${comment.id}`);

  const openUpdateWindow = () => {
    setCommentBody(comment.body);
    setOpenUpdate(!OpenUpdate);
  };

  const updateCommentHandler = async () => {
    if (CommentBody.length === 0) return;

    await http.patch(`/comments/${comment.id}`, {
      body: CommentBody,
    });
    setOpenUpdate(!OpenUpdate);
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
        <Styled.Form>
          <Styled.TextArea
            placeholder="댓글을 작성하세요"
            value={CommentBody}
            onChange={e => {
              setCommentBody(e.target.value);
            }}
          />
          <PostButtons
            firstText="취소"
            secondText=" 댓글 수정"
            handleCancelClick={openUpdateWindow}
            handleConfirmClick={updateCommentHandler}
          />
        </Styled.Form>
      )}
    </Styled.CommentWrap>
  );
}

export default Comment;
