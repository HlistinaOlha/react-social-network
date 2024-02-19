import {profileAPI} from "../api/api";
import {setAuthorisedUser, uploadImageSuccess} from "./auth-reducer";
import {stopSubmit, reset} from "redux-form";
import {ActionTypes, HeaderImageType, Nullable, ProfileType} from "../types/types";
import { AxiosError } from 'axios'

const ADD_POST = 'socialNetwork/profile/ADD_POST';
const EDIT_POST = 'socialNetwork/profile/EDIT_POST';
const DELETE_POST = 'socialNetwork/profile/DELETE_POST';
const SET_USER_PROFILE = 'socialNetwork/profile/SET_USER_PROFILE';
const IS_FETCHING = 'socialNetwork/profile/IS_FETCHING';
const SET_STATUS = 'socialNetwork/profile/GET_STATUS';

type PostType = {
    message: string,
    likes: number,
    id: number
}

type DialogType = {
    name: string,
    id: number
}

let initialState = {
    profile: null as Nullable<ProfileType>,
    status: null as Nullable<string>,
    isFetching: true,
    topHeaderImages: [
        {
            id: 1,
            image: 'topHeader1',
        },
        {
            id: 2,
            image: 'topHeader2',
        },
    ] as Array<HeaderImageType>,
    posts: [
        {
            message: 'Hi, how are you',
            likes: 3,
            id: 1
        },
        {
            message: "It's my first post",
            likes: 5,
            id: 2
        },
        {
            message: 'Wow, that is cool',
            likes: 13,
            id: 3
        },
        {
            message: "I am so happy to be here!",
            likes: 25,
            id: 4
        },
    ] as Array<PostType>,
    dialogs: [
        {
            name: 'Alex',
            id: 1
        },
        {
            name: 'Olha',
            id: 2
        },
        {
            name: 'Sam',
            id: 3
        },
        {
            name: 'Lena',
            id: 4
        },
    ] as Array<DialogType>
}

export type InitialStateType = typeof initialState;

type CurrentActionTypes = ActionTypes<typeof actions>

const profileReducer = (state = initialState, action: CurrentActionTypes): InitialStateType => {

    switch (action.type) {
        case ADD_POST:
            let updatedState = {...state};

            let newPost: PostType = {
                message: action.postText,
                likes: 0,
                id: state.posts.length + 1
            }

            if (newPost.message && newPost.message.trim()) {

                updatedState = {
                    ...state,
                    posts: [...state.posts, newPost],
                }
            }
            return updatedState;
        case EDIT_POST:
            return {
                ...state,
                posts: state.posts.map(post => (post.id === action.postId) ? {...post, message: action.postText} : post)
            };
        case DELETE_POST:
            return {
                ...state,
                posts: state.posts.filter(post => post.id !== action.postId)
            }
        case SET_USER_PROFILE:
            return {
                ...state,
                profile: action.profile
            };
        case IS_FETCHING:
            return {
                ...state,
                isFetching: action.isFetching
            };

        case SET_STATUS:
            return {
                ...state,
                status: action.status
            };
        default:
            return state;
    }
}

const actions = {
    addPost: (postText: string) => ({
        type: ADD_POST,
        postText
    } as const),
    editPost: (postId: Nullable<number>, postText: string) => ({
        type: EDIT_POST,
        postId,
        postText
    } as const),
    deletePost: (postId: Nullable<number>) => ({
        type: DELETE_POST,
        postId
    } as const),
    setUserProfile: (profile: Nullable<ProfileType>) => ({
        type: SET_USER_PROFILE,
        profile
    } as const),
    setIsFetching: (isFetching: boolean) => ({
        type: IS_FETCHING,
        isFetching
    } as const),
    setStatus: (status: Nullable<string>) => ({
        type: SET_STATUS,
        status
    } as const)
}

export const {
    addPost,
    editPost,
    deletePost,
    setUserProfile,
    setIsFetching,
    setStatus
} = actions;

export const getProfile = (userId: number) => {

    return async (dispatch: any) => {
        dispatch(setIsFetching(true))
        try {
            let response = await profileAPI.getUserProfile(userId)
            dispatch(setIsFetching(false))
            dispatch(setUserProfile(response))
        } catch (error) {
            console.error(error);
        }

    }
}

export const getStatus = (userId: number) => async (dispatch: any) => {
    dispatch(setIsFetching(true))
    try {
        let response = await profileAPI.getStatus(userId)
        dispatch(setStatus(response))
        dispatch(setIsFetching(false))
    } catch (error) {
        console.error(error);
    }

}

export const updateStatus = (status: string) => {

    return async (dispatch: any) => {
        try {
            let response = await profileAPI.updateStatus(status)
            if (response.resultCode === 0) {
                dispatch(setStatus(status))
            }
        } catch (error) {
            console.error(error);
        }

    }
}

export const uploadImage = (image: string) => { //image is OBJECT?????

    return async (dispatch: any) => {
        dispatch(setIsFetching(true))

        try {

            let response = await profileAPI.uploadImage(image)
            if (response.resultCode === 0) {
                dispatch(uploadImageSuccess(response.data.photos))
                dispatch(reset('uploadImage'));
            }

        } catch (error: unknown) {
            console.error(error);
            //errorResponse = error;

               const errorMessage = 'Uploading image failed'

          if (error  instanceof AxiosError && error.response && error.response.data) {
                 const serverErrorMessage = `${errorMessage}: ${error.message}. ${error.response.data.message}`

                 dispatch(stopSubmit('uploadImage', {
                     _error: serverErrorMessage,
                     inputFile: serverErrorMessage
                 }));
             } else {
                 dispatch(stopSubmit('uploadImage', {
                     _error: errorMessage,
                     inputFile: errorMessage
                 }));
             }
        } finally {
            dispatch(setIsFetching(false))
        }
    }
}

export const editProfile = (profile: ProfileType) => {

    return async (dispatch: any) => {
        dispatch(setIsFetching(true))

        try {
            let response = await profileAPI.editProfile(profile)
            if (response.resultCode === 0) {
                let userData = await profileAPI.getUserProfile(profile.userId)
                dispatch(setAuthorisedUser(userData))
                //dispatch(setAuthorisedUser(profile)) //??? do we need this dispatch, or need to load new profile?
            }
        } catch (error) {
            console.error(error);
        } finally {
            dispatch(setIsFetching(false))
        }

    }
}


export default profileReducer;
