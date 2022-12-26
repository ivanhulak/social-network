import React from 'react';
import { useState } from 'react';
import cn from 'classnames';
import { SimpleBtn } from '../Buttons/SimpleButton/SimpleBtn';
import styled from 'styled-components';

const StyledPages = styled.div`
   .currentPage {
      font-weight: 700;
      background-color: rgb(136, 109, 245);
      color: #fff;
   }
   .pageNumber {
      color: ${({ theme }) => theme.BlackWhite};
      font-size: 20px;
      border: 1px solid ${({ theme }) => theme.paginationBtn};
      border-radius: 24px;
      padding: 5px 15px;
      cursor: pointer;
      transition: ease 0.3s all;
      &:hover {
         background-color: ${({ theme }) => theme.headersColor};
         color: #fff;
      }
      &:active {
         background-color: #666;
         color: #fff;
         transform: translate(2px, 3px);
      }
   }
`;
type PropsType = {
   totalItemsCount: number
   pageSize: number
   currentPage: number
   onPageChanged: (pageNumber: number) => void
   portionSize?: number
}
const Paginator: React.FC<PropsType> = ({ totalItemsCount, pageSize, currentPage, onPageChanged, portionSize = 10 }) => {
   let pagesCount = Math.ceil(totalItemsCount / pageSize);
   let portionCount = Math.ceil(pagesCount / portionSize);
   let [portionNumber, setPortionNumber] = useState(1);
   let leftBorderElement = (portionNumber - 1) * portionSize + 1
   let rightBorderElement = portionNumber * portionSize;

   let pages: Array<number> = []
   for (let i = 1; i <= pagesCount; i++) {
      pages.push(i);
   }

   return <>
      {portionNumber > 1 && <SimpleBtn btn_text='Prev' onClickCallback={ () => { setPortionNumber(portionNumber - 1) } }/>}
      {pages.filter(p => p >= leftBorderElement && p <= rightBorderElement).map(p => {
         return (
            <StyledPages key={p}>
               <button onClick={() => { onPageChanged(p) }}
                  className={cn({'currentPage': currentPage === p }, 'pageNumber')}>{p}</button>
            </StyledPages>
         );
      })}
      {portionNumber < portionCount && 
         <SimpleBtn btn_text='Next' onClickCallback={ () => { setPortionNumber(portionNumber + 1) } }/>}
   </>
}

export default Paginator;