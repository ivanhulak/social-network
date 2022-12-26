import { createGlobalStyle } from 'styled-components';
import { ThemeType } from './theme';
import './reset.css';

export const GlobalStyles = createGlobalStyle<{ theme: ThemeType }>`
  *,
  *::after,
  *::before {
    box-sizing: border-box;
  }
  body {
    min-width: 1200px;
    margin: 0;
    font-family: 'Montserrat', sans-serif;
    background: ${({ theme }) => theme.body};
    transition: all 0.25s linear;
  }
`;