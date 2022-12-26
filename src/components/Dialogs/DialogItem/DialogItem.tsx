import React from "react";
import { NavLink } from 'react-router-dom';

type PropsType = { photo: string, id: number, name: string }
const DialogItem: React.FC<PropsType> = ({photo, id, name}) => {
    return (
        <div>
            <img style={{maxWidth: '50px'}} src={photo} alt="" />
            <NavLink to={`/dialog/${id}`}>{name}</NavLink>
        </div>
    );
}

export default DialogItem;