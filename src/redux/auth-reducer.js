import {authAPI, profileAPI} from "../api/api";
import {setUserProfile} from "./profile-reducer";
import {stopSubmit} from "redux-form";

const SET_USER_DATA = 'socialNetwork/auth/SET_USER_DATA';
const SET_CURRENT_USER = 'socialNetwork/auth/SET_CURRENT_USER';
const IS_FETCHING = 'socialNetwork/auth/IS_FETCHING';
const SET_CAPTCHA_URL = 'socialNetwork/auth/SET_CAPTCHA_URL';

let initialState = {
    userId: null,
    isFetching: false,
    currentUser: null,
}

export const authReducer = (state = initialState, action) => {

    switch (action.type) {
        /*case SET_USER_DATA:
            return {
                ...state,
                ...action.data,
                isAuth: true
            };*/
        case SET_USER_DATA:
            return {
                userId: action.userId,
            };
        case SET_CURRENT_USER:
            return {
                ...state,
                currentUser: action.currentUser
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

export const setUserData = (userId) => ({
    type: SET_USER_DATA,
    userId
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

export const setCurrentUser = (currentUser) => ({
    type: SET_CURRENT_USER,
    currentUser
})

export const setCaptchaUrl = (captchaUrl) => ({
    type: SET_CAPTCHA_URL,
    captchaUrl
})

export const handleAuth = () => {

    return async (dispatch) => {
        // dispatch(setIsFetching(true))
        try {
            let response = await authAPI.getAuthUserData()
            if (response.data.resultCode === 0) {
                let {id} = response.data.data;
                dispatch(setUserData(id))
                localStorage.setItem("currentUser", id);

                try {
                    let data = await profileAPI.getUserProfile(id)
                    dispatch(setCurrentUser(data))
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
                localStorage.removeItem("currentUser");
                dispatch(setCurrentUser(null)) //WARNING!!! STATE CHANGES IN 2 PLACES
                dispatch(setUserProfile(null)) //WARNING!!! STATE CHANGES IN 2 PLACES
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
