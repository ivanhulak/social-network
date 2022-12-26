import React, { useState } from 'react';
import { Field, Formik } from "formik";
import styled from 'styled-components';
import * as yup from 'yup';
import { useSelector } from 'react-redux';
import { AppStateType } from '../../redux/redux-store';
import { ErrorMessage } from '../Profile/Profile/EditProfileFormikForm';
import show_icon from '../../assets/icons/eye-open.png';
import hide_icon from '../../assets/icons/eye-closed.png';
import { LoginFormDataValuesType } from './LoginPage';

type HasErrorType = { hasError: boolean }
const StyledLoginForm = styled.form<HasErrorType>`
   padding: 50px 100px;
   border: 3px solid #886DF5;
   border: ${(props) => `3px solid ${props.hasError ? 'red' : '#886DF5'}`};
   border-radius: 15px;
   .title {
      font-size: 22px;
      color: #886DF5;
      font-weight: 700;
      text-align: center;
      margin-bottom: 15px;
   }
   .email,
   .password,
   .captcha {
      margin-bottom: 15px;
   }
   .rememberMe {
      margin-bottom: 20px;
      span{
         margin-left: 10px;
         color: #886DF5;
         font-weight: 600;
      }
      .rememberMeCheckbox{
         cursor: pointer;
         width: 20px;
         height: 20px;
         accent-color: #926BFF;
         transform: translateY(3px);
      }
   }
   .email p,
   .password p {
      color: #886DF5;
      font-weight: 600;
   }
   .email-input,
   .password-input,
   .captcha-input{
      width: 20vmax;
      margin-top: 5px;
      font-size: 18px;
      border: 1px solid #e3e3e3;
      border-radius: 18px;
      padding: 10px 20px;
      color: ${({ theme }) => theme.headersColor};
   }
   .email-input:focus,
   .password-input:focus,
   .captcha-input:focus {
      border: 1px solid #886DF5;
   }
   .email-input-error,
   .email-input-error:focus,
   .password-input-error,
   .password-input-error:focus{
      border: 1px solid red;
   }
   .showPassword{
      position: absolute;
      right: 15px;
      top: 15px;
   }
`;
const ButtonsBlock = styled.div`
   display: flex;
   justify-content: center;
   align-items: center;
   gap: 15px;
   .formBtn {
      background-color: #8000FF;
      font-size: 18px;
      letter-spacing: 0.015em;
      color: #fff;
      padding: 7px 20px;
      border-radius: 32px;
      border: 2px solid transparent;
      transition: all 0.4s ease;
      &:hover {
         background-color: #B7A8F5;
         border: 2px solid #886DF5;
      }
   }
`;
const validationSchema = yup.object().shape({
   email: yup.string().email().required('Field is required'),
   password: yup.string()
      .typeError('Needs to be a string')
      .required('Field is required')
      .min(3, 'Too Short!')
      .max(16, 'Too Long!'),
})

type PropsType = {
   onSubmitCallback: (formData: LoginFormDataValuesType) => void
}
export const LoginFormikForm: React.FC<PropsType> = React.memo(({ onSubmitCallback }) => {
   const [showPassword, setShowPassword] = useState(false)
   const captchaURL = useSelector((state: AppStateType) => state.auth.captchaURL)
   const loginError = useSelector((state: AppStateType) => state.auth.error)

   const submit = (values: LoginFormDataValuesType, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
      const formData = {
         email: values.email,
         password: values.password,
         rememberMe: values.rememberMe,
         captcha: values.captcha,
      }
      onSubmitCallback(formData)
      setSubmitting(false);
   }
   return (
      <Formik
         initialValues={{ email: '', password: '', rememberMe: false, captcha: null }}
         validateOnBlur
         validationSchema={validationSchema}
         onSubmit={submit}>
         {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting, resetForm }) => (
            <StyledLoginForm onSubmit={handleSubmit} hasError={((errors.email && errors.password) || loginError) ? true : false}>
               <h1 className='title'>Sign in</h1>
               <div className='email'>
                  <p>E-mail</p>
                  <Field
                     type="email"
                     name="email"
                     onChange={handleChange}
                     onBlur={handleBlur}
                     value={values.email}
                     placeholder={'E-mail'}
                     className={errors.email ? 'email-input email-input-error' : 'email-input'}
                  />
                  {errors.email && touched.email && <ErrorMessage>{errors.email}</ErrorMessage>}
               </div>
               <div className='password'>
                  <p>Password</p>
                  <div style={{ position: 'relative' }}>
                     <Field
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.password}
                        placeholder={'Password'}
                        className={errors.password ? 'password-input password-input-error' : 'password-input'}
                     />
                     <span className='showPassword' onClick={() => setShowPassword(prev => !prev)}>
                        {showPassword ? <img src={hide_icon} alt="" /> : <img src={show_icon} alt="" />}
                     </span>
                     {errors.password && touched.password && <ErrorMessage>{errors.password}</ErrorMessage>}
                  </div>
               </div>
               <div className='rememberMe'>
                  <Field
                     type="checkbox"
                     name="rememberMe"
                     className='rememberMeCheckbox' />
                  <span>Remember me</span>
               </div>
               {captchaURL && <div className='captcha'>
                  <img src={captchaURL} alt="" />
                  <div>
                     <Field
                        type='text'
                        name='captcha'
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder={'Anti-bot symbols'}
                        className='captcha-input' />
                  </div>
               </div>}
               <ButtonsBlock>
                  <button type="submit" disabled={isSubmitting} className='formBtn'>Submit</button>
                  <button type="reset" onClick={() => resetForm()} className='formBtn'>Clear</button>
               </ButtonsBlock>
               {loginError && <div style={{color: 'red', textAlign: 'center'}}>{loginError}</div>}
            </StyledLoginForm>
         )}
      </Formik>
   );
})