import React from 'react';
import styled from 'styled-components';
import increment from '../../../assets/cart-icons/chevron-up.svg';
import decrement from '../../../assets/cart-icons/chevron-down.svg';
import { CartProductsType } from '../../../redux/shop-reducer';
import priceFormatter from '../../../utils/priceFormatter';
import { DeleteProductIcon } from './DeleteProductIcon';

const StyledCartItem = styled.div`
   border-top: 3px solid #E3E3E3;
   border-bottom: 3px solid #E3E3E3;
   padding: 30px 70px 30px 20px;
   display: flex;
   min-height: 100px;
   height: 150px;
   align-items: center;
   gap: 40px;
   position: relative;
   &:not(:last-child){
      margin-bottom: 20px;
   }
   .countDiv{
      position: relative;
      margin: 0px 80px 0px 40px;
   }
`;
const StyledImageDivContainer = styled.div`
   flex: 0 1 100px;
   overflow: hidden;
`;
const ProductImage = styled.img`
   width: 100%;
`;
const ProductTitle = styled.h2`
   font-weight: 700;
   flex: 0 1 35%;
   color: ${({ theme }) => theme.headersColor};
`;
const ProductPrice = styled.div`
   font-weight: 700;
   background-color: #d0c5ff;
   border-radius: 16px;
   padding: 10px 15px;
`;
const RemoveProductButton = styled.button`
   position: absolute;
   top: 10px;
   right: 10px;
`;
const StyledInput = styled.input`
   padding: 10px;
   font-weight: 700;
   width: 50px;
   text-align: center;
   background-color: #E3E3E3;
   border-radius: 14px;
   border: 1px solid #E3E3E3;
   &:focus {
      border: 1px solid #886DF5;
   }
`;
const IncrementBtn = styled.button`
   position: absolute;
   top: -10px;
   right:-35px;
   width: 35px;
   height: 35px;
   background: url(${increment}) 0 0/cover no-repeat;
   transition: all 0.3s ease;
   &:active{
      top: -7px;
   }
`;
const DecrementBtn = styled.button`
   position: absolute;
   top: 15px;
   right:-35px;
   width: 35px;
   height: 35px;
   background: url(${decrement}) 0 0/cover no-repeat;
   transition: all 0.3s ease;
   &:active{
      top: 25px;
   }
`;

type PropsType = {
   deleteProduct: (productId: number) => void
   incrementFn: (id: number) => void
   decrementFn: (id: number) => void
   changeValueHandler: (id: number, value: number) => void
   product: CartProductsType
}
export const CartItem: React.FC<PropsType> = ({ product, deleteProduct, incrementFn, decrementFn, changeValueHandler }) => {
   const {image, id, name, priceTotal, count} = product

   return (
      <StyledCartItem>
         <StyledImageDivContainer>
            <ProductImage src={image} />
         </StyledImageDivContainer>
         <ProductTitle>{name}</ProductTitle>
         <div className='countDiv'>
            <StyledInput 
               type="number" 
               value={count} 
               onChange={(e: React.ChangeEvent<HTMLInputElement>) => changeValueHandler(id, +e.target.value)} 
            />
            <IncrementBtn onClick={() => incrementFn(id)} />
            <DecrementBtn onClick={() => decrementFn(id)} />
         </div>
         <ProductPrice>{priceFormatter.format(priceTotal)} грн</ProductPrice>
         <RemoveProductButton onClick={() => deleteProduct(id)}><DeleteProductIcon/></RemoveProductButton>
      </StyledCartItem>
   );
}