import React, { useState, useEffect, ChangeEvent } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { updateStatus } from '../../../redux/profile-reducer';
import { AppStateType } from '../../../redux/redux-store';
import edit_status from '../../../assets/profile-icons/edit-status.svg';
import styled from 'styled-components';

const StatusField = styled.div`
   color: #fff;
   font-style: italic;
   font-size: 16px;
   max-width: 250px;
   cursor: pointer;
   img{
      margin-right: 15px;
   }
`;
const StyledStatusInput = styled.input`
   color: #fff;
`;

type PropsType = {
   isOwner: boolean
}
const ProfileStatus: React.FC<PropsType> = ({isOwner}) => {
   const profileStatus = useSelector((state: AppStateType) => state.profilePage.status)
   const dispatch: any = useDispatch()

   let [editMode, setEditMode] = useState(false);
   let [status, setStatus] = useState(profileStatus);

   useEffect(() => {
      setStatus(profileStatus)
   }, [profileStatus])

   const activateEditMode = () => {
      setEditMode(true);
   }
   const deactivateEditMode = () => {
      setEditMode(false);
      dispatch(updateStatus(status));
   }

   const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
      setStatus(e.currentTarget.value);
   }

   return (
      <div>
         {!editMode &&
            <div>
               {isOwner 
                  ? <StatusField onDoubleClick={activateEditMode}>
                        <img src={edit_status} alt="" />
                        {profileStatus || 'Here, could be your status'}
                     </StatusField>
                  : <StatusField >{profileStatus || 'Here, could be your status'}</StatusField>}
            </div>
         }
         {editMode &&
            <div>
               <img src={edit_status} alt="" style={{margin: '0px 15px 0px 0px'}}/>
               <StyledStatusInput autoFocus={true} type="text" onBlur={deactivateEditMode}
                  onChange={onStatusChange} value={status} />
            </div>
         }
      </div>
   );
}

export default ProfileStatus;