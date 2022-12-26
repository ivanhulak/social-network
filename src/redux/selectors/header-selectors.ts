import { AppStateType } from "../redux-store";

export const getLogin = (state: AppStateType) => {
   return state.auth.login;
}
export const getUserId = (state: AppStateType) => {
   return state.auth.userId;
}