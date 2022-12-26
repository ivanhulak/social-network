import React from 'react';
import { MoonIcon } from './Icons/MoonIcon';
import { SunIcon } from './Icons/SunIcon';
import { Switch } from './Switch/Switch';

export const ThemeSwitcher: React.FC = () => {
   return (
      <div style={{ width: '155px' }}>
         <SunIcon />
         <Switch/>
         <MoonIcon />
      </div>
   );
}