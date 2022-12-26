import React, { useState } from "react";
import styled from "styled-components";
import dislike_icon from '../../../../assets/posts-icons/heart.svg'
import like_icon from '../../../../assets/posts-icons/heart_active.svg'
import comments_icon from '../../../../assets/posts-icons/comments.svg'
import sendings_icon from '../../../../assets/posts-icons/pointer.svg'


const PostWrapper = styled.div`
    border: 5px solid #B7A8F5;
    height: fit-content;
    margin: 0 auto 40px;
    width: 60%;
    box-shadow: 0px 0px 24px 4px #B7A8F5;
    border-radius: 37px;
`;
export const PostHeader = styled.div`
    background-color: #B7A8F5;
    display: flex;
    gap: 23px;
    padding: 11px 16px;
    box-shadow: 0px 0px 24px 4px #B7A8F5;
    border-radius: 30px;
    margin-bottom: 12px;
    .avatar{
        flex: 0 0 80px;
        overflow: hidden;
        img{
            max-width: 75px;
            min-width: 60px;
            border-radius: 50%;
        }
    }
    .fullName{
        font-weight: 700;
        font-size: 24px;
        margin-bottom: 10px;
    }
    .postText{
        font-weight: 500;
        font-size: 20px;
        letter-spacing: 0.015em;
    }
`;
const PostImageContainer = styled.div`
    padding: 10px 20px;
    overflow: hidden;
    .container{}
`;
type PropType = {
    image?: string
}
const PostImage = styled.div<PropType>`
    width: 100%;
    height: 300px;
    border-radius: 79px;
    overflow: hidden;
    background-position: center;
    background-image: ${(props) => `url(${props.image})`};
`;
const PostActivity = styled.div`
    display: flex;
    gap: 60px;
    color: #8000FF;
    font-weight: 600;
    font-size: 24px;
    padding: 25px 35px;
    .likes,
    .comments,
    .send{
        display: flex;
        align-items: center;
        gap: 15px;
    }
`;

type PropsType = {
    name: string
    surname: string
    photo: string
    postText: string
}
const Post: React.FC<PropsType> = ({ postText, name, surname, photo }) => {
    const [like, setLike] = useState(false)
    // const getRandomInt = () => {
    //     return Math.floor(Math.random() * 1000);
    // }
    return (
        <PostWrapper>
            <PostHeader>
                <div className="avatar"><img src={photo} alt="" /></div>
                <div>
                    <div className="fullName">{`${name} ${surname}`}</div>
                    <div className="postText">{postText}</div>
                </div>
            </PostHeader>
            <PostImageContainer>
                <div className="container">
                    <PostImage image={photo}></PostImage>
                    <PostActivity>
                        <button className="likes" onClick={() => setLike(prevState => !prevState)}>
                            <img src={like ? like_icon : dislike_icon} alt="" />
                            <span>160</span>
                        </button>
                        <div className="comments">
                            <img src={comments_icon} alt="" />
                            <span>18</span>
                        </div>
                        <div className="send">
                            <img src={sendings_icon} alt="" />
                            <span>3</span>
                        </div>
                    </PostActivity>
                </div>
            </PostImageContainer>
        </PostWrapper>
    );
}

export default Post;