import {createSelector} from "reselect";

export const getUserProfile = state => state.profilePage.profile
export const getUserStatus = state => state.profilePage.status
export const getPosts = state => state.profilePage.posts
export const getPostText = state => state.profilePage.postText
export const getIsFetching = state => state.profilePage.isFetching
export const getTopHeaderImages = state => state.profilePage.topHeaderImages


const getDialogsSelector = state => {
    console.log('GETDIALOGS')
    return state.profilePage.dialogs
}

/*export const getDialogsSelector = state => {
    console.log('GETDIALOGSSELECTOR')
    return getDialogs(state).filter(u => true)
}*/

export const getDialogs = createSelector(getDialogsSelector, (dialogs) => {
    console.log('GETDIALOGSSUPERSELECTOR')
    return dialogs.filter(d => true)
})
