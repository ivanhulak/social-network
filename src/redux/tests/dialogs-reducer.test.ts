import dialogsReducer, { actions } from "../dialogs-reducer";

let state = {
   dialogs: [
      { id: 1, name: 'Kristina', photo: 'https://www.shareicon.net/data/512x512/2016/05/29/772559_user_512x512.png' },
      { id: 2, name: 'Kevin', photo: 'https://www.shareicon.net/data/512x512/2016/05/29/772559_user_512x512.png' },
      { id: 3, name: 'Travis', photo: 'https://www.shareicon.net/data/512x512/2016/05/29/772559_user_512x512.png' },
      { id: 4, name: 'Andrew', photo: 'https://www.shareicon.net/data/512x512/2016/05/29/772559_user_512x512.png' },
      { id: 5, name: 'Sveta', photo: 'https://www.shareicon.net/data/512x512/2016/05/29/772559_user_512x512.png' },
   ],
   messages: [
      { id: 1, message: 'Hello!' },
      { id: 2, message: 'How are you doing?' },
      { id: 3, message: 'magic?' },
      { id: 4, message: 'Hello!' },
      { id: 5, message: 'Yo' },
   ],
}

test('New message should be added in messages array', () => {
   const action = actions.sendMessage('hello!')
   let newState = dialogsReducer(state, action);
   expect(newState.messages.length).toBe(6)
});
test('Added message should be correct', () => {
   const action = actions.sendMessage('hello!')
   let newState = dialogsReducer(state, action);
   expect(newState.messages[5].message).toBe('hello!')
});
test('The last id of element of an array should be equal to array`s length', () => {
   const action = actions.sendMessage('hello!')
   let newState = dialogsReducer(state, action);
   expect(newState.messages[newState.messages.length - 1].id).toBe(newState.messages.length)
});
test('Message should be deleted by id', () => {
   const action = actions.deleteMessage(5)
   let newState = dialogsReducer(state, action);
   expect(newState.messages.length).toBe(4)
});