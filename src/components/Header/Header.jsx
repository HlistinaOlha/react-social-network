import React from "react";
import styles from './Header.module.css'
import {NavLink} from "react-router-dom";

const Header = ({loginName, currentUser, logout}) => {

    return (
        <header className={styles.header}>
            <img src='https://marketplace.canva.cn/Zddas/MAEvUkZddas/1/tl/canva-MAEvUkZddas.png' width="60px"/>
            <div className={styles.loginBlock}>
                {
                    currentUser ?
                        <div className={styles.loginContainer}>
                            <div className={styles.userContainer}>
                                {currentUser.photos.small &&
                                <NavLink to={`profile`}>
                                    <img className={styles.photo} src={currentUser.photos.small}/>
                                </NavLink>
                                }
                                <span>{loginName}</span>
                            </div>
                            <div className={styles.userContainer}>
                                <button onClick={logout}>Logout</button>
                            </div>
                        </div>
                        :
                        <NavLink className={styles.userContainer} to='/login'>Login</NavLink>
                }
            </div>
        </header>
    )
}

export default Header;
