import React from "react";
import DialogItem from "./DialogItem/DialogItem";
import MessageItem from "./MessageItem/MessageItem";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { AppStateType } from "../../redux/redux-store";
import { DialogsFormikForm } from "./DialogsFormikForm";

const StyledDialogs = styled.div`
    padding: 0px 30px;
    .dialogsRow{
        display: flex;
        justify-content: flex-start;
        gap: 50px;
        font-size: 22px;
        margin-bottom: 30px;
    }
    .dialogsBlock{
        a{
            text-decoration: none;
            color: ${({ theme }) => theme.headersColor};
        }
    }
`;

export type DialogsFormDataValuesType = {
    sentMessage: string
}
const Dialogs: React.FC = () => {
    const dialogs = useSelector((state: AppStateType) => state.dialogsPage.dialogs)
    const messages = useSelector((state: AppStateType) => state.dialogsPage.messages)
    
    return (
        <StyledDialogs>
            <div className='dialogsRow'>
                <div className='dialogsBlock'>
                    {dialogs.map(d => <DialogItem id={d.id} name={d.name} photo={d.photo} key={d.id}/>)}
                </div>
                <div className='messagesBlock'>
                    {messages.map(m => <MessageItem message={m.message} key={m.id}/>)}
                </div>
            </div>
            <DialogsFormikForm/>
        </StyledDialogs>
    );
}

export default Dialogs;