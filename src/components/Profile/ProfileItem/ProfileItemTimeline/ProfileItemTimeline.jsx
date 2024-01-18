import React from "react";
import {ProfileImageItem} from "../ProfileItemImage/ProfileImage";
import {Col} from "react-bootstrap";
import styles from "../ProfileItem.module.scss"
import PostListContainer from "../../PostList/PostListContainer";
import {NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getUserProfile} from "../../../../redux/selectors/profile-selectors";
import {getPageSize, getTotalUsersCount, getUsersFiltered} from "../../../../redux/selectors/users-selectors";
import ProfileData from "../ProfileItemData";
import CardTitle from "../../../UI/Card/CardTitle";
import Card from "../../../UI/Card/Card";
import CardContent from "../../../UI/Card/CardContent";
import {getUsers} from "../../../../redux/users-reducer";

const ProfileTimeline = ({}) => {
    const dispatch = useDispatch();
    const profile = useSelector(state => getUserProfile(state))
    const filteredUsers = useSelector(state => getUsersFiltered(state))
    const filteredUsersCount = useSelector(state => getTotalUsersCount(state))
    const pageSize = useSelector(state => getPageSize(state))
    const usersLeft = filteredUsersCount - pageSize;

    const loadAllFilteredUsers = () => {
        dispatch(getUsers(true, "", 1, 100))
    }
    return (
        <>
            <Col xs={3}>
                <ProfileData profile={profile}
                             title="Profile Intro"/>
            </Col>
            <Col xs={6}>
                <PostListContainer/>
            </Col>
            <Col xs={3}>
                <ProfileFriends filteredUsers={filteredUsers}
                                filteredUsersCount={filteredUsersCount}
                                loadAllFilteredUsers={loadAllFilteredUsers}
                                usersLeft={usersLeft}/>
            </Col>
        </>
    )
}

const ProfileFriends = ({filteredUsers, filteredUsersCount, loadAllFilteredUsers, usersLeft}) => {
    return (
        <Card>
            <CardTitle title={`Friends (${filteredUsersCount})`}/>
            <CardContent>
                <ul className={styles.followedUsers}>
                    {
                        filteredUsers && filteredUsers.length > 0 ?
                            <>
                                {
                                    filteredUsers.map(user => (
                                        <li key={user.id}>
                                            <NavLink to={`/profile/${user.id}`} title={user.name}>
                                                <ProfileImageItem image={user.photos.small}/>
                                            </NavLink>
                                        </li>
                                    ))
                                }
                                {
                                    filteredUsers.length !== filteredUsersCount &&
                                    <li className={styles.allUsers}>
                                        <div onClick={loadAllFilteredUsers}>{`+${usersLeft}`}</div>
                                    </li>
                                }
                            </>
                            :
                            <li>You do not follow any user.</li>
                    }
                </ul>
            </CardContent>
        </Card>
    )
}

export default ProfileTimeline
