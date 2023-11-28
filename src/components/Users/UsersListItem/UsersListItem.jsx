import React from "react";
import styles from './UsersListItem.module.css'
import ava from '../../../assets/images/ava.png'
import {NavLink} from "react-router-dom";

const UsersListItem = ({id, name, status, followed, photos, unfollow, follow, followingInProgress}) => {

    return (
        <li className={styles.item}>
            <div className={styles.avaWrapper}>{
                photos.small ?
                    <NavLink to={`/profile/${id}`}>
                        <img className={styles.photo} src={photos.small}/>
                    </NavLink>
                    :
                    <NavLink to={`/profile/${id}`}>
                        <img className={styles.photo} src={ava}/>
                    </NavLink>
            }
                {followed ?
                    <button type='button'
                            disabled={followingInProgress.some(userId=> id === userId)}
                            className={`${styles.followBtn}`}
                            onClick={() => unfollow(id)}>
                        Unfollow
                    </button>
                    : <button type='button'
                              disabled={followingInProgress.some(userId=> id === userId)}
                              className={`${styles.followBtn}`}
                              onClick={() => follow(id)}>
                        Follow
                    </button>
                }
            </div>
            <div className={styles.userItem}>
                <div className={styles.userContainer}>
                    <span className={styles.name}>{name}</span>
                    <span>{status}</span>
                </div>
            </div>
        </li>
    )
}

export default UsersListItem
