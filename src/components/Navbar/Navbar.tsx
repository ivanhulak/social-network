import React, { useState } from "react";
import { NavLink } from 'react-router-dom';
import { Friends } from "./FriendsBlock/Friends";
import { AppStateType } from '../../redux/redux-store'
import { useSelector } from "react-redux";
import styled from "styled-components";
import { ProfileIcon } from "./Icons/ProfileIcon";
import { MessagesIcon } from "./Icons/MessagesIcon";
import { ChatIcon } from "./Icons/ChatIcon";
import { UsersIcon } from "./Icons/UsersIcon";
import { SettingsIcon } from "./Icons/SettingsIcon";
import { ShopIcon } from "./Icons/ShopIcon";
import { DotsIcon } from "./Icons/DotsIcon";

const StyledNavbar = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 20px;
  font-size: 22px;
  padding: 20px 10px;
  background-color: ${({theme}) => theme.additional};
  max-height: calc(100vh - 142px);
  overflow: scroll;
  grid-area: nav;
  .nav-list__link{
    color: ${({theme}) => theme.navlink};
    font-weight: 400;
    font-size: 28px;
    letter-spacing: 0.01em;
    img{
      margin-right: 20px;
    }
  }
  .nav-list__link--active{
    font-weight: 500;
    color: #886DF5;
  }
  .page-name{
    margin-left: 20px;
  }
`;
const FriendsTitle = styled.div`
  cursor: pointer;
  font-weight: 400;
  font-size: 28px;
  letter-spacing: 0.01em;
  color: ${({theme}) => theme.friendColor};
`;

const Navbar: React.FC = () => {
  const [isFriendsVisible, setIsFriendsVisible] = useState(false)
  const isAuth: boolean = useSelector((state: AppStateType) => state.auth.isAuth)
  return (
    <StyledNavbar>
      {isAuth && <>
        <NavLink to="/profile"
          className={({ isActive }) => isActive ? 'nav-list__link nav-list__link--active' : 'nav-list__link'}>
          <ProfileIcon />
          <span className="page-name">Profile</span>
        </NavLink>

        <NavLink to='/dialogs'
          className={({ isActive }) => isActive ? 'nav-list__link nav-list__link--active' : 'nav-list__link'}>
          <MessagesIcon/>
          <span className="page-name">Messages</span>
        </NavLink>
        <NavLink to='/chat'
          className={({ isActive }) => isActive ? 'nav-list__link nav-list__link--active' : 'nav-list__link'}>
          <ChatIcon />
          <span className="page-name">Chat</span>
        </NavLink>
      </>}
      <NavLink to='/users'
        className={({ isActive }) => isActive ? 'nav-list__link nav-list__link--active' : 'nav-list__link'}>
        <UsersIcon />
        <span className="page-name">Users</span>
      </NavLink>
      <NavLink to='/settings'
        className={({ isActive }) => isActive ? 'nav-list__link nav-list__link--active' : 'nav-list__link'}>
        <SettingsIcon />
        <span className="page-name">Settings</span>
      </NavLink>
      <NavLink to='/shop'
        className={({ isActive }) => isActive ? 'nav-list__link nav-list__link--active' : 'nav-list__link'}>
        <ShopIcon />
        <span className="page-name">Shop</span>
      </NavLink>
      {isAuth && <>
        <FriendsTitle onClick={() => setIsFriendsVisible(prev => !prev)}>
          <DotsIcon />
          <span className="page-name">Friends</span>
        </FriendsTitle>
        {isFriendsVisible && <Friends />}
      </>}
    </StyledNavbar>
  );
}

export default Navbar;