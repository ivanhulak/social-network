import React, { useState } from 'react';
import styled from 'styled-components';
import { ProfileType } from '../../../types/types';
import Avatar from 'react-avatar-edit';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import "primereact/resources/themes/lara-light-purple/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { useDispatch } from 'react-redux';
import { uploadPhoto } from '../../../redux/profile-reducer';

export const UserAvatar = styled.div`
   flex: 0 1 213px;
   input{
      max-width: 213px;
   }
`;
type CursorType = {cursor: string}
export const AvatarImage = styled.div<CursorType>`
   border: 3px solid transparent;
   transition: all 0.4s ease;
   max-width: 213px;
   max-height: 213px;
   overflow: hidden;
   border-radius: 50%;
   margin-bottom: 20px;
   cursor: ${(props) => props.cursor};
   img{
      width: 100%;
   }
   &:hover{
      border: 3px solid #B7A8F5;
   }
`;
type PropsType = {profile: ProfileType, isOwner: boolean}

export const ProfileAvatar: React.FC<PropsType> = ({ profile, isOwner }) => {
   const [dialogs, setDialogs] = useState(false)
   const [imgCrop, setImgCrop] = useState<any>(false)
   const dispatch: any = useDispatch()

   const onCrop = (view: string) => {
      setImgCrop(view)
   }
   const onClose = () => {
      setImgCrop(null)
   }
   const convertAndUploadImage = async (dataUrl: any) => {
      const base64 = await fetch(dataUrl)
      const blob = await base64.blob();
      let arr = blob.type.split('/')
      let newFile = new File([blob], `image.${arr[arr.length - 1]}`, { type: blob.type })
      dispatch(uploadPhoto(newFile))
      setDialogs(false)
   }

   return (
      <UserAvatar>
         <AvatarImage cursor={isOwner ? 'pointer' : 'default'} onClick={isOwner ? (() => setDialogs(prev => !prev)) : undefined}>
            <img src={profile.photos.small || "https://www.shareicon.net/data/512x512/2016/05/29/772559_user_512x512.png"} alt="" />
         </AvatarImage>
         <Dialog
            visible={dialogs}
            onHide={() => setDialogs(false)}
            header={() => (
               <p>Upload Photo</p>
            )}>
            <div>
               <Avatar width={300}
                  height={300}
                  src={imgCrop}
                  onCrop={onCrop}
                  onClose={onClose} />
               <Button label='Upload' icon='pi pi-check' onClick={() => convertAndUploadImage(imgCrop)} />
            </div>
         </Dialog>
      </UserAvatar>
   );
}