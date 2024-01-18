import React, {Component} from "react";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {editProfile, getProfile, getStatus, uploadImage} from "../../../redux/profile-reducer";
import ProfileItem from "./ProfileItem";
import {getIsFetching, getUserProfile, getUserStatus} from "../../../redux/selectors/profile-selectors";
import {useAuth} from "../../../hook/useAuth";
import {UsersContext} from "../../Users/UsersList/UsersContext";
import {
    getCurrentPage,
    getPageSize,
    getTotalUsersCount
} from "../../../redux/selectors/users-selectors";
import {getUsers} from "../../../redux/users-reducer";

function ProfileItemContainer() {
    const dispatch = useDispatch()

    const {authorisedUser, authorisedUserId} = useAuth()

    const profile = useSelector(state => getUserProfile(state))
    const status = useSelector(state => getUserStatus(state))
    const isFetching = useSelector(state => getIsFetching(state))
    const selectedUserId = useParams().id
    const isCurrentUserAuthorised = !selectedUserId || (authorisedUserId === +selectedUserId);
    const totalUsersCount = useSelector(state => getTotalUsersCount(state))
    const pageSize = useSelector(state => getPageSize(state))
    const currentPage = useSelector(state => getCurrentPage(state))
    //const navigate = useNavigate();
    //const goBack = () => navigate(-1)

    const loadProfile = (id) => {
        dispatch(getProfile(id))
    }

    const loadStatus = (id) => {
        dispatch(getStatus(id))
    }

    const loadFilteredUsers = (isFriend, nameString, page, pageSize) => {
        dispatch(getUsers(isFriend, nameString, page, pageSize))
    }

    const changeImage = (image) => {
        dispatch(uploadImage(image))
    }

    const updateProfile = (profile) => {
        dispatch(editProfile(profile))
    }

    return (
        <UsersContext.Provider value={[null, null, currentPage, pageSize, totalUsersCount]}>
            <ProfileItemAPI profile={profile}
                            pageSize={pageSize}
                            currentPage={currentPage}
                            authorisedUser={authorisedUser}
                            authorisedUserId={authorisedUserId}
                            id={selectedUserId}
                            isCurrentUserAuthorised={isCurrentUserAuthorised}
                            status={status}
                            isFetching={isFetching}
                            loadProfile={loadProfile}
                            loadStatus={loadStatus}
                            changeImage={changeImage}
                            updateProfile={updateProfile}
                            loadFilteredUsers={loadFilteredUsers}
            />
        </UsersContext.Provider>
    )
}

class ProfileItemAPI extends Component {

    componentDidMount() {
        this.refreshProfile()
        this.props.loadFilteredUsers(true,  '', this.props.currentPage, this.props.pageSize)
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.id !== this.props.id) {
            this.refreshProfile()
        }
    }

    refreshProfile = () => {
        let userId = this.props.id;

        if (!userId) {
            userId = this.props.authorisedUserId
        }

        this.props.loadProfile(userId)
        this.props.loadStatus(userId)
    }

    render() {
        return ( /*this.props.isFetching ?
            <Preloader/>
            :*/
            <>
                {/* <button onClick={this.props.goBack}>Back</button>*/}
                <ProfileItem {...this.props} profile={this.props.profile}/>
            </>
        )
    }
}


export default ProfileItemContainer
