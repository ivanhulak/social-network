import React from 'react';
import { useSelector } from 'react-redux';
import {Preloader} from '../../common/Preloader/Preloader';
import { getIsFetching } from '../../redux/selectors/users-selectors';
import { Users } from './Users';


const UsersPage: React.FC = () => {
   const isFetching = useSelector(getIsFetching)
   return (
      <>
         {isFetching ? <Preloader /> : null}
         <Users/>
      </>
   );
}

export default UsersPage;