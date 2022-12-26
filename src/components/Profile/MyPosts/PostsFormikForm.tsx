import { Formik, Field } from 'formik';
import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import * as yup from 'yup';
import { actions } from '../../../redux/profile-reducer';
import { ErrorMessage } from '../Profile/EditProfileFormikForm';

type MyPostsFormDataValuesType = {
   postText: string
}
const CreatePostForm = styled.form`
   margin-bottom: 30px;
   .createPost-textarea{
      z-index: 2;
      position: relative;
      display: block;
      min-height: 80px;
      padding: 15px 130px 15px 15px;
      width: 98%;
      color: #E3E3E3;
      font-weight: 600;
      font-size: 20px;
      resize: vertical;
      background-color:#8000FF;
      border-radius: 0px 30px 30px 30px;
   }
   .createPost-textarea::placeholder {
      color: #E3E3E3;
   }
   .createPost-textarea:focus {
      border: 1px solid #B7A8F5;
   }
   .textarea-error,
   .textarea-error:focus{
      border: 2px solid red;
   }
`;
const CreateButton = styled.button`
   position: absolute;
   right: 35px;
   bottom: 10px;
   z-index: 3;
   background-color: #B7A8F5;
   border-radius: 30px;
   color: #fff;
   font-size: 20px;
   font-weight: 500;
   padding: 5px 15px;
`;
const validationSchema = yup.object().shape({
   postText: yup.string()
      .typeError('Needs to be a string')
      .min(4, 'Too Short!')
      .max(450, 'Too Long!'),
})

export const PostsFormikForm: React.FC = () => {
   const dispatch: any = useDispatch()
   const submit = (values: MyPostsFormDataValuesType, { setSubmitting, resetForm }: 
      { setSubmitting: (isSubmitting: boolean) => void, resetForm: (value: any) =>  void }) => {
      const postData = {
         postText: values.postText
      }
      dispatch(actions.addPost(postData.postText));
      resetForm('')
      setSubmitting(false);
   }
   return (
      <Formik
         initialValues={{ postText: '' }}
         validateOnBlur
         validationSchema={validationSchema}
         onSubmit={submit}>
         {({ errors, isSubmitting, handleSubmit }) => (
            <CreatePostForm onSubmit={handleSubmit}>
               {errors.postText && <ErrorMessage>{errors.postText}</ErrorMessage>}
               <Field as='textarea' type="text" name="postText" placeholder='Type some text...'
                  className={errors.postText ? 'createPost-textarea textarea-error' : 'createPost-textarea'} />
               <CreateButton type="submit" disabled={isSubmitting}>Create</CreateButton>
            </CreatePostForm>
         )}
      </Formik>
   );
}