import React from 'react';
import styled from 'styled-components';
import priceFormatter from '../../../utils/priceFormatter';
import { TotalType } from '../CartPage';

const CartBlockFooter = styled.div`
   display: flex;
   justify-content: flex-end;
   align-items: center;
   background-color: #E3E3E3;
   padding: 20px 30px;
   border-radius: 8px;
   gap: 40px;
`;
const TotalCount = styled.div`
   text-align: center;
   flex: 0 1 15%;
   font-weight: 700;
`;
const TotalPrice = styled.div`
   font-weight: 700;
`;
const OrderButton = styled.button`
   font-weight: 700;
   background-color: #d0c5ff;
   border-radius: 16px;
   padding: 10px 15px;
   transition: all 0.3s ease;
   &:hover {
      background-color: #886DF5;
   }
   &:active {
      transform: translate(3px, 3px);
   }
`;

type PropsType = {total: TotalType, makeOrder: () => void}
export const CartFooter: React.FC<PropsType> = ({total, makeOrder}) => {
   return (
      <CartBlockFooter>
         <TotalCount>{total.count} ед.</TotalCount>
         <TotalPrice>{priceFormatter.format(total.price)} грн</TotalPrice>
         <OrderButton onClick={makeOrder}>Заказать</OrderButton>
      </CartBlockFooter>
   );
}