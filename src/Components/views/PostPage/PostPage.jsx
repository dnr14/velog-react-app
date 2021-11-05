import React, { useState, useEffect } from 'react';
import { useParams, withRouter } from 'react-router-dom';
import * as Styled from './style';
import { makeYYMMDD } from '@/utils/dateUtil';
import instance from '@/api/http';
import Commnet from './Comment/Comment';
import PostModal from './PostModal/PostModal';

function PostPage(props) {
  const [OpenModal, setOpenModal] = useState(false);
  const [Post, setPost] = useState();
  const [Comments, setComments] = useState([]);
  const [InputComment, setInputComment] = useState('');
  const { id } = useParams();

  useEffect(() => {
    instance.get(`/posts/${id}`).then(res => {
      setPost(res.data);
    });

    instance.get('/comments', { params: { limit: 10000 } }).then(res => {
      const arr = res.data.results.filter(data => data.postId === id);
      setComments(arr);
      console.log(res.data);
    });
  }, []);

  // Delete Post
  const deletePostHandler = () => {
    instance.delete(`/posts/${id}`).then(() => {
      const promises = Comments.map(comment =>
        instance.delete(`/comments/${comment.id}`)
      );
      Promise.all(promises).then(values => {
        props.history.push('/');
        console.log(values);
      });
    });
  };

  // Update Post
  const updatePostHandeler = () => {
    props.history.push(`/update/${Post.id}`);
  };

  // Insert Comment
  const insertCommentHander = () => {
    if (InputComment.length === 0) return;

    const variable = {
      postId: id,
      body: InputComment,
    };

    // 댓글 생성 후 Comments state 갱신
    instance.post('/comments', variable).then(res => {
      setComments(Comments.concat(res.data));
      setInputComment('');
    });
  };

  const postCommentStyle = {
    borderTop: '1px solid rgb(219, 219, 219)',
    marginTop: '50px',
    paddingTop: '50px',
  };

  // 댓글 삭제 후 Comments state 갱신
  const deleteComment = deleteCommentId => {
    const idx = Comments.findIndex(data => data.id === deleteCommentId);
    const newArr = [...Comments];
    newArr.splice(idx, 1);
    setComments(newArr);
  };

  const setOpenModalHandler = () => {
    setOpenModal(!OpenModal);
  };

  return (
    <>
      {OpenModal && (
        <PostModal
          setOpenModalHandler={setOpenModalHandler}
          confirmEvent={deletePostHandler}
        />
      )}
      <div
        className="postPage"
        style={{ width: '80vw', height: '100%', padding: '10%' }}
      >
        {Post ? (
          <div className="post">
            <div className="postHeader" style={{ marginBottom: '40px' }}>
              <Styled.PostTitle>{Post.title}</Styled.PostTitle>
              <div
                className="postInfo"
                style={{ display: 'flex', justifyContent: 'space-between' }}
              >
                <Styled.PostDate>
                  {makeYYMMDD(new Date(Post.createdAt))}
                </Styled.PostDate>
                <Styled.PostManage>
                  <span onClick={updatePostHandeler}>수정</span>
                  <span onClick={setOpenModalHandler}>삭제</span>
                </Styled.PostManage>
              </div>
              <div
                className="tags"
                style={{ display: 'flex', gap: '14px', marginTop: '14px' }}
              >
                {Post.tags.map((tag, idx) => (
                  <Styled.Tag key={idx}>{tag}</Styled.Tag>
                ))}
              </div>
            </div>
            <div className="postBody">
              <Styled.PostContent>
                <p style={{ lineHeight: '1.5' }}>
                  {Post.body.split('\n').map((line, idx) => (
                    <span key={idx}>
                      {line}
                      <br />
                    </span>
                  ))}
                </p>
              </Styled.PostContent>
            </div>
            <div className="postComments" style={postCommentStyle}>
              <h4 style={{ margin: `24px 0 16px 0` }}>
                {Comments.length}개의 댓글
              </h4>
              <Styled.Form onSubmit={insertCommentHander}>
                <Styled.TextArea
                  placeholder="댓글을 작성하세요"
                  value={InputComment}
                  onChange={e => {
                    setInputComment(e.target.value);
                  }}
                />
                <Styled.ButtonWrap>
                  <button
                    type="button"
                    className="insertBtn"
                    onClick={insertCommentHander}
                  >
                    댓글 작성
                  </button>
                </Styled.ButtonWrap>
              </Styled.Form>
              <div className="comments">
                {Comments.map((comment, idx) => (
                  <Commnet
                    key={idx}
                    comment={comment}
                    deleteComment={deleteComment}
                  />
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div>포스트를 불러올 수 없습니다.</div>
        )}
      </div>
    </>
  );
}

export default withRouter(PostPage);
