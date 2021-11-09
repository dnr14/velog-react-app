import React, { lazy, memo, Suspense } from 'react';
import { Link } from 'react-router-dom';
import * as Styled from '@/Components/views/MainPage/Main/style';
import { makeYYMMDD } from '@/utils/dateUtil';
import { htmlRemove, decodeEntities } from '@/utils/editorUtil';
import lazyLoading from '@/assets/images/lazyLoading.gif';

const LazyImage = lazy(() => import('./LazyImage'));

const Item = ({
  id,
  title,
  body,
  createdAt,
  thumbnail,
  commentsTotalResults,
}) => {
  return (
    <Styled.Item>
      <Link to={`/post/${id}`}>
        <Styled.ImgBox>
          <Suspense fallback={<img src={lazyLoading} alt="lazyLoading" />}>
            <LazyImage thumbnail={thumbnail} />
          </Suspense>
        </Styled.ImgBox>
      </Link>
      <Styled.ContentBox>
        <Link to={`/post/${id}`}>
          <h4>{decodeEntities(title)}</h4>
          <div>
            <p>{htmlRemove(body)}</p>
          </div>
        </Link>
        <div>
          <span>{makeYYMMDD(createdAt)}</span>
          <span>·</span>
          <span>{commentsTotalResults}개의 댓글</span>
        </div>
      </Styled.ContentBox>
    </Styled.Item>
  );
};

export default memo(Item);
