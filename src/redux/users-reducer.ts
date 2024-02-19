import {usersAPI} from "../api/api";
import {updateObjectInArray} from "../utils/object-helpers";
import {ActionTypes, HeaderImageType, Nullable, PhotosType} from "../types/types";

const FOLLOW = 'socialNetwork/users/FOLLOW';
const UNFOLLOW = 'socialNetwork/users/UNFOLLOW';

const SET_USERS = 'socialNetwork/users/SET_USERS';
const SET_FILTERED_USERS = 'socialNetwork/users/SET_FILTERED_USERS';

const SET_TOTAL_USERS_COUNT = 'socialNetwork/users/SET_TOTAL_USERS_COUNT';

const SET_PAGE = 'socialNetwork/users/SET_PAGE';
const IS_FETCHING = 'socialNetwork/users/IS_FETCHING';
const IS_FOLLOWING_IN_PROGRESS = 'socialNetwork/users/IS_FOLLOWING_IN_PROGRESS';

type CurrentActionTypes = ActionTypes<typeof actions>

type UserType = {
    id: number,
    name: string,
    status: Nullable<string>,
    photos: PhotosType,
    followed: boolean
}

let initialState = {
    users: null as Nullable<Array<UserType>>,
    filteredUsers: [] as Nullable<Array<UserType>>,
    isFetching: true,
    followingInProgress: [] as Array<number>, //array of users ids
    pagination: {
        currentPage: 1,
        pageSize: 8,
        totalUsersCount: 0
    },
    usersHeaderImages: [
        {
            id: 1,
            image: 'friend1',
        },
        {
            id: 2,
            image: 'friend2',
        },
        {
            id: 3,
            image: 'friend3',
        },
        {
            id: 4,
            image: 'friend4',
        },
        {
            id: 5,
            image: 'friend5',
        },
        {
            id: 6,
            image: 'friend6',
        },
        {
            id: 7,
            image: 'friend7',
        },
        {
            id: 8,
            image: 'friend8',
        },
    ] as Array<HeaderImageType>
}

export type InitialStateType = typeof initialState;

export const usersReducer = (state = initialState, action: CurrentActionTypes): InitialStateType => {

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
        case SET_FILTERED_USERS:
            return {
                ...state,
                filteredUsers: action.filteredUsers
            };
        case SET_TOTAL_USERS_COUNT:
            return {
                ...state,
                pagination: {
                    ...state.pagination,
                    totalUsersCount: action.total
                }
            };
        case SET_PAGE:
            return {
                ...state,
                pagination: {
                    ...state.pagination,
                    currentPage: action.currentPage
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

const actions = {
    follow: (userId: number) => ({
        type: FOLLOW,
        userId
    } as const),
    unfollow: (userId: number) => ({
        type: UNFOLLOW,
        userId
    } as const),
    setUsers: (users: Array<UserType>) => ({
        type: SET_USERS,
        users
    } as const),
    setFilteredUsers: (filteredUsers: Array<UserType>) => ({
        type: SET_FILTERED_USERS,
        filteredUsers
    } as const),
    setTotalUsersCount: (total: number) => ({
        type: SET_TOTAL_USERS_COUNT,
        total
    } as const),
    setPage: (currentPage: number) => ({
        type: SET_PAGE,
        currentPage
    } as const),
    setIsFetching: (isFetching: boolean) => ({
        type: IS_FETCHING,
        isFetching
    } as const),
    setIsFollowingInProgress: (isFollowingInProgress: boolean, userId: number) => ({
        type: IS_FOLLOWING_IN_PROGRESS,
        isFollowingInProgress,
        userId
    } as const)
}

export const {
    follow,
    unfollow,
    setUsers,
    setFilteredUsers,
    setTotalUsersCount,
    setPage,
    setIsFetching,
    setIsFollowingInProgress
} = actions;

//thunkCreator:
export const getUsers = (isFriend: boolean, nameString: string, page: number, pageSize: number) => {

//thunk:
    return async (dispatch: any) => {
        dispatch(setIsFetching(true))

        try {
            let response = await usersAPI.getUsers(isFriend, nameString, page, pageSize)
            dispatch(setIsFetching(false))
            isFriend ? dispatch(setFilteredUsers(response.items)) : dispatch(setUsers(response.items))
            dispatch(setTotalUsersCount(response.totalCount))
        } catch (error) {
            console.error(error);
        }
    }
}

const followUnfollowFlow = async (dispatch: any, userId: number, apiMethod: any, actionCreator: any) => {

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

export const followUser = (userId: number) => {

    return async (dispatch: any) => {
        await followUnfollowFlow(dispatch, userId, usersAPI.followUser.bind(userId), follow)
    }
}

export const unfollowUser = (userId: number) => {

    return async (dispatch: any) => {
        await followUnfollowFlow(dispatch, userId, usersAPI.unfollowUser.bind(userId), unfollow)
    }
}
export default usersReducer;
