import { UsersType } from "../types/types"
import { instance, ResponseType } from "./api"

export type GetUsersResponseType = {
   items: Array<UsersType >
   totalCount: number
   error: string | null
}
export const usersAPI = {
   getUsers(currentPage: number = 1, pageSize: number = 9, term: string = '', friend: null | boolean = null) {
       return instance.get<GetUsersResponseType>(`users?count=${pageSize}&page=${currentPage}&term=${term}` + (friend === null ? '' : `&friend=${friend}`))
         .then(response => response.data);
   },
   getFriends(){
      return instance.get(`users?friend=${true}`).then(response => response.data);
   },
   follow(userId: number){
      return instance.post<ResponseType>(`follow/${userId}`).then(response => response.data);
   },
   unfollow(userId: number){
      return instance.delete<ResponseType>(`follow/${userId}`).then(response => response.data);
   },
}