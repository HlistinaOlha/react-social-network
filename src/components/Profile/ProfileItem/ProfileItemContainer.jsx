import React, {Component} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getProfile, getStatus, updateStatus, uploadImage} from "../../../redux/profile-reducer";
import ProfileItem from "./ProfileItem";

class ProfileItemAPI extends Component {

    componentDidMount() {
        let userId = this.props.id;

        if (!userId) {
            userId = this.props.loggedInUserId
           /* if (!userId) {
                this.props.history.push('/login')
            }*/
        }

        this.props.loadProfile(userId)
        this.props.loadStatus(userId)
    }

    render() {
        return ( /*this.props.isFetching ?
            <Preloader/>
            :*/
            <>
                <button onClick={this.props.goBack}>Back</button>
                <ProfileItem {...this.props} profile={this.props.profile}/>
            </>
        )
    }
}

function ProfileItemContainer() {
    const dispatch = useDispatch()

    const profile = useSelector(state => state.profilePage.profile)
    const currentUser = useSelector(state => state.profilePage.currentUser)
    //const isFetching = useSelector(state => state.profilePage.isFetching)
    const status = useSelector(state => state.profilePage.status)
    const loggedInUserId = useSelector(state => state.auth.userId)
    const selectedUserId = useParams().id
    const isProfileCurrentUser = profile?.userId === loggedInUserId

    const navigate = useNavigate();
    const goBack = () => navigate(-1)

    const loadProfile = (id) => {
        dispatch(getProfile(id))
    }

    const loadStatus = (id) => {
        dispatch(getStatus(id))
    }

    const changeStatus = (status) => {
        if (!isProfileCurrentUser) return
        dispatch(updateStatus(status))
    }

    const changeImage = (image, userId) => {
        dispatch(uploadImage(image, userId))
    }

    return <ProfileItemAPI profile={profile}
                           currentUser={currentUser}
                           id={selectedUserId}
                           loggedInUserId={loggedInUserId}
                           //isFetching={isFetching}
                           goBack={goBack}
                           loadProfile={loadProfile}
                           status={status}
                           loadStatus={loadStatus}
                           changeStatus={changeStatus}
                           changeImage={changeImage}
                           isProfileCurrentUser={isProfileCurrentUser}
    />
}

export default ProfileItemContainer
