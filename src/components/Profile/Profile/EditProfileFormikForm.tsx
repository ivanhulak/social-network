import React, { useContext } from 'react';
import { Field, Formik, getIn } from "formik";
import * as yup from 'yup';
import styled from 'styled-components';
import instagram from './../../../assets/profile-icons/instagram.svg';
import facebook from './../../../assets/profile-icons/facebook.svg';
import github from './../../../assets/profile-icons/github.svg';
import twitter from './../../../assets/profile-icons/twitter.svg';
import youtube from './../../../assets/profile-icons/youtube.svg';
import down_arrow from './../../../assets/profile-icons/down-arrow.svg';
import contacts from './../../../assets/profile-icons/contacts.svg';
import edit_profile from './../../../assets/profile-icons/edit-profile.svg';
import close from './../../../assets/profile-icons/close.svg';
import { ProfileType } from '../../../types/types';
import { ProfileAvatar } from './ProfileAvatar';
import { EditProfileButton, FullName, LookJob, ProfSkills, ProfSkillsInfo } from './UserProfile';
import ProfileStatus from './ProfileStatus';
import { OwnerContext } from '../ProfilePage';

const UserProfileEditMode = styled.div`
   display: flex;
   justify-content: space-between;
   gap: 40px;
`;
const EditProfileForm = styled.form`
  position: relative;
  flex: 0 1 700px;
  padding: 30px;
  background-color: #B7A8F5;
  box-shadow: 0px 0px 24px 4px #926BFF;
  border-radius: 55px 55px 55px 55px;
  display: flex;
  gap: 50px;
`;
const AboutMe = styled.div`
  text-align: center;
  margin-top: 10px;
  font-size: 20px;
  font-weight: 500;
  p{
    overflow: scroll;
    scroll-behavior: smooth;
    color: #fff;
    background-color: #926BFF;
    padding: 20px;
    border-radius: 40px;
    margin-top: 6px;
  }
  img{
    margin-left: 24px;
    transition: all 0.3s ease;
  }
  img:hover{
    transform: translateY(4px);
  }
  .aboutMeTextarea{
    cursor: pointer;
    max-width: 100%;
    min-height: 75px;
    resize: vertical;
    border: 1px solid transparent;
 }
 .aboutMeTextarea:focus{
    border: 1px solid #B7A8F5;
    outline: none !important;
 }
  .textarea-error,
  .textarea-error:focus{
    border: 1px solid red;
  }
`;
const Contacts = styled.div`
  width: 100%;
  padding-top: 10px;
   img{
      margin-right: 10px;
      width: 26px;
      height: 26px;
   }
   span{
      font-weight: 500;
      font-size: 20px;
   }
`;
const ContactsBlock = styled.div`
  margin-top: 20px;
  .contacts-item{
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 10px;
  }
  .contacts-inputs{
    width: 85%;
    padding: 5px 10px;
    font-size: 12px;
    border: 1px solid #8000FF;
    border-radius: 16px;
  }
  .contacts-error {
    border: 2px solid red;
  }
`;
const CloseEditingButton = styled.button`
  position: absolute;
  right: 30px;
  top: 15px;
  transition: all 0.4s ease;
   &:hover{
      transform: translate(4px, 4px);
   }
`;
export const ErrorMessage = styled.div`
  color: red;
  font-size: 14px;
  font-weight: 400;
`;
// --------------  Validation  ---------------
//eslint-disable-next-line
const URL = /^((https?|ftp):\/\/)?(www.)?(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i
const validationSchema = yup.object().shape({
  fullName: yup.string()
    .typeError('Needs to be a string')
    .required('Field is required')
    .min(3, 'Too Short!')
    .max(25, 'Too Long!'),
  lookingForAJobDescription: yup.string()
    .typeError('Needs to be a string')
    .required('Field is required')
    .min(5, 'Too Short!')
    .max(160, 'Too Long!'),
  aboutMe: yup.string()
    .typeError('Needs to be a string')
    .required('Field is required')
    .min(5, 'Too Short!')
    .max(160, 'Too Long!'),
  contacts: yup.object({
    instagram: yup.string()
      .matches(URL, 'Enter a valid url')
      .required('Please enter website'),
    facebook: yup.string()
      .matches(URL, 'Enter a valid url')
      .required('Please enter website'),
    github: yup.string()
      .matches(URL, 'Enter a valid url')
      .required('Please enter website'),
    youtube: yup.string()
      .matches(URL, 'Enter a valid url')
      .required('Please enter website'),
    twitter: yup.string()
      .matches(URL, 'Enter a valid url')
      .required('Please enter website'),
  })
})
// -------------------------------------------
type ProfileDataFormType = {
  fullName: string
  aboutMe: string
  lookingForAJob: boolean
  lookingForAJobDescription: string
  contacts: any
}
type PropsType = {
  onSubmitCallback: (formData: any) => void
  profile: ProfileType
  goToEditMode: () => void
}
export const EditProfileFormikForm: React.FC<PropsType> = React.memo(({ goToEditMode, profile, onSubmitCallback }) => {
  //@ts-ignore
  const {isOwner} = useContext(OwnerContext)
  const submit = (values: ProfileDataFormType, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
    const profile = {
      fullName: values.fullName,
      aboutMe: values.aboutMe,
      lookingForAJob: values.lookingForAJob,
      lookingForAJobDescription: values.lookingForAJobDescription,
      contacts: values.contacts,
    }
    onSubmitCallback(profile);
    setSubmitting(false);
  }
  return (
    <Formik enableReinitialize={true}
      initialValues={{
        fullName: profile.fullName,
        aboutMe: profile.aboutMe,
        lookingForAJob: profile.lookingForAJob,
        lookingForAJobDescription: profile.lookingForAJobDescription,
        contacts: {
          instagram: profile.contacts.instagram || '',
          twitter: profile.contacts.twitter || '',
          youtube: profile.contacts.youtube || '',
          facebook: profile.contacts.facebook || '',
          github: profile.contacts.github || '',
        }
      }}
      validateOnBlur
      validationSchema={validationSchema}
      onSubmit={submit}>
      {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
        <UserProfileEditMode>
          <ProfileAvatar profile={profile} isOwner={isOwner} />
          <EditProfileForm onSubmit={handleSubmit} >
            <div style={{ maxWidth: '243px' }}>
              <FullName>
                <Field type="text" name="fullName" onChange={handleChange} onBlur={handleBlur}
                  value={values.fullName} className={errors.fullName ? 'styled-input input-error' : 'styled-input'} />
                {errors.fullName && touched.fullName
                  && <ErrorMessage>{errors.fullName}</ErrorMessage>}
              </FullName>
              <ProfileStatus isOwner={isOwner} />
              <LookJob>
                <span>Looking for a job</span>
                <Field type="checkbox" name="lookingForAJob" className='lookJobCheckbox' />
              </LookJob>
              <ProfSkills>
                <span>Professional skills</span>
                <img src={down_arrow} alt="" />
              </ProfSkills>
              <ProfSkillsInfo>
                <Field as='textarea' name="lookingForAJobDescription" onChange={handleChange}
                  onBlur={handleBlur} value={values.lookingForAJobDescription}
                  className={errors.lookingForAJobDescription ? 'lookJobTextarea textarea-error' : 'lookJobTextarea'} />
                {errors.lookingForAJobDescription && touched.lookingForAJobDescription
                  && <ErrorMessage>{errors.lookingForAJobDescription}</ErrorMessage>}
              </ProfSkillsInfo>
              <AboutMe>
                <span>About me</span>
                <img src={down_arrow} alt="" />
                <p><Field as='textarea' name="aboutMe" onChange={handleChange}
                  onBlur={handleBlur} value={values.aboutMe}
                  className={errors.aboutMe ? 'aboutMeTextarea textarea-error' : 'aboutMeTextarea'} /></p>
                {errors.aboutMe && touched.aboutMe && <ErrorMessage>{errors.aboutMe}</ErrorMessage>}
              </AboutMe>
            </div>
            <Contacts>
              <img src={contacts} alt="" />
              <span>Contacts</span>
              <ContactsBlock>
                <div className='contacts-item'>
                  <img src={instagram} alt="" />
                  <Field name='contacts.instagram' type="text" onChange={handleChange}
                    onBlur={handleBlur} value={values.contacts.instagram}
                    className={getIn(errors, 'contacts.instagram') ? 'contacts-inputs contacts-error' : 'contacts-inputs'} />
                  {getIn(touched, 'contacts.instagram') && getIn(errors, 'contacts.instagram') &&
                    <ErrorMessage>{getIn(errors, 'contacts.instagram')}</ErrorMessage>}
                </div>
                <div className='contacts-item'>
                  <img src={facebook} alt="" />
                  <Field name='contacts.facebook' type="text" onChange={handleChange}
                    onBlur={handleBlur} value={values.contacts.facebook}
                    className={getIn(errors, 'contacts.facebook') ? 'contacts-inputs contacts-error' : 'contacts-inputs'} />
                  {getIn(touched, 'contacts.facebook') && getIn(errors, 'contacts.facebook') &&
                    <ErrorMessage>{getIn(errors, 'contacts.facebook')}</ErrorMessage>}
                </div>
                <div className='contacts-item'>
                  <img src={github} alt="" />
                  <Field name='contacts.github' type="text" onChange={handleChange}
                    onBlur={handleBlur} value={values.contacts.github}
                    className={getIn(errors, 'contacts.github') ? 'contacts-inputs contacts-error' : 'contacts-inputs'} />
                  {getIn(touched, 'contacts.github') && getIn(errors, 'contacts.github') &&
                    <ErrorMessage>{getIn(errors, 'contacts.github')}</ErrorMessage>}
                </div>
                <div className='contacts-item'>
                  <img src={youtube} alt="" />
                  <Field name='contacts.youtube' type="text" onChange={handleChange}
                    onBlur={handleBlur} value={values.contacts.youtube}
                    className={getIn(errors, 'contacts.youtube') ? 'contacts-error' : 'contacts-inputs'} />
                  {getIn(touched, 'contacts.youtube') && getIn(errors, 'contacts.youtube') &&
                    <ErrorMessage>{getIn(errors, 'contacts.youtube')}</ErrorMessage>}
                </div>
                <div className='contacts-item'>
                  <img src={twitter} alt="" />
                  <Field name='contacts.twitter' type="text" onChange={handleChange}
                    onBlur={handleBlur} value={values.contacts.twitter}
                    className={getIn(errors, 'contacts.twitter') ? 'contacts-inputs contacts-error' : 'contacts-inputs'} />
                  {getIn(touched, 'contacts.twitter') && getIn(errors, 'contacts.twitter') &&
                    <ErrorMessage>{getIn(errors, 'contacts.twitter')}</ErrorMessage>}
                </div>
                {/* {Object.keys(profile.contacts).map(key => {
                      return <Field key={key} name={`contacts.${key}`} type="text" className='contacts-inputs' />})} */}
              </ContactsBlock>
            </Contacts>
            <EditProfileButton type="submit" disabled={isSubmitting}><img src={edit_profile} alt="" /></EditProfileButton>
            <CloseEditingButton onClick={goToEditMode}><img src={close} alt="" /></CloseEditingButton>
          </EditProfileForm>
        </UserProfileEditMode>
      )}
    </Formik>
  );
})


