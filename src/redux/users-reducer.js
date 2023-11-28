import {usersAPI} from "../api/api";
import {updateObjectInArray} from "../utils/object-helpers";

const FOLLOW = 'socialNetwork/users/FOLLOW';
const UNFOLLOW = 'socialNetwork/users/UNFOLLOW';
const SET_USERS = 'socialNetwork/users/SET_USERS';
const SET_PAGE = 'socialNetwork/users/SET_PAGE';
const SET_TOTAL_USERS_COUNT = 'socialNetwork/users/SET_TOTAL_USERS_COUNT';
const IS_FETCHING = 'socialNetwork/users/IS_FETCHING';
const IS_FOLLOWING_IN_PROGRESS = 'socialNetwork/users/IS_FOLLOWING_IN_PROGRESS';

let initialState = {
    users: [],
    isFetching: true,
    followingInProgress: [],
    pagination: {
        currentPage: 1,
        pageSize: 4,
        totalUsersCount: 0
    }
}

export const usersReducer = (state = initialState, action) => {

    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, 'id', {followed: true}),
            };
        case UNFOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, 'id', {followed: false}),
            };
        case IS_FOLLOWING_IN_PROGRESS:
            return {
                ...state,
                followingInProgress:
                    action.isFollowingInProgress
                        ?
                        [...state.followingInProgress, action.userId]
                        :
                        state.followingInProgress.filter(id => id !== action.userId)
            };
        case SET_USERS:
            return {
                ...state,
                users: action.users
            };
        case SET_PAGE:
            return {
                ...state,
                pagination: {
                    ...state.pagination,
                    currentPage: action.currentPage
                }

            };
        case SET_TOTAL_USERS_COUNT:
            return {
                ...state,
                pagination: {
                    ...state.pagination,
                    totalUsersCount: action.total
                }
            };

        case IS_FETCHING:
            return {
                ...state,
                isFetching: action.isFetching
            };
        default:
            return state;
    }
}

export const follow = (userId) => ({
    type: FOLLOW,
    userId
})

export const unfollow = (userId) => ({
    type: UNFOLLOW,
    userId
})

export const setUsers = (users) => ({
    type: SET_USERS,
    users
})

export const setPage = (currentPage) => ({
    type: SET_PAGE,
    currentPage
})

export const setTotalUsersCount = (total) => ({
    type: SET_TOTAL_USERS_COUNT,
    total
})

export const setIsFetching = (isFetching) => ({
    type: IS_FETCHING,
    isFetching
})

export const setIsFollowingInProgress = (isFollowingInProgress, userId) => ({
    type: IS_FOLLOWING_IN_PROGRESS,
    isFollowingInProgress,
    userId
})

//thunkCreator:
export const getUsers = (page, pageSize) => {

//thunk:
    return async (dispatch) => {
        dispatch(setIsFetching(true))

        try {
            let response = await usersAPI.getUsers(page, pageSize)
            dispatch(setIsFetching(false))
            dispatch(setUsers(response.items))
            dispatch(setTotalUsersCount(response.totalCount))
        } catch (error) {
            console.error(error);
        }
    }
}

const followUnfollowFlow = async (dispatch, userId, apiMethod, actionCreator) => {

    dispatch(setIsFollowingInProgress(true, userId))
    try {
        let response = await apiMethod(userId)
        if (response.resultCode === 0) {
            dispatch(actionCreator(userId))
        }
        dispatch(setIsFollowingInProgress(false, userId))
    } catch (error) {
        console.error(error);
    }

}

export const followUser = (userId) => {

    return async (dispatch) => {
        await followUnfollowFlow(dispatch, userId, usersAPI.followUser.bind(userId), follow)
    }
}

export const unfollowUser = (userId) => {

    return async (dispatch) => {
        await followUnfollowFlow(dispatch, userId, usersAPI.unfollowUser.bind(userId), unfollow)
    }
}
export default usersReducer;
