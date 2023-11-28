import {authAPI, profileAPI} from "../api/api";
import {setCurrentUser} from "./auth-reducer";

const ADD_POST = 'socialNetwork/profile/ADD_POST';
const DELETE_POST = 'socialNetwork/profile/DELETE_POST';
const SET_USER_PROFILE = 'socialNetwork/profile/SET_USER_PROFILE';
const IS_FETCHING = 'socialNetwork/profile/IS_FETCHING';
const SET_STATUS = 'socialNetwork/profile/GET_STATUS';

let initialState = {
    profile: null,
    status: '',
    isFetching: true,
    posts: [
        {
            message: 'Hi, how are you',
            likes: '3',
            id: 1
        },
        {
            message: "It's my first post",
            likes: '5',
            id: 2
        },
        {
            message: 'Wow, that is cool',
            likes: '13',
            id: 3
        },
        {
            message: "I am so happy to be here!",
            likes: '25',
            id: 4
        },
    ],
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
    ]
}

const profileReducer = (state = initialState, action) => {

    switch (action.type) {
        case ADD_POST:
            let updatedState = {...state};

            let newPost = {
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


export const addPost = (postText) => ({
    type: ADD_POST,
    postText
})

export const deletePost = (postId) => ({
    type: DELETE_POST,
    postId
})


export const setUserProfile = (profile) => ({
    type: SET_USER_PROFILE,
    profile
})

export const setIsFetching = (isFetching) => ({
    type: IS_FETCHING,
    isFetching
})

export const setStatus = (status) => ({
    type: SET_STATUS,
    status
})

export const getProfile = (userId) => {

    return async (dispatch) => {
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

export const getStatus = (userId) => async (dispatch) => {
    dispatch(setIsFetching(true))
    try {
        let response = await profileAPI.getStatus(userId)
        dispatch(setStatus(response))
        dispatch(setIsFetching(false))
    } catch (error) {
        console.error(error);
    }

}

export const updateStatus = (status) => {

    return async (dispatch) => {
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

export const uploadImage = (image, userId) => {

    return async (dispatch) => {
        try {
            let response = await profileAPI.uploadImage(image)
            if (response.resultCode === 0) {
                try {
                    let responseData = await profileAPI.getUserProfile(userId)
                    dispatch(setCurrentUser(responseData)) //WARNING!!! STATE CHANGES IN 2 PLACES
                    dispatch(setUserProfile(responseData)) //WARNING!!! STATE CHANGES IN 2 PLACES
                } catch (error) {
                    console.error(error);
                }
                //getProfile(userId)
                //dispatch(setStatus(status))
            }
        } catch (error) {
            console.error(error);
        }

    }
}


export default profileReducer;
