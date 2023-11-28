import {createSelector} from "reselect";

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
