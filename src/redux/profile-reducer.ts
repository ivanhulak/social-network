import { ResultCodesEnum } from '../DAL/api';
import { profileAPI } from '../DAL/profile-api';
import { PhotosType, PostsType, ProfileType } from '../types/types';
import { BaseThunkType, InferActionsTypes } from './redux-store';
import { v4 as uuidv4 } from 'uuid';

let initialState = {
    posts: [] as Array<PostsType>,
    profile: null as ProfileType | null,
    status: '',
    errorsData: {} as any,
}
type InitialStateType = typeof initialState

const profileReducer = (state = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case 'SN/profile/ADD_POST':
            let newPost = {
                id: uuidv4(),
                name: {first:'Ivan', last: 'Hulak', title: 'Mr'},
                picture: {large: 'https://www.shareicon.net/data/512x512/2016/05/29/772559_user_512x512.png', medium: '', thumbnail: ''},
                postText: action.newPostText,
            }
            return { ...state, posts: [...state.posts, newPost] }
        case 'SN/profile/DELETE_POST':
            return { ...state, posts: state.posts.filter(post => post.id !== action.postId) }
        case 'SN/profile/SET_USER_PROFILE':
            return { ...state, profile: action.profile }
        case 'SN/profile/SET_STATUS':
            return { ...state, status: action.status }
        case 'SN/profile/UPLOAD_PHOTO_SUCCESS':
            return { ...state, profile: { ...state.profile, photos: action.photos } as ProfileType }
        case 'SN/profile/CATCH_ERRORS_SUCCESS':
            return { ...state, errorsData: action.data }
        default:
            return state;
    }
}
// Action creators
type ActionTypes = InferActionsTypes<typeof actions>
export const actions = {
    addPost: (newPostText: string) => ({ type: 'SN/profile/ADD_POST', newPostText } as const),
    deletePost: (postId: string) => ({ type: 'SN/profile/DELETE_POST', postId } as const), // for testing
    setUserProfile: (profile: ProfileType) => ({ type: 'SN/profile/SET_USER_PROFILE', profile } as const),
    setStatus: (status: string) => ({ type: 'SN/profile/SET_STATUS', status } as const),
    uploadPhotoSuccess: (photos: PhotosType) => ({ type: 'SN/profile/UPLOAD_PHOTO_SUCCESS', photos } as const),
    catchErrorSuccess: (data: any) => ({ type: 'SN/profile/CATCH_ERRORS_SUCCESS', data } as const)
}

// Thunk Creators
type ThunkType = BaseThunkType<ActionTypes>
export const setProfile = (userId: number): ThunkType => async (dispatch) => {
    let data = await profileAPI.getProfile(userId)
    dispatch(actions.setUserProfile(data));
}
export const getStatus = (userId: number): ThunkType => async (dispatch) => {
    let data = await profileAPI.getStatus(userId)
    dispatch(actions.setStatus(data));
}
export const updateStatus = (status: string): ThunkType => async (dispatch) => {
    try {
        let data = await profileAPI.updateStatus(status)
        if (data.resultCode === ResultCodesEnum.Success) {
            dispatch(actions.setStatus(status));
        }
    } catch (error: any) {
        dispatch(catchErrors(error.response.status, error.response.data.message, error.code))
    }
}
export const uploadPhoto = (file: any): ThunkType => async (dispatch) => {
    let data = await profileAPI.uploadPhoto(file)
    if (data.resultCode === ResultCodesEnum.Success) {
        dispatch(actions.uploadPhotoSuccess(data.data.photos));
    } else if (data.resultCode === ResultCodesEnum.Error){
        alert(`Error! ${data.messages[0]}`)
    }
}
export const upgradeProfile = (profileData: ProfileType): ThunkType => async (dispatch, getState) => {
    const userId = getState().auth.userId
    let data = await profileAPI.upgradeProfile(profileData)
    if (data.resultCode === ResultCodesEnum.Success) {
        if (userId !== null){
            dispatch(setProfile(userId))
        } else {
            throw new Error('UserId cannot be null')
        }
    }
}
export const catchErrors = (status: string, message: string, statusCode: number): BaseThunkType<ActionTypes, void> => (dispatch) => {
    const data = { status, message, statusCode }
    dispatch(actions.catchErrorSuccess(data))
}

export default profileReducer