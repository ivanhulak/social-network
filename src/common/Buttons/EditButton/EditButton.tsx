import React from 'react';
import styles from '../SimpleButton/Buttons.module.css'

type PropsType = {
   onClickCallback: () => void
   children: React.ReactNode
}
export const EditButton: React.FC<PropsType> = ({ onClickCallback, children }) => {
   return <div>
      <button onClick={onClickCallback} className={styles.editBtn}>
         {children}
      </button>
   </div>
}
