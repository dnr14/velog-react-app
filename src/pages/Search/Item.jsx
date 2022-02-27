import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import * as Styled from './style';
import { htmlRemove } from '@/utils/editorUtil';
import { makeYYMMDD } from '@/utils/dateUtil';

const Item = ({ id, body, title, createdAt, commentsTotalResults }) => {
  return (
    <Styled.ItemWrapper key={id}>
      <Link to={`/post/${id}`}>
        <h2>{title}</h2>
      </Link>
      <p>{htmlRemove(body)}</p>
      <div className="subinfo">
        <span>{makeYYMMDD(createdAt)}</span>
        <div className="separator">·</div>
        {commentsTotalResults}개의 댓글
      </div>
    </Styled.ItemWrapper>
  );
};

export default memo(Item);
