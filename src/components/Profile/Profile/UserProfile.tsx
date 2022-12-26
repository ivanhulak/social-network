import React, { useContext } from 'react';
import instagram from './../../../assets/profile-icons/instagram.svg';
import facebook from './../../../assets/profile-icons/facebook.svg';
import github from './../../../assets/profile-icons/github.svg';
import twitter from './../../../assets/profile-icons/twitter.svg';
import youtube from './../../../assets/profile-icons/youtube.svg';
import done_icon from './../../../assets/profile-icons/done.svg';
import minus_icon from './../../../assets/profile-icons/minus.svg';
import down_arrow from './../../../assets/profile-icons/down-arrow.svg';
import up_arrow from './../../../assets/profile-icons/up-arrow.svg';
import contacts from './../../../assets/profile-icons/contacts.svg';
import edit_profile from './../../../assets/profile-icons/edit-profile.svg';
import styled from 'styled-components';

import ProfileStatus from './ProfileStatus';
import { ProfileAvatar } from './ProfileAvatar';
import { ProfileType } from '../../../types/types';
import { OwnerContext } from '../ProfilePage';

const UserProfile = styled.div`
   display: flex;
   justify-content: space-between;
   gap: 40px;
`;
export const UserInfo = styled.div`
   position: relative;
   flex: 0 1 700px;
   padding: 30px;
   background-color: #B7A8F5;
   box-shadow: 0px 0px 24px 4px #926BFF;
   border-radius: 55px 55px 55px 55px;
   display: flex;
   gap: 50px;
`;
export const FullName = styled.div`
   max-width: 100%;
   overflow: scroll;
   font-weight: 700;
   font-size: 30px;
   .styled-input {
      max-width: 100%;
      border-radius: 21px;
      border: 1px solid transparent;
      transition: all 0.2s ease;
   }
   .styled-input:focus {
      border: 1px solid #926BFF;
   }
   .input-error,
   .input-error:focus{
      border: 2px solid red;
   }
`;
export const LookJob = styled.div`
   margin: 10px 0px;
   background-color: #fff;
   padding: 10px 14px;
   border-radius: 21px;
   span{
      font-size: 20px;
      margin-right: 16px;
   }
   img{
      width: 26px;
      height: 26px;
   }
   .lookJobCheckbox{
      position: relative;
      cursor: pointer;
      width: 20px;
      height: 20px;
      accent-color: #926BFF;
      transform: translateY(3px);
   }
`;
export const ProfSkills = styled.div`
   margin-bottom: 10px;
   background-color: #8000FF;
   padding: 10px 14px;
   border-radius: 21px;
   span{
      font-size: 20px;
      margin-right: 13px;
   }
   img{
      transition: all 0.3s ease;
   }
   img:hover{
      transform: translateY(4px);
   }
`;
export const ProfSkillsInfo = styled.div`
   background-color: #CAB7FF;
   font-size: 18px;
   padding: 10px 20px;
   border-radius: 0px 24px 24px 24px;
   min-height: 30px;
   .lookJobTextarea{
      cursor: pointer;
      max-width: 100%;
      min-height: 70px;
      resize: vertical;
      border: 1px solid transparent;
   }
   .lookJobTextarea:focus{
      border: 1px solid #B7A8F5;
      outline: none !important;
   }
   .textarea-error,
   .textarea-error:focus{
      border: 1px solid red;
   }
`;
export const AboutMe = styled.div`
   font-size: 20px;
   font-weight: 500;
   margin-bottom: 55px;
   p{
      max-width: 300px;
      overflow: scroll;
      scroll-behavior: smooth;
      color: #fff;
      background-color: #926BFF;
      padding: 20px;
      border-radius: 40px;
      margin-bottom: 6px;
   }
   img{
      margin-right: 24px;
      transition: all 0.3s ease;
   }
   img:hover{
      transform: translateY(-4px);
   }
`;
const Contacts = styled.div`
   img{
      margin-right: 20px;
      width: 26px;
      height: 26px;
   }
   span{
      font-weight: 500;
      font-size: 20px;
   }
   ul{
      margin-top: 20px;
      display: flex;
      max-width: 195px;
      gap: 25px;
   }
   ul li{
    transition: all 0.3s ease;
   }
   ul li:hover{
    transform: translateY(4px);
   }
`;
export const EditProfileButton = styled.button`
   position: absolute;
   right: 25px;
   bottom: 25px;
   transition: all 0.4s ease;
   &:hover{
      transform: translate(2px, 2px);
   }
`;

type PropsType = { profile: ProfileType, goToEditMode: () => void }
export const UserProfileBlock: React.FC<PropsType> = ({ profile, goToEditMode }) => {
   //@ts-ignore
   const {isOwner} = useContext(OwnerContext)
   return (
      <UserProfile>
         <ProfileAvatar profile={profile} isOwner={isOwner} />
         <UserInfo>
            <div style={{ maxWidth: '243px' }}>
               <div style={{ fontWeight: '700', fontSize: '30px' }}>{profile.fullName}</div>
               <ProfileStatus isOwner={isOwner} />
               <LookJob>
                  <span>Looking for a job</span>
                  {profile.lookingForAJob ? <img src={done_icon} alt="" /> : <img src={minus_icon} alt="" />}
               </LookJob>
               <ProfSkills>
                  <span>Professional skills</span>
                  <img src={down_arrow} alt="" />
               </ProfSkills>
               <ProfSkillsInfo>{profile.lookingForAJobDescription}</ProfSkillsInfo>
            </div>
            <div>
               <AboutMe>
                  <p>{profile.aboutMe}</p>
                  <img src={up_arrow} alt="" />
                  <span>About me</span>
               </AboutMe>
               <Contacts>
                  <img src={contacts} alt="" />
                  <span>Contacts</span>
                  <ul>
                     <li><a rel="noopener noreferrer" target="_blank" href={profile.contacts.instagram}>
                        <img src={instagram} alt="" /></a></li>
                     <li><a rel="noopener noreferrer" target="_blank" href={profile.contacts.facebook}>
                        <img src={facebook} alt="" /></a></li>
                     <li><a rel="noopener noreferrer" target="_blank" href={profile.contacts.github}>
                        <img src={github} alt="" /></a></li>
                     <li><a rel="noopener noreferrer" target="_blank" href={profile.contacts.youtube}>
                        <img src={youtube} alt="" /></a></li>
                     <li><a rel="noopener noreferrer" target="_blank" href={profile.contacts.twitter}>
                        <img src={twitter} alt="" /></a></li>
                  </ul>
               </Contacts>
            </div>
            {isOwner && <EditProfileButton onClick={goToEditMode}><img src={edit_profile} alt="" /></EditProfileButton>}
         </UserInfo>
      </UserProfile>
   );
}

