import userReducer, { actions, InitialStateType } from "../users-reducer"

let state: InitialStateType;
beforeEach(() => {
   state = {
      users: [
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
         {
            name: "Ivan3",
            id: 3,
            photos: { small: null, large: null },
            status: 'status3',
            followed: false
         },
      ],
      totalItemsCount: 0,
      pageSize: 9,
      currentPage: 1,
      isFetching: false,
      followingInProgress: [],
      friends: [],
      filter: {
         term: '',
         friend: null
      }
   }
})

test('follow success', () => {
   const newState = userReducer(state, actions.followSuccess(2))
   expect(newState.users[1].followed).toBeTruthy()
   expect(newState.users[2].followed).toBeFalsy()
})
test('unfollow success', () => {
   const newState = userReducer(state, actions.unfollowSuccess(1))
   expect(newState.users[0].followed).toBeFalsy()
   expect(newState.users[2].followed).toBeFalsy()
})
test('Amount added users should be equal to users located in state', () => {
   let action = actions.setUsers(state.users);
   let newState = userReducer(state, action);
   expect(newState.users.length).toBe(state.users.length);
 });
 