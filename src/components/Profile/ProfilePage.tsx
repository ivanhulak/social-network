import React, { createContext, useEffect } from "react";
import { setProfile, getStatus } from "../../redux/profile-reducer";
import { AppStateType } from "../../redux/redux-store";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useParams, useNavigate, Params } from "react-router-dom";
import { Profile } from "./Profile/Profile";
import MyPosts from "./MyPosts/MyPosts";

export const OwnerContext = createContext(true);

const ProfilePage: React.FC = () => {
  const authUserId = useSelector((state: AppStateType) => state.auth.userId)
  const dispatch: any = useDispatch()
  const navigate = useNavigate();
  const params: Params<string> = useParams();
  let userId = Number(params.userId)

  const refreshProfile = () => {
    if (!userId) {
      // @ts-ignore
      userId = authUserId;
      if (!userId) {
        navigate('/login');
      }
    }
    dispatch(setProfile(userId));
    dispatch(getStatus(userId));
  }

  const checkIsOwner = (paramsId: any, ownId: number | null) => {
    let isOwner;
    paramsId = Number(paramsId)
    if (paramsId) {
      if (paramsId === ownId) {
        isOwner = true
      } else {
        isOwner = false
      }
    } else {
      isOwner = true
    }
    return isOwner
  }

  const isOwner: boolean = checkIsOwner(params.userId, authUserId)

  useEffect(() => {
    refreshProfile()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.userId])

  return <div>
    {//@ts-ignore
    <OwnerContext.Provider value={{ isOwner: isOwner }}>
      <Profile/>
      <MyPosts />
    </OwnerContext.Provider>
    }
  </div>
}
export default ProfilePage;