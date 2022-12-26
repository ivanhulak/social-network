import { ResultCodeForCaptchaEnum, ResultCodesEnum } from '../DAL/api';
import { securityAPI } from '../DAL/security-api';
import { authAPI } from '../DAL/auth-api';
import { InferActionsTypes, BaseThunkType } from './redux-store';

let initialState = {
    userId: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false,
    captchaURL: null as string | null,
    error: null as string | null
}
type InitialStateType = typeof initialState;

const authReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case 'SN/auth/AUTH_USER_PROFILE':
            return { ...state, ...action.payload }
        case 'SN/auth/SET_CAPTCHA_URL':
            return { ...state, captchaURL: action.url }
        case 'SN/auth/SET_ERROR':
            return { ...state, error: action.error }
        default:
            return state;
    }
}

// Action Creators
type ActionsTypes = InferActionsTypes<typeof actions>

const actions = {
    authUserProfile: (userId: number | null, email: string | null, login: string | null,
        isAuth: boolean) => ({ type: 'SN/auth/AUTH_USER_PROFILE', payload: { userId, email, login, isAuth }} as const),
    setCaptchaURL: (url: string) => ({ type: 'SN/auth/SET_CAPTCHA_URL', url } as const ),
    setError: (error: string | null) => ({type: 'SN/auth/SET_ERROR', error} as const)
}


// Thunk Creators
type ThunkType = BaseThunkType<ActionsTypes>

export const AuthMe = (): ThunkType => async (dispatch) => {
    const data = await authAPI.authMe()
    if (data.resultCode === ResultCodesEnum.Success) {
        let { id, email, login } = data.data;
        dispatch(actions.authUserProfile(id, email, login, true));
    } else if(data.resultCode === ResultCodesEnum.Error){
        dispatch(actions.setError(data.messages[0]))
    }
}
export const login = (email: string, password: string, rememberMe: boolean, captcha: string | null):ThunkType => async (dispatch) => {
    const data = await authAPI.login(email, password, rememberMe, captcha)
    if (data.resultCode === ResultCodesEnum.Success) {
        dispatch(AuthMe());
    } else {
        if (data.resultCode === ResultCodeForCaptchaEnum.CaptchaIsRequired) {
            dispatch(getCaptchaUrl());
        } else if(data.resultCode === ResultCodesEnum.Error){
            dispatch(actions.setError(data.messages[0]))
        }
    }
}
export const logout = (): ThunkType => async (dispatch) => {
    const data = await authAPI.logout()
    if (data.resultCode === ResultCodesEnum.Success) {
        dispatch(actions.authUserProfile(null, null, null, false));
        dispatch(actions.setError(null))
    }
}
export const getCaptchaUrl = (): ThunkType => async (dispatch) => {
    const data = await securityAPI.CaptchaIsRequired();
    dispatch(actions.setCaptchaURL(data.url))
}

export default authReducer;