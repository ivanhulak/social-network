import { InferActionsTypes } from "./redux-store";

export type DialogsType = { id: number, name: string, photo: string}
export type MessagesType = { id: number, message: string }

let initialState = {
    dialogs: [
        { id: 1, name: 'Kristina', photo: 'https://www.shareicon.net/data/512x512/2016/05/29/772559_user_512x512.png' },
        { id: 2, name: 'Kevin', photo: 'https://www.shareicon.net/data/512x512/2016/05/29/772559_user_512x512.png' },
        { id: 3, name: 'Travis', photo: 'https://www.shareicon.net/data/512x512/2016/05/29/772559_user_512x512.png' },
        { id: 4, name: 'Andrew', photo: 'https://www.shareicon.net/data/512x512/2016/05/29/772559_user_512x512.png' },
        { id: 5, name: 'Sveta', photo: 'https://www.shareicon.net/data/512x512/2016/05/29/772559_user_512x512.png' },
    ] as Array<DialogsType>,
    messages: [
        { id: 1, message: 'Hello!' },
        { id: 2, message: 'How are you doing?' },
        { id: 3, message: 'magic?' },
        { id: 4, message: 'Hello!' },
        { id: 5, message: 'Yo' },
    ] as Array<MessagesType>,
}
type InitialStateType = typeof initialState

const dialogsReducer = (state = initialState, action: ActionsTypes):InitialStateType => {
    switch (action.type) {
        case 'SN/dialogs/SEND_MESSAGE':
            let newMessage = { id: state.messages.length + 1, message: action.newMessageText };
            return {
                ...state,
                messages: [...state.messages, newMessage],
            };
        case 'SN/dialogs/DELETE_MESSAGE':
            return { ...state, messages: state.messages.filter(m => m.id !== action.messageId) }
        default:
            return state;
    }
}

type ActionsTypes = InferActionsTypes<typeof actions>
export const actions = {
    sendMessage: (newMessageText: string) => ({ type: 'SN/dialogs/SEND_MESSAGE', newMessageText } as const),
    deleteMessage: (messageId: number) => ({ type: 'SN/dialogs/DELETE_MESSAGE', messageId } as const)
}

export default dialogsReducer;