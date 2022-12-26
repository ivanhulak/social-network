import React from "react";
import { Navigate } from "react-router-dom";
import { AppStateType } from "../../redux/redux-store";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { LoginFormikForm } from "./LoginFormikForm";
import { login } from "../../redux/auth-reducer";

const StyledForm = styled.div`
   display: flex;
   justify-content: center;
   align-items: center;
`;
export type LoginFormDataValuesType = {
   email: string
   password: string
   rememberMe: boolean
   captcha: string | null
}
export const LoginPage: React.FC = () => {
   const isAuth = useSelector((state: AppStateType) => state.auth.isAuth)
   const userId = useSelector((state: AppStateType) => state.auth.userId)
   const dispatch: any = useDispatch()

   const onSubmitCallback = (formData: LoginFormDataValuesType) => {
      dispatch(login(formData.email, formData.password, formData.rememberMe, formData.captcha));
   }
   if (isAuth) {
      return <Navigate to={`/profile/${userId}`} />
   }
   return (
      <StyledForm>
         <LoginFormikForm onSubmitCallback={onSubmitCallback}/>
      </StyledForm>
   )
}