import React, { useContext, useState } from 'react';
import { SwithThemeContext } from '../../../../App';
import "./Switch.css";

export const Switch: React.FC = () => {
   const {toggleTheme, isDarkTheme} = useContext(SwithThemeContext)
   const [isToggled, setIsToggled] = useState(isDarkTheme)

   const onToggle = () => {
      setIsToggled(!isToggled);
      toggleTheme();
   }

   return (
      <label className="toggle-switch">
         <input type="checkbox" checked={isToggled} onChange={onToggle} />
         <span className="switch" />
      </label>
   );
}