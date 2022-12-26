import React, { useState } from 'react';
import add_big_image from './../../../assets/profile-icons/add-big-image.svg';
import styled from 'styled-components';
import {Preloader} from '../../../common/Preloader/Preloader';
import { useDispatch } from 'react-redux';
import { upgradeProfile } from '../../../redux/profile-reducer';
import { UserProfileBlock } from './UserProfile';
import { EditProfileFormikForm } from './EditProfileFormikForm';
import { useSelector } from 'react-redux';
import { AppStateType } from '../../../redux/redux-store';

const StyledProfile = styled.div`
   margin: 0px 10px;
   margin-bottom: 40px;
`;
const BigImage = styled.div`
   display: flex;
   justify-content: center;
   align-items: center;
   height: 210px;
   background-color: #8000FF;
   margin-bottom: 50px;
   p{
      font-size: 48px;
      font-weight: 500;
      color: #B7A8F5;
      margin-right: 30px;
   }
`;

export const Profile: React.FC = () => {
   const profile = useSelector((state: AppStateType) => state.profilePage.profile)
   const [editMode, setEditMode] = useState(false);
   const dispatch: any = useDispatch()

   const onSubmitCallback = (formData: any) => {
      dispatch(upgradeProfile(formData));
      setEditMode(false);
   }
   const goToEditMode = () => {
      setEditMode(!editMode);
   }
   return (
      <>
         {(!profile)
            ? <Preloader />
            : <StyledProfile>
               <BigImage>
                  <p>Add photo</p>
                  <button><img src={add_big_image} alt="" /></button>
               </BigImage>
               <div>
                  {editMode
                     ? <EditProfileFormikForm profile={profile} onSubmitCallback={onSubmitCallback}
                           goToEditMode={goToEditMode} />
                     : <UserProfileBlock profile={profile} goToEditMode={goToEditMode} />}
               </div>
            </StyledProfile>
         }
      </>
   );
}

