import axios from 'axios';
import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router';
import styled from 'styled-components';

function PostPage() {

    const [Post, setPost] = useState();
    let postDate;
    let testContent = "안녕하세요\n 저는 이번에\n새로가입한\n사람입니다."
    // const {id} = useParams();

    // useEffect(() => {
    //     axios.get(`https://limitless-sierra-67996.herokuapp.com/v1/${id}`)
    //     .then(res => {
    //             setPost(res.data);
    //         }
    //     )
    // }, [])
    
    //Import post
    useEffect(() => {
        axios.get('https://limitless-sierra-67996.herokuapp.com/v1/posts')
        .then(res => {
            setPost(res.data.results[0]);
        }
        )
    }, [])
    
    if(Post){
        const date = Post.createdAt;
        postDate = date.substring(0,4) + "년 " + date.substring(5,7) + "월 " + date.substring(8,10) + "일";
    }

    const PostTitle = styled.h1`
        font-size:3.5rem;
        font-weight:800;
        margin-bottom:32px;
    `;

    const PostDate = styled.span`
        color:#495057;
    `;

    const PostManage = styled.div`

        display:flex;
        gap:10px;

        span{
            color:gray;
            cursor:pointer;

            &:hover{
                color:black;
            }
        }
    `;

    const Tag = styled.span`
        padding:0 14px;
        color:#08A678;
        font-weight:500;
        background-color:rgb(235, 235, 235);
        border-radius:15px;
        padding:5px 16px;
        cursor:pointer;

        &:hover{
            background-color:#F8F9FA;
        }
    `;

    const PostContent = styled.div`
        font-size:1.2rem;

        p{
            display:flex;
            flex-direction:column;
        }
    `;

    //Delete Post
    const deletePostHandler = () => {

    }

    //Update Post
    const updatePostHandeler = () => {

    }

    return (
        <div className="postPage" style={{width:'80vw',height:'100%', padding:'10%'}}>
            {Post ?
                <div className="post">
                    <div className="postHeader" style={{marginBottom:'40px'}}>
                        <PostTitle>{Post.title}</PostTitle>
                        <div className="postInfo" style={{display:'flex',justifyContent:'space-between'}}>
                            <PostDate>{postDate}</PostDate>
                            <PostManage>
                                <span onClick={updatePostHandeler}>수정</span>
                                <span onClick={deletePostHandler}>삭제</span>
                            </PostManage>
                        </div>
                        <div className="tags" style={{display:'flex', gap:'14px', marginTop:'14px'}}>
                            {
                                Post.tags.map((tag,idx) => (
                                    <Tag key={idx}>{tag}</Tag>
                                ))
                            }
                        </div>
                    </div>
                    <div className="postBody">
                        <PostContent>
                            <p style={{lineHeight:'1.5'}}>
                                {
                                    Post.body.split('\n').map((line,idx) => (
                                        <span key={idx}>
                                            {line}<br/>
                                        </span>
                                    ))
                                }
                            </p>
                        </PostContent>
                    </div>
                </div>
                : <div>포스트를 불러올 수 없습니다.</div>
            }
        </div>
    )
}

export default PostPage
