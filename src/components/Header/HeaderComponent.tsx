import React, { useEffect } from "react";
import logo from '../../assets/images/logo_SN.jpg';
import { Link, useNavigate } from 'react-router-dom';
import { SimpleBtn } from "../../common/Buttons/SimpleButton/SimpleBtn";
import { useSelector } from "react-redux";
import { getLogin, getUserId } from "../../redux/selectors/header-selectors";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/auth-reducer";
import styled from "styled-components";
import { ThemeSwitcher } from "./ThemeSwitcher/ThemeSwitcher";

const Header = styled.header`
  background-color: ${({theme}) => theme.additional};
  padding: 10px 10px;
  margin-bottom: 10px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 20px;
  grid-area: header;
  .logotype{
    max-width: 50px;
    border-radius: 50%;
  }
  .headerInnerRow{
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;
export const HeaderComponent: React.FC = React.memo(() => {

  const userId = useSelector(getUserId)
  const login = useSelector(getLogin)
  const dispatch: any = useDispatch()
  const navigate = useNavigate();

  const routeChange = () => {
    let path = `/profile/${userId}`;
    navigate(path);
  }
  const logoutCallback = () => {
    dispatch(logout())
  }

  useEffect(() => {
    navigate('/login')
    // eslint-disable-next-line
  }, [login])

  return (
    <Header>
      <img src={logo} alt="Logotype" className="logotype" />
      {login
        ? <div className='headerInnerRow'>
          <SimpleBtn btn_text={login} onClickCallback={routeChange} />
          <SimpleBtn btn_text='logout' onClickCallback={logoutCallback} />
        </div>
        : <div>
          <Link to='/login'><SimpleBtn btn_text='Login' /></Link>
        </div>
      }
      <ThemeSwitcher />
    </Header>
  );
})