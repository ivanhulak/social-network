import { ThunkAction } from "redux-thunk";
import { AuthMe } from "./auth-reducer";
import { AppStateType, InferActionsTypes } from "./redux-store";

let initialState = {
    initialized: false,
    globalError: '',
}
type InitialStateType = typeof initialState;

const appReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case 'SN/app/INITIALIZED_SUCCESS':
            return { ...state, initialized: true }
        case 'SN/app/GLOBAL_ERROR':
            return { ...state, globalError: action.message }
        default:
            return state;
    }
}
// Actions Creators
type ActionsTypes = InferActionsTypes<typeof actions>
const actions = {
    initializedSuccess: () => ({ type: 'SN/app/INITIALIZED_SUCCESS' } as const),
    handleErrorSuccess: (message: string) => ({ type: 'SN/app/GLOBAL_ERROR', message } as const)
}


type ThunkType = ThunkAction<void, AppStateType, unknown, ActionsTypes>
// Thunk Creators
export const initializeApp = (): ThunkType => (dispatch) => {
    let promise = dispatch(AuthMe());
    Promise.all([promise]).then(() => { dispatch(actions.initializedSuccess()) })
}
export const handleError = (errorMessage: string): ThunkType => (dispatch) => {
    dispatch(actions.handleErrorSuccess(errorMessage));
}

export default appReducer;