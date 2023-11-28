import React from "react";
import styles from './UsersList.module.css'
import UsersListItem from "../UsersListItem/UsersListItem";

const UsersList = ({users, follow, unfollow, followingInProgress}) => {
    return <>
        <ul className={styles.usersContainer}>{
            users && users.length >= 1 ?
                users.map(user => (
                        <UsersListItem key={user.id}
                                       id={user.id}
                                       name={user.name}
                                       status={user.status}
                                       location={user.location}
                                       photos={user.photos}
                                       followed={user.followed}
                                       follow={follow}
                                       unfollow={unfollow}
                                       followingInProgress={followingInProgress}/>
                    )
                ) :
                <li className={styles.item}>No users found</li>
        } </ul>
        <button className={styles.showMoreBtn} type="button">Show more</button>
    </>
}

export default UsersList
