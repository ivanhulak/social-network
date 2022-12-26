import React, { useContext, useEffect, useState } from "react";
import Post from './Post/Post';
import { PostsFormikForm } from "./PostsFormikForm";
import { useSelector } from "react-redux";
import { AppStateType } from "../../../redux/redux-store";
import styled from "styled-components";
import add_icon from '../../../assets/posts-icons/add.svg'
import minus_icon from '../../../assets/posts-icons/minus-circle.svg'
import paperclip_icon from '../../../assets/posts-icons/paperclip.svg';
import { OwnerContext } from "../ProfilePage";
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';
import { PostsType } from "../../../types/types";
import { Preloader } from "../../../common/Preloader/Preloader";

const PostsBlock = styled.div`
    position: relative;
    margin-left: 20px;
    margin-top: 50px;
    .createPostTextarea{
        visibility: hidden;
        opacity: 0;
        transition: visibility 0.3s, opacity 0.6s linear;
    }
    .createPostDisappear{
        visibility: visible;
        opacity: 1;
    }
    .postsAdding{
        transition: all 0.4s ease;
        position: absolute;
        top: 80px;
        left: 0px;
        width: 98%;
    }
    .posts{
        transition: all 0.4s ease;
        position: absolute;
        top: 180px;
        left: 0px;
        width: 98%;
    }
`;
const CreatePost = styled.div`
    display: inline-flex;
    align-items: center;
    font-size: 20px;
    font-weight: 600;
    padding: 0px 14px;
    background-color: #8000FF;
    border-radius: 21px;
    color: #E3E3E3;
    margin-bottom: 15px;
    transition: all 0.4s ease;
    .add-icon-image{
        margin-left: 76px;
    }
`;
const StyledMoreButton = styled.button`
    position: absolute;
    bottom: 0px;
    right: 50%;
    transform: translateX(50%);
    background-color: #8000FF;
    font-size: 18px;
    letter-spacing: 0.015em;
    color: #fff;
    padding: 7px 20px;
    border-radius: 32px;
    opacity: 0.4;
    transition: all 0.4s ease;
    &:hover{
        opacity: 1;
    }
`;

const MyPosts: React.FC = React.memo(() => {
    const [addingMode, setAddingMode] = useState(true)
    //@ts-ignore
    const { isOwner } = useContext(OwnerContext)
    const myPosts = useSelector((state: AppStateType) => state.profilePage.posts)

    const [posts, setPosts] = useState<Array<PostsType>>([])
    const [isFetching, setIsFetching] = useState(true)
    const [currentPage, setCurrentPage] = useState(1)

    useEffect(() => {
        if (isFetching) {
            axios.get(`https://randomuser.me/api/1.4/?inc=name,picture&page=${currentPage}&results=3`)
                .then(response =>
                    axios.get(`https://quotes15.p.rapidapi.com/quotes/random/`, {
                        headers: {
                            'X-RapidAPI-Key': 'f266b5dd6dmshbd943994baec7b5p12a697jsndd144bdc18a5',
                            'X-RapidAPI-Host': 'quotes15.p.rapidapi.com'
                        }
                    }).then(res => {
                        response.data.results.forEach((item: any) => {
                            item['id'] = uuidv4()
                            item['postText'] = res.data.content
                        })
                        setPosts([...posts, ...response.data.results])
                        setCurrentPage(prev => prev + 1)
                    }))
                .finally(() => setIsFetching(false))
        }
        // eslint-disable-next-line
    }, [isFetching])

    const downloadMorePostsHandler = () => {
        setIsFetching(true)
    }
    return (
        <PostsBlock >
            {isOwner &&
                <>
                    <CreatePost>Create post
                        <img src={addingMode ? add_icon : minus_icon} alt="" className="add-icon-image"
                            onClick={() => setAddingMode((prev => !prev))} />
                        <img src={paperclip_icon} alt="" className="paperclip-image" />
                    </CreatePost>
                    <div className={(addingMode ? 'createPostTextarea' : 'createPostTextarea createPostDisappear')}>
                        <PostsFormikForm />
                    </div>
                </>}
            {isFetching ? <Preloader/> : <div className={addingMode ? 'postsAdding' : 'posts'}>
                {myPosts.map(item => <Post key={item.id}
                    name={item.name.first}
                    surname={item.name.last}
                    photo={item.picture.thumbnail || 'https://www.shareicon.net/data/512x512/2016/05/29/772559_user_512x512.png'}
                    postText={item.postText} />)}
                {posts.map(p => <Post key={p.id}
                    name={p.name.first}
                    surname={p.name.last}
                    photo={p.picture.thumbnail}
                    postText={p.postText} />)}
                <StyledMoreButton onClick={downloadMorePostsHandler}>See More</StyledMoreButton>
            </div>}
        </PostsBlock>
    );
})

export default MyPosts;