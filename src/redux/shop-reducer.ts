import { InferActionsTypes } from "./redux-store";

export type CartProductsType = {
    id: number,
    image: string,
    name: string,
    count: number,
    price: number
    priceTotal: number
}
let initialState = {
    cart: [] as Array<CartProductsType>
}
type InitialStateType = typeof initialState

const shopReducer = (state = initialState, action: ActionsTypes):InitialStateType => {
    switch (action.type) {
        default:
            return state;
    }
}

type ActionsTypes = InferActionsTypes<typeof actions>
export const actions = {
    counterIncremented: (productCount: number) => ({ type: 'SN/shop/COUNTER_INCREMENTED', productCount } as const),
}

export default shopReducer;