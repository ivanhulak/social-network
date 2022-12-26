import { GetUsersResponseType, usersAPI } from "../../DAL/users-api";
import { actions, requestUsers } from "../users-reducer";

jest.mock('../DAL/users-api')
const usersAPIMock = usersAPI as jest.Mocked<typeof usersAPI>

const result: GetUsersResponseType = {
   items: [
      {
         name: "Ivan1",
         id: 1,
         photos: { small: null, large: null },
         status: 'status0',
         followed: true
      },
      {
         name: "Ivan2",
         id: 2,
         photos: { small: null, large: null },
         status: 'status2',
         followed: false
      },
   ],
   totalCount: 2500,
   error: ''
}

usersAPIMock.getUsers.mockReturnValue(Promise.resolve(result))

test('request users', () => {

   const thunk = requestUsers(2, 1, {term: '', friend: null})
   const dispatchMock = jest.fn()
   const getStateMock = jest.fn()
   
   thunk(dispatchMock, getStateMock, {})

   expect(dispatchMock).toBeCalledTimes(5)
   expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.setIsFetching(true))
   expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.setCurrentPage(2))
   expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.setUsers(result.items))
})