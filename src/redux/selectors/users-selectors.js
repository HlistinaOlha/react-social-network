import {createSelector} from "reselect";

export const getAllUsers = state => state.usersPage.users
export const getUsersFiltered = state => state.usersPage.filteredUsers
export const getTotalUsersCount = state => state.usersPage.pagination.totalUsersCount;
export const getIsFetching = state => state.usersPage.isFetching;
export const getPageSize = state => state.usersPage.pagination.pageSize
export const getCurrentPage = state => state.usersPage.pagination.currentPage
export const getUsersHeaderImages = state => state.usersPage.usersHeaderImages
export const getFollowingInProgress = state => state.usersPage.followingInProgress

export const getFilteredReversedUsers = createSelector(getUsersFiltered, (filteredUsers) => {
    return [...filteredUsers].reverse();
})

//fake examples
export const getUsersSelector = state => {
    return getAllUsers(state).filter(u => true)
}

export const getUsersSuperSelector = createSelector(getAllUsers, (users) => {
    return users.filter(u => true)
})
