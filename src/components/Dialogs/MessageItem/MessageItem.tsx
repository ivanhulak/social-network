import React from "react";
import styled from "styled-components";

const Messages = styled.div`
    background-color: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.headersColor};
`;
type PropsType = { message: string }
const MessageItem: React.FC<PropsType> = ({message}) => {
    return (
        <div>
            <Messages>{message}</Messages>
        </div>
    );
}

export default MessageItem;