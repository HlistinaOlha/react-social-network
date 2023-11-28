import {createSelector} from "reselect";

export const getUsers = state => {
    return state.usersPage.users
}

export const getUsersSelector = state => {
    return getUsers(state).filter(u => true)
}

export const getUsersSuperSelector = createSelector(getUsers,(users) => {
   return users.filter(u => true)
})
