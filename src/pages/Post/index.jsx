import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useHistory, useParams } from 'react-router-dom';
import * as Styled from './styles';
import { makeYYMMDD } from '@/utils/dateUtil';
import http from '@/api/http';
import Commnet from './Comment';
import PostModal from './PostModal';
import { decodeEntities } from '@/utils/editorUtil';
import { postsInfo, getCommetns } from '@/api/posts';
import PostButtons from '@/Components/PostButtons';

function PostPage() {
  const [openModal, setOpenModal] = useState(false);
  const [post, setPost] = useState();
  const [comments, setComments] = useState([]);
  const [inputComment, setInputComment] = useState('');
  const [commentFlag, setCommentFlag] = useState(false);
  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    postsInfo(id).then(({ data }) => setPost(data));
    getCommetns(id).then(({ data }) => {
      const arr = data.results.filter(({ postId }) => postId === id);
      setComments(arr);
    });
  }, [id]);

  // Delete post
  const deletePostHandler = () => {
    http.delete(`/posts/${id}`).then(() => {
      const promises = comments.map(comment =>
        http.delete(`/comments/${comment.id}`)
      );
      Promise.all(promises).then(() => {
        history.push('/');
      });
    });
  };

  // Update post
  const updatePostHandeler = () => {
    history.push(`/update/${post.id}`);
  };

  // Insert Comment
  const insertCommentHander = () => {
    if (inputComment.length === 0 || commentFlag === true) return;

    setCommentFlag(true);

    const variable = {
      postId: id,
      body: inputComment,
    };

    // 댓글 생성 후 comments state 갱신
    http.post('/comments', variable).then(res => {
      setComments(comments.concat(res.data));
      setInputComment('');
      setCommentFlag(false);
    });
  };

  const handleOnChange = e => setInputComment(e.target.value);
  const setOpenModalHandler = () => setOpenModal(!openModal);

  return (
    <>
      <PostModal
        openModal={openModal}
        setOpenModalHandler={setOpenModalHandler}
        confirmEvent={deletePostHandler}
      />
      <Styled.PostWrapper>
        {post ? (
          <div>
            <Styled.PostHeader>
              <Styled.PostTitle>{decodeEntities(post.title)}</Styled.PostTitle>
              <Styled.PostInfo>
                <Styled.PostDate>
                  {makeYYMMDD(new Date(post.createdAt))}
                </Styled.PostDate>
                <Styled.PostManage>
                  <span onClick={updatePostHandeler}>수정</span>
                  <span onClick={setOpenModalHandler}>삭제</span>
                </Styled.PostManage>
              </Styled.PostInfo>
              <Styled.PostTags>
                {post.tags.map((tag, idx) => (
                  <Styled.Tag key={idx}>{tag}</Styled.Tag>
                ))}
              </Styled.PostTags>
            </Styled.PostHeader>
            <div>
              <Styled.PostContent>
                {/* ck-content를 넣어줘야 root에 설정된 css가 적용된다. */}
                <CKContent
                  className="ck-content"
                  dangerouslySetInnerHTML={{
                    __html: decodeEntities(post.body),
                  }}
                />
              </Styled.PostContent>
            </div>

            <Styled.PostComments>
              <Styled.CommentsTitle>
                {comments.length}개의 댓글
              </Styled.CommentsTitle>
              <Styled.Form onSubmit={insertCommentHander}>
                <Styled.TextArea
                  placeholder="댓글을 작성하세요"
                  value={inputComment}
                  onChange={handleOnChange}
                />
                <PostButtons
                  size={1}
                  firstText="댓글작성"
                  handleConfirmClick={insertCommentHander}
                />
              </Styled.Form>
              {comments.map((comment, idx) => (
                <Commnet key={idx} comment={comment} />
              ))}
            </Styled.PostComments>
          </div>
        ) : (
          <div>포스트를 불러올 수 없습니다.</div>
        )}
      </Styled.PostWrapper>
    </>
  );
}

const CKContent = styled.div`
  word-break: break-all;
  &::after {
    content: '';
    clear: both;
    display: block;
  }
`;

export default PostPage;
