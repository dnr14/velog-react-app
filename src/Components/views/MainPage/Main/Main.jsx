import React, { lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { makeYYMMDD } from '@/utils/dateUtil';
import { htmlRemove, decodeEntities } from '@/utils/editorUtil';
import * as Styled from './style';
import loading from '@/assets/images/loading.gif';

const LazyImage = lazy(() => import('./LazyImage'));

const Main = ({ list }) => {
  const { posts } = list;
  return (
    <main>
      <section>
        <Styled.LayOut>
          <Styled.ListBox>
            {posts.map(
              ({ id, title, body, createdAt, thumbnail, totalResults }) => (
                <Styled.Item key={id}>
                  <Link to={`/post/${id}`}>
                    <Styled.ImgBox>
                      <Suspense fallback={<img src={loading} alt="loading" />}>
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
                      <span>{totalResults}개의 댓글</span>
                    </div>
                  </Styled.ContentBox>
                </Styled.Item>
              )
            )}
          </Styled.ListBox>
        </Styled.LayOut>
      </section>
    </main>
  );
};

export default Main;
