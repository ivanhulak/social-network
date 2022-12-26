import React from 'react';
import { Field, Formik } from "formik";
import { FilterType } from '../../redux/users-reducer';
import { useSelector } from 'react-redux';
import { AppStateType } from '../../redux/redux-store';
import styled from 'styled-components';
import loupe from '../../assets/icons/loupe.png';

const StyledSearchForm = styled.form`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 30px;
    .inputTerm{
        padding: 7px 10px 7px 40px;
        border: none;
        background: url(${loupe}) 10px center no-repeat;
        background-color: rgb(227, 227, 227);
        font-size: 18px;
        border-radius: 24px;
        transition: all .3s ease;
        cursor: pointer;
        border: 1px solid rgb(227, 227, 227);
        &:hover {
            background-color: ${({ theme }) => theme.usersSearch};
            border: 1px solid rgb(136, 109, 245);
        }
        &:focus {
            background-color: ${({ theme }) => theme.usersSearch};
            outline: none;
        }
    }
    .selectField{
        width: 100%;
        min-width: 15ch;
        max-width: 30ch;
        border: 1px solid var(--select-border);
        border-radius: 0.25em;
        padding: 0.25em 0.5em;
        font-size: 1.25rem;
        cursor: pointer;
        line-height: 1.1;
        background-color: #fff;
        background-image: linear-gradient(to top, #f1f1f1, #fff 33%);
        &:focus{
            outline: none;
        }
    }
`;
const SearchButton = styled.button`
    font-size: 18px;
    padding: 6px 15px;
    border-radius: 10px;
    background-color: rgb(227, 227, 227);
    transition: .3s all ease;
    border: 1px solid #eee;
    cursor: pointer;
    &:hover {
        background-color: ${({ theme }) => theme.usersSearch};
        border: 1px solid rgb(136, 109, 245);
    }
`;
type FriendType = 'true' | 'false' | 'null'
type FormType = {
    term: string,
    friend: FriendType
}
type PropsType = {
    onFilterChanged: (filter: FilterType) => void
}
const UsersSearchForm: React.FC<PropsType> = React.memo(({ onFilterChanged }) => {
    const filter = useSelector((state: AppStateType) => state.usersPage.filter)

    const submit = (values: FormType, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
        const filter: FilterType = {
            term: values.term,
            friend: values.friend === 'null' ? null : (values.friend === 'true') ? true : false
        }
        onFilterChanged(filter);
        setSubmitting(false);
    }
    return (
        <Formik enableReinitialize={true}
            initialValues={{ term: filter.term, friend: String(filter.friend) as FriendType }}
            onSubmit={submit}>

            {({ handleSubmit, isSubmitting, }) => (
                <StyledSearchForm onSubmit={handleSubmit}>
                    <Field type="text" name="term" className='inputTerm' />
                    <Field as="select" name="friend" className='selectField'>
                        <option value="null">All Users</option>
                        <option value="true">Only friends</option>
                        <option value="false">Only not friends</option>
                    </Field>
                    <SearchButton type="submit" disabled={isSubmitting}>Search</SearchButton>
                </StyledSearchForm>
            )}
        </Formik>
    );
})

export default UsersSearchForm;