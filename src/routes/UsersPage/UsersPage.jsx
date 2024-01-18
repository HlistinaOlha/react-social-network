import {useSelector} from "react-redux";
import React from "react";
import {getIsFetching} from "../../redux/selectors/auth-selectors";
import {getAllUsers, getTotalUsersCount, getUsersHeaderImages} from "../../redux/selectors/users-selectors";
import UsersContainer from "../../components/Users/Users";

const UsersPage = ({}) => {

    const users = useSelector(state => getAllUsers(state))
    const isFetching = useSelector(state => getIsFetching(state))
    const headerImages = useSelector(state => getUsersHeaderImages(state))
    const totalUsersCount = useSelector(state => getTotalUsersCount(state))
    const formId = "searchUserForm";

    return (
            <UsersContainer
                users={users}
                isFriend={false}
                isFetching={isFetching}
                title={`All Users (${totalUsersCount})`}
                formId={formId}
                headerImages={headerImages}
            />
            )
}

export default UsersPage
