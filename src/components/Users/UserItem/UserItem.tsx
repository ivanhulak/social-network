import React from "react";
import userPhoto from './../../../assets/images/userPhoto.png'
import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledUserItem = styled.div`
  padding: 20px 10px;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  justify-self: center;
  cursor: pointer;
  border-radius: 20px;
  overflow: hidden;
  min-width: 200px;
  min-height: 200px;
  border: 1px solid transparent;
  transition: all .4s ease;
  &:hover {
    border: 1px solid rgb(195, 195, 195);
    background-color: ${({ theme }) => theme.additional};
  }
`;
const ItemImage = styled.div`
  margin-bottom: 20px;
  max-width: 100px;
  max-height: 100px;
  img{
    max-width: 100%;
  }
`;
const ItemInfo = styled.div`
  color: ${({ theme }) => theme.headersColor};
  font-weight: 700;
  font-size: 20px;
  margin-bottom: 5px;
  flex: 1 1 auto;
`;
const FollowButton = styled.button`
  background-color: #eee;
  font-size: 20px;
  border: 1px solid #000;
  border-radius: 24px;
  padding: 5px 15px;
  cursor: pointer;
  transition: ease 0.3s all;
  &:hover {
    background-color: #000;
    color: #fff;
  }
  &:active {
    background-color: #666;
    color: #fff;
    transform: translate(2px, 3px);
  }
`;
type PropsType = {
  userId: number
  userPhoto: string | null
  userName: string
  followed: boolean
  followingInProgress: Array<number>
  follow: (userId: number) => void
  unfollow: (userId: number) => void
}
export const UserItem: React.FC<PropsType> = (props) => {
  return (
    <StyledUserItem>
      <ItemImage>
        <Link to={'/profile/' + props.userId}>
          <img src={props.userPhoto ? props.userPhoto : userPhoto} alt="User Avatar" />
        </Link>
      </ItemImage>
      <ItemInfo>
        <div>{props.userName}</div>
      </ItemInfo>
      <div>
        {props.followed
          ? <FollowButton disabled={props.followingInProgress.some(id => id === props.userId)}
              onClick={() => { props.unfollow(props.userId) }}>Unfollow</FollowButton>
          : <FollowButton disabled={props.followingInProgress.some(id => id === props.userId)}
              onClick={() => { props.follow(props.userId) }}>Follow</FollowButton>
        }
      </div>
    </StyledUserItem>
  );
}
