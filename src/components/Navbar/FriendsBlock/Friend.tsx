import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FriendType } from './Friends';

const StyledFriendLink = styled(Link)`
   display: flex;
   align-items: center;
   gap: 10px;
   margin-bottom: 10px;
   cursor: pointer;
   transition: all .2s ease;
   &:hover{
      transform: translateX(5%);
   }
`;
const FriendImage = styled.div`
   max-width: 30px;
   max-height: 30px;
   border-radius: 50%;
   overflow: hidden;
   img{
      width: 100%;
   }
`;
const FriendName = styled.div`
   font-size: 18px;
   color: ${({theme}) => theme.friendColor};
   &:hover{
      color: ${({theme}) => theme.navlink};
   }
`;

export const Friend: React.FC<FriendType> = ({ id, name, photos }) => {
   return (
      <StyledFriendLink to={`/profile/${id}`}>
         <FriendImage>
            <img src={photos.small || photos.large || 'https://www.shareicon.net/data/512x512/2016/05/29/772559_user_512x512.png'} alt="User Avatar" />
         </FriendImage>
         <FriendName>{name}</FriendName>
      </StyledFriendLink>
   )
}