import React, { useEffect, useState } from 'react';
import { CartItem } from './CartItem/CartItem';
import styled from 'styled-components';
import data from '../../cart.db/cart.db';
import { CartProductsType } from '../../redux/shop-reducer';
import { CartFooter } from './CartFooter/CartFooter';

const StyledCart = styled.div`
   margin-left: 10px;
`;
const CartTitle = styled.h1`
   text-align: center;
   font-size: 32px;
   font-weight: 700;
   color: #886DF5;
`;
const CartBlock = styled.div`
   margin: 30px 0px 20px;
`;

export type TotalType = { count: number, price: number }
const CartPage: React.FC = () => {
   const [cart, setCart] = useState(data)
   const [total, setTotal] = useState<TotalType>({
      count: cart.reduce((prev, curr) => prev + curr.count, 0),
      price: cart.reduce((prev, curr) => prev + curr.priceTotal, 0)
   })

   useEffect(() => {
      setTotal({
         count: cart.reduce((prev, curr) => prev + curr.count, 0),
         price: cart.reduce((prev, curr) => prev + curr.priceTotal, 0)
      })
   }, [cart])

   const incrementFn = (id: number) => {
      setCart(cart => cart.map(product => {
         if (product.id === id) {
            return { ...product, count: ++product.count, priceTotal: product.count * product.price }
         }
         return product
      }))
   }
   const decrementFn = (id: number) => {
      setCart(cart => cart.map(product => {
         if (product.id === id) {
            if (product.count === 1) {
               deleteProduct(product.id)
            }
            return { ...product, count: product.count - 1, priceTotal: (product.count - 1) * product.price }
         }
         return product
      }))
   }
   const deleteProduct = (productId: number) => {
      setCart(cart => cart.filter(product => productId !== product.id))
   }
   const changeValueHandler = (id: number, value: number) => {
      setCart(cart => cart.map(product => {
         if (product.id === id) {
            return { ...product, count: value, priceTotal: (value) * product.price }
         }
         return product
      }))
   }
   const makeOrder = () => {
      console.log('Make order')
   }

   return (
      <StyledCart>
         <CartTitle>Корзина товаров</CartTitle>
         <CartBlock>
            {cart.map((product: CartProductsType) => <CartItem key={product.id}
               product={product} deleteProduct={deleteProduct} incrementFn={incrementFn} decrementFn={decrementFn}
               changeValueHandler={changeValueHandler} />)}
         </CartBlock>
         <CartFooter total={total} makeOrder={makeOrder} />
      </StyledCart>
   );
}

export default CartPage;