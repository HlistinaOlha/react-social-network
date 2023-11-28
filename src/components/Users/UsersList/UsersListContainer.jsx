import React, {Component} from "react";
import {followUser, getUsers, setIsFollowingInProgress, setPage, unfollowUser} from "../../../redux/users-reducer";
import {useDispatch, useSelector} from "react-redux";
import {UsersContext} from "./UsersContext";
import UsersList from "./UsersList";
import Pagination from "../../common/Pagination/Pagination";
import Preloader from "../../common/Preloader/Preloader";
import {getUsersSuperSelector} from "../../../redux/selectors/users-selectors";

class UsersListAPI extends Component {

    /*    constructor(props) { //it is called just ONCE!!!! no need to write it if we do not pass any new props or data
            super(props);
        }*/

    follow = (userId) => {
        this.props.follow(userId)
    }

    unfollow = (userId) => {
        this.props.unfollow(userId)
    }

    loadComponent = (page) => {
        this.props.loadUsers(page, this.props.pageSize)
    }

    setPage = (page) => {
        this.props.setPageNum(page)
        this.loadComponent(page, this.props.pageSize)
    }

    componentDidMount() {
        this.loadComponent(this.props.currentPage)
    }

    render() { // when anything changes - render() is called, not constructor()!!!
        return <>
            <Pagination setPage={this.setPage}/>
            {
                this.props.isFetching ?
                    <Preloader/> :
                    <UsersList {...this.props}
                               follow={this.follow}
                               unfollow={this.unfollow}
                    />
            }
        </>
    }
}

/*const mapStateToProps = (state) => {
    return {
        users: getUsersSuperSelector(state),
        messages: getMessages(state),
        messageText: getMessageText(state)
    }
}*/

const UsersListContainer = () => {
    const dispatch = useDispatch()

    const users = useSelector(state => {
        return getUsersSuperSelector(state)
    })
    const currentPage = useSelector(state => state.usersPage.pagination.currentPage)
    const pageSize = useSelector(state => state.usersPage.pagination.pageSize)
    const totalUsersCount = useSelector(state => state.usersPage.pagination.totalUsersCount)
    const isFetching = useSelector(state => state.usersPage.isFetching)
    const followingInProgress = useSelector(state => state.usersPage.followingInProgress)

    const follow = (id) => {
        dispatch(followUser(id))
    }

    const unfollow = (id) => {
        dispatch(unfollowUser(id))
    }

    const loadUsers = (page, pageSize) => {
        dispatch(getUsers(page, pageSize))
    }

    const setPageNum = (page) => {
        dispatch(setPage(page))
    }

    const setFollowingInProgress = (isFetching, userId) => {
        dispatch(setIsFollowingInProgress(isFetching, userId))
    }

    return (
        <UsersContext.Provider value={[followUser, unfollowUser, currentPage, pageSize, totalUsersCount]}>
            <UsersListAPI users={users}
                          isFetching={isFetching}
                          currentPage={currentPage}
                          pageSize={pageSize}
                          setPageNum={setPageNum}
                          follow={follow}
                          unfollow={unfollow}
                          followingInProgress={followingInProgress}
                          setFollowingInProgress={setFollowingInProgress}
                          loadUsers={loadUsers}
            />
        </UsersContext.Provider>
    )
}

export default UsersListContainer
