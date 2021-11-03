import React from 'react';
import { Link } from 'react-router-dom';
import { makeYYMMDD } from '@/utils/dateUtil';
import sample from '@/assets/images/sample.gif';
import * as Styled from './style';

const Main = ({ list }) => {
  return (
    <main>
      <section>
        <Styled.LayOut>
          <Styled.ListBox>
            {list &&
              list.map(({ id, title, body, createdAt }) => (
                <Styled.Item key={id}>
                  <Link to={`/post/${id}`}>
                    <Styled.ImgBox>
                      {/* 썸네일  이미지 */}
                      <img src={sample} alt="sample" />
                    </Styled.ImgBox>
                  </Link>
                  <Styled.ContentBox>
                    <Link to={`/post/${id}`}>
                      <h4>{title}</h4>
                      <div>
                        <p>{body}</p>
                      </div>
                    </Link>
                    <div>
                      <span>{makeYYMMDD(new Date(createdAt))}</span>
                      <span>·</span>
                      <span>14개의 댓글</span>
                    </div>
                  </Styled.ContentBox>
                </Styled.Item>
              ))}
          </Styled.ListBox>
        </Styled.LayOut>
      </section>
    </main>
  );
};

export default Main;
