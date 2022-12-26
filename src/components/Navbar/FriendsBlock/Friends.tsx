import React from 'react';
import { useSelector } from 'react-redux';
import { AppStateType } from '../../../redux/redux-store';
import { PhotosType } from '../../../types/types';
import { Friend } from './Friend';

export type FriendType = {
   id: number
   name: string
   photos: PhotosType
}

export const Friends: React.FC = () => {
   const friends = useSelector((state: AppStateType) => state.usersPage.friends)
   return <div>
      {friends.map(f => <Friend key={f.id} id={f.id} name={f.name} photos={f.photos} />)}
   </div>
}