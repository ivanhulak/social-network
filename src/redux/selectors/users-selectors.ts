import { AppStateType } from "../redux-store";

export const getUsers = (state: AppStateType) => {
   return state.usersPage.users;
}
export const getTotalItemsCount = (state: AppStateType) => {
   return state.usersPage.totalItemsCount;
}
export const getPageSize = (state: AppStateType) => {
   return state.usersPage.pageSize;
}
export const getCurrentPage = (state: AppStateType) => {
   return state.usersPage.currentPage;
}
export const getIsFetching = (state: AppStateType) => {
   return state.usersPage.isFetching;
}
export const getFollowingInProgress = (state: AppStateType) => {
   return state.usersPage.followingInProgress;
}
export const getFriends = (state: AppStateType) => {
   return state.usersPage.friends;
}
export const getFilterUsers = (state: AppStateType) => {
   return state.usersPage.filter;
}