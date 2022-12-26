import React from 'react';
import styles from './Buttons.module.css';

type PropsType = { btn_text: string, onClickCallback?: () => void }
export const SimpleBtn: React.FC<PropsType> = ({btn_text, onClickCallback}) => {
   return <div>
      <button className={styles.simpleBtn} onClick={onClickCallback}>{btn_text}</button>
   </div>
}