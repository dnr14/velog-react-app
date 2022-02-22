import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import * as Styled from './styles';
import { makeYYMMDD } from '@/utils/dateUtil';
import { htmlRemove, decodeEntities } from '@/utils/editorUtil';
import noThumbnail from '@/assets/images/noThumbnail.jpg';

const Item = ({
  id,
  title,
  body,
  createdAt,
  thumbnail,
  commentsTotalResults,
}) => {
  return (
    <Styled.ItemWrapper>
      <Path id={id}>
        <Styled.ImgWrapper>
          <Styled.Img
            src={thumbnail ? thumbnail : noThumbnail}
            alt={thumbnail ? 'thumbnail' : 'noThumbnail'}
          />
        </Styled.ImgWrapper>
      </Path>
      <Styled.ContentWrapper>
        <Path id={id}>
          <Styled.Title>{decodeEntities(title)}</Styled.Title>
          <Styled.Content>{htmlRemove(body)}</Styled.Content>
        </Path>
        <Styled.Date>
          <Styled.Etc>{makeYYMMDD(createdAt)}</Styled.Etc>
          <Styled.Etc>·</Styled.Etc>
          <Styled.Etc>{commentsTotalResults}개의 댓글</Styled.Etc>
        </Styled.Date>
      </Styled.ContentWrapper>
    </Styled.ItemWrapper>
  );
};

function Path({ children, id }) {
  const path = `/post/${id}`;
  return <Link to={path}>{children}</Link>;
}

export default memo(Item);
