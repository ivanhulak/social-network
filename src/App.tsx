import React, { createContext, useEffect } from "react";
import { Routes, Route } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { Preloader } from "./common/Preloader/Preloader";
import { initializeApp, handleError } from './redux/app-reducer';
import { getFriends } from "./redux/users-reducer";
import { AppStateType } from './redux/redux-store';
import Navbar from "./components/Navbar/Navbar";
import { NotFound } from "./components/ErrorPages/NotFound";
import { HeaderComponent } from "./components/Header/HeaderComponent";
import { LoginPage } from "./components/Login/LoginPage";
import { withLazyComponent } from "./components/HOC/withLazyComponent";
import styled, { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "./theme";
import { GlobalStyles } from './global';
import { useLocalStorage } from "./utils/useLocalStorage";
import { detectDarkMode } from "./utils/detectDarkMode";

// Use lazy loading
const ProfilePage = withLazyComponent(React.lazy(() => import('./components/Profile/ProfilePage')));
const Dialogs = withLazyComponent(React.lazy(() => import('./components/Dialogs/Dialogs')));
const UsersPage = withLazyComponent(React.lazy(() => import('./components/Users/UsersPage')));
const ChatPage = withLazyComponent(React.lazy(() => import('./components/Chat/ChatPage')));
const CartPage = withLazyComponent(React.lazy(() => import('./components/CartPage/CartPage')));

const Container = styled.div`
  max-width: 1300px;
  margin: 0 auto;
`;
const Wrapper = styled.div`
  display: grid;
  grid-template-areas:
    "header header"
    "nav content"
    "footer footer";
  grid-template-columns: 250px 1fr;
`;
const WrapperContent = styled.div`
  height: calc(100vh - 142px);
  overflow: scroll;
  scroll-behavior: smooth;
  grid-area: content;
`;
const Footer = styled.div`
  grid-area: footer;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.additional};
  letter-spacing: 0.02em;
  color: ${({ theme }) => theme.footerText};
  padding: 15px 0px;
  margin-top: 10px;
  font-weight: 300;
  font-size: 18px;
`;
type SwitchThemeType = { toggleTheme: () => void, isDarkTheme: boolean }
export const SwithThemeContext = createContext<SwitchThemeType>({} as SwitchThemeType)
export const App: React.FC = () => {
  const [theme, setTheme] = useLocalStorage('darkTheme', detectDarkMode())
  const isDarkTheme = theme === 'dark'
  const initialized = useSelector((state: AppStateType) => state.app.initialized)
  const globalError = useSelector((state: AppStateType) => state.app.globalError)
  const errorsData = useSelector((state: AppStateType) => state.profilePage.errorsData)
  const dispatch: any = useDispatch()

  const toggleTheme = () => {
    setTheme(isDarkTheme ? 'light' : 'dark')
  }
  const swithThemeObject = {
    toggleTheme: toggleTheme,
    isDarkTheme: isDarkTheme
  }
  const catchUnhandledErrors = (error: PromiseRejectionEvent) => {
    dispatch(handleError(error.reason.message));
  }

  useEffect(() => {
    dispatch(initializeApp())
    dispatch(getFriends())
    window.addEventListener("unhandledrejection", catchUnhandledErrors);
    return () => {
      window.removeEventListener("unhandledrejection", catchUnhandledErrors);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      {!initialized ? <Preloader /> :
        <SwithThemeContext.Provider value={swithThemeObject}>
          <ThemeProvider theme={isDarkTheme ? darkTheme : lightTheme}>
            <GlobalStyles />
            <Container >
              <Wrapper>
                <HeaderComponent />
                <Navbar />
                <WrapperContent>
                  {errorsData && <div>{errorsData.messages}</div>}
                  {globalError && <div>{globalError}</div>}
                  <Routes >
                    <Route path='/' element={<ProfilePage />}>
                      <Route path="/profile" element={<ProfilePage />} />
                      <Route path="/profile/:userId" element={<ProfilePage />} />
                    </Route>
                    <Route path="/dialogs" element={<Dialogs />} />
                    <Route path="/chat" element={<ChatPage />} />
                    <Route path="/users" element={<UsersPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/shop" element={<CartPage />} />
                    <Route path="*" element={< NotFound />} />
                  </Routes>
                </WrapperContent>
                <Footer>React Social Network 2023</Footer>
              </Wrapper>
            </Container>
          </ThemeProvider>
        </SwithThemeContext.Provider>
      }
    </>
  );
}