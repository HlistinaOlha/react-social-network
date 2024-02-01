import React from "react";
import styles from './Navbar.module.css'
import {NavLink} from "react-router-dom";
import ava from '../../assets/images/ava.png'
import classNames from 'classnames';

const navItems = [
    {
        id: 1,
        name: 'Profile',
        link: '/profile'
    },
    {
        id: 2,
        name: 'Messages',
        link: '/dialogs'
    },
    {
        id: 3,
        name: 'News',
        link: '/news'
    },
    {
        id: 4,
        name: 'Music',
        link: '/music'
    },
    {
        id: 5,
        name: 'Find users',
        link: '/users'
    },
    {
        id: 6,
        name: 'Settings',
        link: '/settings'
    }
]

const Sidebar = ({friends}) => {

    return (
        <div className={styles.nav}>
            <div>
                {
                    navItems.map((item, index) => (
                        <div key={item.id}
                             className={classNames({
                                 [styles.users]: index === navItems.length - 2
                             }, styles.item)}>
                            <NavLink to={item.link}
                                     className={({isActive, isPending}) =>
                                         isActive
                                             ? styles.active
                                             : isPending
                                             ? styles.pending
                                             : ""
                                     }>{item.name}</NavLink>
                        </div>
                    ))
                }
            </div>
            <div>
                <h3>Friends:</h3>
                <div className={styles.friendsContainer}>
                    {
                        friends.map(friend => (
                            <div key={friend.id} className={styles.friend}>
                                <img className={styles.photo} src={ava}/>
                                <div>{friend.name}</div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Sidebar;
