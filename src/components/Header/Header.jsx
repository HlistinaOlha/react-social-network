import React, {useState} from "react";
import styles from './Header.module.scss'
import {NavLink} from "react-router-dom";
import logo from '../../assets/images/logo.png'
import {Container} from "react-bootstrap";
import {useLocation} from "react-router";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import ProfileStatusWithHooks from "../Profile/ProfileItem/ProfileItemStatus/ProfileStatusWithHooks";
import {ProfileImageItem} from "../Profile/ProfileItem/ProfileItemImage/ProfileImage";
import {useDispatch, useSelector} from "react-redux";
import {getIsFetching} from "../../redux/selectors/auth-selectors";
import {logout} from "../../redux/auth-reducer";
import {updateStatus} from "../../redux/profile-reducer";
import {useAuth} from "../../hook/useAuth";
import classNames from 'classnames';

const HeaderContainer = () => {
    const dispatch = useDispatch()

    const isFetching = useSelector(state => getIsFetching(state))
    const {isAuthorized, authorisedUser, authorisedUserStatus} = useAuth()

    const handleLogout = () => {
        dispatch(logout())
    }

    const changeStatus = (status) => {
        dispatch(updateStatus(status))
    }


    return <Header isFetching={isFetching}
                   isAuthorized={isAuthorized}
                   authorisedUser={authorisedUser}
                   authorisedUserStatus={authorisedUserStatus}
                   changeStatus={changeStatus}
                   logout={handleLogout}
    />
}

const Header = ({isAuthorized, authorisedUser, authorisedUserStatus, changeStatus, logout}) => {

    const location = useLocation();
    const path = location.pathname;

    const pageTitles = {
        '/profile': 'Profile Page',
        '/profile/friends': 'Friends',
        '/profile/about': 'About',
        '/users': 'Users'
    }

    const [currentIconStatus, setCurrentIconStatus] = useState('online')

    const setIconStatus = (e, iconStatus) => {
        e.preventDefault()
        setCurrentIconStatus(iconStatus)
    }

    const iconStatus = {
        online: 'online',
        away: 'away',
        disconnected: 'disconnected',
        invisible: 'invisible'
    }

    return (
        authorisedUser &&
        <header className={classNames({
            [styles.headerDark]: isAuthorized
        }, styles.header)}>
            <Container>
                <div className={styles.headerContent}>
                    {
                        isAuthorized ?
                            <>
                                <div className={styles.pageTitle}>
                                    <h6>{pageTitles[path]}</h6>
                                </div>
                                <div className={classNames(styles.author, 'more')}>
                                    <div className={styles.authorThumb}>
                                        {authorisedUser.photos.small &&
                                        <>
                                            <ProfileImageItem image={authorisedUser.photos.small}
                                                              classNames="avatar"/>
                                            <span
                                                className={classNames(styles.iconStatus,
                                                    styles[iconStatus[currentIconStatus]])}/>
                                        </>
                                        }
                                        <Dropdown iconStatus={iconStatus}
                                                  setIconStatus={setIconStatus}
                                                  logout={logout}>
                                            <ProfileStatusWithHooks userStatus={authorisedUserStatus}
                                                                    changeStatus={changeStatus}/>
                                        </Dropdown>

                                    </div>
                                    <NavLink to={`profile`}>
                                            <span className={styles.authorTitle}>
                                                 {authorisedUser.fullName}
                                                <KeyboardArrowDownIcon sx={{fontSize: 13}}/>
                                            </span>
                                    </NavLink>
                                </div>
                            </>
                            :
                            <NavLink className={styles.headerLogo} to='/'>
                                <img src={logo} width="34px"/>
                                <div className={styles.titleBlock}>
                                    <h6 className={styles.logoTitle}>olympus</h6>
                                    <div className={styles.subTitle}>SOCIAL NETWORK</div>
                                </div>
                            </NavLink>
                    }
                    {/*:
                            <NavLink className={styles.userContainer} to='/login'>Login</NavLink>*/}
                </div>
            </Container>

        </header>
    )
}

const Dropdown = ({iconStatus, setIconStatus, logout, children}) => {

    return (
        <div className={classNames(styles.headerDropdown, 'moreDropdown', 'moreWithTriangle')}>
            <div className={styles.scrollbar}>
                <div className={classNames('uiBlockTitle', ' uiBlockTitleSmall')}>
                    <h6 className="title">Your Account</h6>
                </div>
                <ul className={styles.accountSettings}>
                    <li>
                        <a onClick={logout}>
                            <LogoutRoundedIcon/>
                            Logout</a>
                    </li>
                </ul>
                <div className="uiBlockTitle uiBlockTitleSmall">
                    <h6 className="title">Chat Settings</h6>
                </div>
                <ul className={styles.chatSettings}>
                    {
                        Object.keys(iconStatus).map(status => (
                            <li key={status}>
                                <a href="#" onClick={(e) => setIconStatus(e, status)}>
                                    <span className={`${styles.iconStatus} ${styles[status]}`}/>
                                    <span>{status}</span>
                                </a>
                            </li>
                        ))
                    }
                </ul>
                <div className="uiBlockTitle uiBlockTitleSmall">
                    <h6 className="title">Custom Status</h6>
                </div>
                {children}
            </div>
        </div>
    )
}

export default HeaderContainer;
