import React, { useState } from 'react';
import * as Styled from './style';
import { makeYYMMDD } from '@/utils/dateUtil';
import instance from '@/api/http';

function Comment(props) {
  const { comment } = props;
  const deleteCommentHandler = () => {
    instance.delete(`/comments/${comment.id}`).then(() => {
      props.deleteComment(comment.id);
    });
  };

  return (
    <Styled.CommentWrap>
      <Styled.CommentInfo>
        <span>{makeYYMMDD(comment.createdAt)}</span>
        <Styled.CommentManage>
          <span>수정</span>
          <span onClick={deleteCommentHandler}>삭제</span>
        </Styled.CommentManage>
      </Styled.CommentInfo>
      <p style={{ margin: '18px 0', fontSize: '1.1rem' }}>{comment.body}</p>
    </Styled.CommentWrap>
  );
}

export default Comment;
