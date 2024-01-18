import {useSelector} from "react-redux";
import React from "react";
import {getAuthorisedUser, getIsFetching} from "../../redux/selectors/auth-selectors";
import {getTotalUsersCount, getUsersFiltered, getUsersHeaderImages} from "../../redux/selectors/users-selectors";
import UsersContainer from "../../components/Users/Users";

const FriendsPage = ({}) => {

    const authorisedUser = useSelector(state => getAuthorisedUser(state))
    const userName = authorisedUser && authorisedUser?.fullName?.split(' ')[0];
    const filteredUsers = useSelector(state => getUsersFiltered(state))
    const isFetching = useSelector(state => getIsFetching(state))
    const filteredUsersCount = useSelector(state => getTotalUsersCount(state))
    const headerImages = useSelector(state => getUsersHeaderImages(state))
    const formId = "searchFriendForm";

    return (
        <UsersContainer
            users={filteredUsers}
            isFriend={true}
            isFetching={isFetching}
            title={`${userName}’s Friends (${filteredUsersCount})`}
            formId={formId}
            headerImages={headerImages}
        />
    )
}

export default FriendsPage
