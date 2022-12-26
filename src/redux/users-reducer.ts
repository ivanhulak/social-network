import { usersAPI } from "../DAL/users-api";
import { updateObjectInArray } from "../common/object-helpers";
import { UsersType } from "../types/types";
import { AppStateType, InferActionsTypes } from "./redux-store.js";
import { ThunkAction } from "redux-thunk";
import { ResultCodesEnum } from "../DAL/api";

let initialState = {
    users: [] as Array<UsersType>,
    totalItemsCount: 0,
    pageSize: 8,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [] as Array<number>, // Array of users id-s
    friends: [] as Array<UsersType>,
    filter: {
        term: '',
        friend: null as null | boolean
    }
}
export type InitialStateType = typeof initialState

const userReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case 'my-social-network/users/FOLLOW':
            return {
                ...state,
                users: updateObjectInArray(state.users, "id", action.userId, { followed: true })
            }
        case 'my-social-network/users/UNFOLLOW':
            return {
                ...state,
                users: updateObjectInArray(state.users, "id", action.userId, { followed: false })
            }
        case 'my-social-network/users/SET_USERS':
            return { ...state, users: action.users }
        case 'my-social-network/users/SET_CURRENT_PAGE':
            return { ...state, currentPage: action.pageNumber }
        case 'my-social-network/users/SET_TOTAL_USER_COUNT':
            return { ...state, totalItemsCount: action.totalCount }
        case 'my-social-network/users/SET_IS_FETCHING':
            return { ...state, isFetching: action.isFetching }
        case 'my-social-network/users/SET_FOLLOWING_IN_PROGRESS':
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id !== action.userId)
            }
        case 'my-social-network/users/SET_FRIENDS':
            return { ...state, friends: action.friends }
        case 'my-social-network/users/SET_FILTER':
            return { ...state, filter: action.payload }
        default:
            return state;
    }
}

type ActionsTypes = InferActionsTypes<typeof actions>
// Action Creators
export const actions = {
    followSuccess: (userId: number) => ({ type: 'my-social-network/users/FOLLOW', userId } as const),
    unfollowSuccess: (userId: number) => ({ type: 'my-social-network/users/UNFOLLOW', userId } as const),
    setUsers: (users: Array<UsersType>) => ({ type: 'my-social-network/users/SET_USERS', users } as const),
    setCurrentPage: (pageNumber: number) => ({ type: 'my-social-network/users/SET_CURRENT_PAGE', pageNumber } as const),
    setTotalUserCount: (totalCount: number) => ({ type: 'my-social-network/users/SET_TOTAL_USER_COUNT', totalCount } as const),
    setIsFetching: (isFetching: boolean) => ({ type: 'my-social-network/users/SET_IS_FETCHING', isFetching } as const),
    setFollowingInProgress: (isFetching: boolean, userId: number) => ({
        type: 'my-social-network/users/SET_FOLLOWING_IN_PROGRESS', isFetching, userId
    } as const),
    setFriends: (friends: Array<UsersType>) => ({ type: 'my-social-network/users/SET_FRIENDS', friends } as const),
    setFilter: (filter: FilterType) => ({ type: 'my-social-network/users/SET_FILTER', payload: filter } as const),
}

// Thunk types with ThunkAction
export type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>
export const requestUsers = (page: number, pageSize: number, filter: FilterType): ThunkType => {
    return async (dispatch) => {
        dispatch(actions.setIsFetching(true));
        dispatch(actions.setCurrentPage(page));
        dispatch(actions.setFilter(filter))
        let data = await usersAPI.getUsers(page, pageSize, filter.term, filter.friend);
        dispatch(actions.setUsers(data.items));
        // console.log(data.items)
        dispatch(actions.setTotalUserCount(data.totalCount));
        dispatch(actions.setIsFetching(false));
    }
}

export const getFriends = (): ThunkType => {
    return async (dispatch) => {
        let data = await usersAPI.getFriends();
        dispatch(actions.setFriends(data.items));
    }
}
export const follow = (userId: number): ThunkType => {
    return async (dispatch) => {
        dispatch(actions.setIsFetching(true));
        dispatch(actions.setFollowingInProgress(true, userId));
        let data = await usersAPI.follow(userId);
        if (data.resultCode === ResultCodesEnum.Success) {
            dispatch(actions.followSuccess(userId))
        }
        dispatch(actions.setIsFetching(false));
        dispatch(actions.setFollowingInProgress(false, userId));
    }
}
export const unfollow = (userId: number): ThunkType => {
    return async (dispatch) => {
        dispatch(actions.setIsFetching(true))
        dispatch(actions.setFollowingInProgress(true, userId));
        let data = await usersAPI.unfollow(userId);
        if (data.resultCode === ResultCodesEnum.Success) {
            dispatch(actions.unfollowSuccess(userId))
        }
        dispatch(actions.setIsFetching(false));
        dispatch(actions.setFollowingInProgress(false, userId));
    }
}

export default userReducer;

export type FilterType = typeof initialState.filter;