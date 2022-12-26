import React, { useEffect } from "react";
import { UserItem } from "./UserItem/UserItem";
import Paginator from '../../common/Pagination/Paginator';
import UsersSearchForm from "./UsersSearchForm";
import { FilterType, follow, requestUsers, unfollow } from "../../redux/users-reducer";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
    getCurrentPage, getFilterUsers, getFollowingInProgress,
    getPageSize, getTotalItemsCount, getUsers
} from "../../redux/selectors/users-selectors";
import { useNavigate, useSearchParams } from "react-router-dom";
import styled from "styled-components";

const StyledUsers = styled.div`
    padding: 0px 20px;
    .usersSearchForm{
        margin-bottom: 30px;
    }
    .userItemsRow{
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 10px;
        margin-bottom: 20px;
    }
    .paginationBlock{
        display: flex;
        justify-content: center;
        gap: 10px;
    }
`;
export const Users: React.FC = () => {
    const users = useSelector(getUsers)
    const followingInProgress = useSelector(getFollowingInProgress)
    const filter = useSelector(getFilterUsers)
    const pageSize = useSelector(getPageSize)
    const currentPage = useSelector(getCurrentPage)
    const totalItemsCount = useSelector(getTotalItemsCount)
    const navigate = useNavigate()
    const [searchParams]: any = useSearchParams();
    const dispatch: any = useDispatch()
    
    const followCallback = (userId: number) => {
        dispatch(follow(userId))
    }
    const unfollowCallback = (userId: number) => {
        dispatch(unfollow(userId))
    }

    useEffect(() => {
        const searchParamsObj = Object.fromEntries([...searchParams]);
        const {term, friend, page} = searchParamsObj
        let actualPage = currentPage
        let actualFilter = filter
        if (page) actualPage = Number(searchParamsObj.page)
        if (term) actualFilter = {...actualFilter, term: term}
        switch(friend){
            case 'null':
                actualFilter = {...actualFilter, friend: null}
                break
            case 'true':
                actualFilter = {...actualFilter, friend: true}
                break
            case 'false':
                actualFilter = {...actualFilter, friend: false}
                break
        }
        dispatch(requestUsers(actualPage, pageSize, actualFilter))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    useEffect(() => {
        navigate(`/users?term=${filter.term}&friend=${filter.friend}&page=${currentPage}`)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filter, currentPage])

    const onPageChanged = (page: number) => {
        dispatch(requestUsers(page, pageSize, filter))
    }

    const onFilterChanged = (filter: FilterType) => {
        dispatch(requestUsers(1, pageSize, filter))
    }

    return (
        <StyledUsers>
            <div className='usersSearchForm'>
                <UsersSearchForm onFilterChanged={onFilterChanged} />
            </div>
            <div className='userItemsRow'>
                {users.map(u => <UserItem key={u.id} userId={u.id}
                    userPhoto={u.photos.small}
                    followed={u.followed}
                    userName={u.name}
                    followingInProgress={followingInProgress}
                    follow={followCallback}
                    unfollow={unfollowCallback}
                    />)}
            </div>
            <div className='paginationBlock'>
                <Paginator currentPage={currentPage} totalItemsCount={totalItemsCount}
                    pageSize={pageSize} onPageChanged={onPageChanged} portionSize={10} />
            </div>
        </StyledUsers>
    );
}