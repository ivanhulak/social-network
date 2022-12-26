import { useTheme } from "styled-components";
import { ThemeType } from "../../../theme";

export const ShopIcon = () => {
   const theme = useTheme() as ThemeType
   return (
      <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
         <path d="M19.5 10.5V6.75C19.5 4.26472 17.4853 2.25 15 2.25C12.5147 2.25 10.5 4.26472 10.5 6.75V10.5M5.90909 27.75H24.0909C25.6976 27.75 27 26.4718 27 24.895L25.1364 9.74996C25.1364 8.17318 23.8339 6.89494 22.2273 6.89494H7.40909C5.80244 6.89494 4.5 8.17318 4.5 9.74996L3 24.895C3 26.4718 4.30244 27.75 5.90909 27.75Z" stroke={theme.navlink_icon} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
   );
}