//export const auth = state => state.auth

export const getCurrentUser = state => state.auth.currentUser
export const getLoginName = state => state.auth.login
export const getIsFetching = state => state.auth.isFetching
export const getCaptchaUrl = state => state.auth.captchaUrl
