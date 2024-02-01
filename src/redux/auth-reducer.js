import {authAPI, profileAPI} from "../api/api";
import {stopSubmit} from "redux-form";

const SET_USER_ID = 'socialNetwork/auth/SET_USER_ID';
const SET_AUTHORISED_USER = 'socialNetwork/auth/SET_AUTHORISED_USER';
const SET_AUTHORISED_USER_STATUS = 'socialNetwork/auth/SET_AUTHORISED_USER_STATUS';
const IS_FETCHING = 'socialNetwork/auth/IS_FETCHING';
const SET_CAPTCHA_URL = 'socialNetwork/auth/SET_CAPTCHA_URL';
const UPLOAD_IMAGE_SUCCESS = 'socialNetwork/profile/UPLOAD_IMAGE_SUCCESS';

let initialState = {
    authorisedUserId: null,
    authorisedUser: null,
    authorisedUserStatus: null,
    isFetching: false,
}

export const authReducer = (state = initialState, action) => {

    switch (action.type) {
        /*case SET_USER_DATA:
            return {
                ...state,
                ...action.data,
                isAuth: true
            };*/
        case SET_USER_ID:
            return {
                authorisedUserId: action.authorisedUserId,
            };
        case SET_AUTHORISED_USER:
            return {
                ...state,
                authorisedUser: action.authorisedUser
            };
        case SET_AUTHORISED_USER_STATUS:
            return {
                ...state,
                authorisedUserStatus: action.authorisedUserStatus
            };
        case UPLOAD_IMAGE_SUCCESS:
            return {
                ...state,
                authorisedUser: {
                    ...state.authorisedUser,
                    photos: action.photos
                }
            };
        case IS_FETCHING:
            return {
                ...state,
                isFetching: action.isFetching
            };
        case SET_CAPTCHA_URL:
            return {
                ...state,
                captchaUrl: action.captchaUrl
            };
        default:
            return state;
    }
}

export const setUserId = (authorisedUserId) => ({
    type: SET_USER_ID,
    authorisedUserId
})

/*export const setUserData = (userId, email, login) => ({
    type: SET_USER_DATA,
    data: {
        userId,
        email,
        login
    }
})*/

export const setIsFetching = (isFetching) => ({
    type: IS_FETCHING,
    isFetching
})

export const setAuthorisedUser = (authorisedUser) => ({
    type: SET_AUTHORISED_USER,
    authorisedUser
})

export const setAuthorisedUserStatus = (authorisedUserStatus) => ({
    type: SET_AUTHORISED_USER_STATUS,
    authorisedUserStatus
})

export const setCaptchaUrl = (captchaUrl) => ({
    type: SET_CAPTCHA_URL,
    captchaUrl
})

export const uploadImageSuccess = (photos) => ({
    type: UPLOAD_IMAGE_SUCCESS,
    photos
})

export const handleAuth = () => {

    return async (dispatch) => {
        // dispatch(setIsFetching(true))
        try {
            let response = await authAPI.getAuthUserData()
            if (response.data.resultCode === 0) {
                let {id} = response.data.data;
                dispatch(setUserId(id))
                localStorage.setItem("authorisedUserId", id);

                try {
                    let userData = await profileAPI.getUserProfile(id)
                    let userStatus = await profileAPI.getStatus(id)
                    dispatch(setAuthorisedUser(userData))
                    dispatch(setAuthorisedUserStatus(userStatus))
                } catch (error) {
                    console.error(error);
                }
            }
            return response;

        } catch (error) {
            console.error(error);
        }
        //dispatch(setIsFetching(false))

    }
}

export const login = ({email, password, rememberMe, captcha}) => {

    return async (dispatch) => {
        try {
            let response = await authAPI.login({email, password, rememberMe, captcha})

            if (response.data.resultCode === 0) {
                dispatch(setIsFetching(true))
                dispatch(handleAuth())
                //dispatch(setIsFetching(false))
                return;
            }

            const errorMessage = response.data.messages.length > 0
                ? response.data.messages.join(', ')
                : 'Some error'

            dispatch(stopSubmit("login", {
                _error: errorMessage
            }))
            if (response.data.resultCode === 10) { //10
                dispatch(getCaptcha())
            }
        } catch (error) {
            console.error(error);
        }

    }
}

export const logout = () => {

    return async (dispatch) => {
        dispatch(setIsFetching(true))

        try {
            let response = await authAPI.logout()

            if (response.data.resultCode === 0) {
                localStorage.removeItem("authorisedUserId");
                dispatch(setUserId(null)) //WARNING!!! STATE CHANGES IN 2 PLACES
                dispatch(setAuthorisedUser(null)) //WARNING!!! STATE CHANGES IN 2 PLACES
            }
            dispatch(setIsFetching(false))
        } catch (error) {
            console.error(error);
        }

    }
}

export const getCaptcha = () => {

    return async (dispatch) => {

        try {
            let response = await authAPI.getCaptcha()
            dispatch(setCaptchaUrl(response.data.url))
        } catch (error) {
            console.error(error);
        }

    }
}

export default authReducer;
