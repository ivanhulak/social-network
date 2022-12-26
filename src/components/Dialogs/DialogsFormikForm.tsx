import React from "react";
import { Field, Formik } from "formik";
import * as yup from 'yup';
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { actions } from "../../redux/dialogs-reducer";
import { ErrorMessage } from "../Profile/Profile/EditProfileFormikForm";

const SendButton = styled.button`
    color: #000;
    background-color: #eee;
    font-size: 20px;
    border: 1px solid #000;
    border-radius: 24px;
    padding: 5px 15px;
    cursor: pointer;
    transition: ease 0.3s all;
    &:hover {
        background-color: #000;
        color: #fff;
    }
    &:active {
        background-color: #666;
        color: #fff;
        transform: translate(2px, 3px);
    }
`;
const validationSchema = yup.object().shape({
    sentMessage: yup.string()
        .typeError('Needs to be a string')
        .max(160, 'Too Long!'),
})
type DialogsFormikFormValuesType = { sentMessage: string }
export const DialogsFormikForm: React.FC = React.memo(() => {
    const dispatch: any = useDispatch()
    const submit = (values: DialogsFormikFormValuesType, { setSubmitting, resetForm }:
        { setSubmitting: (isSubmitting: boolean) => void, resetForm: (value: any) => void }) => {
        dispatch(actions.sendMessage(values.sentMessage));
        resetForm('')
        setSubmitting(false);
    }
    return (
        <Formik enableReinitialize={true}
            initialValues={{ sentMessage: '' }}
            validateOnBlur
            validationSchema={validationSchema}
            onSubmit={submit}>
            {({ values, errors, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
                <form onSubmit={handleSubmit} >
                    <Field
                        type='text'
                        as='textarea'
                        name='sentMessage'
                        placeholder='Enter text'
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.sentMessage}
                        style={{ color: '#8000FF' }}
                    />
                    {errors.sentMessage && <ErrorMessage>{errors.sentMessage}</ErrorMessage>}
                    <SendButton type="submit" disabled={isSubmitting}>Send Message</SendButton>
                </form>
            )}
        </Formik >
    );
})