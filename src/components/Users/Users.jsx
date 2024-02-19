import React, {Component, PureComponent, useEffect, useRef, useState} from "react";
import Card from "../UI/Card/Card";
import Preloader from "../common/Preloader/Preloader";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Pagination from "../common/Pagination/Pagination";
import styles from "./Users.module.scss";
import {NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {UsersContext} from "./UsersList/UsersContext";
import {followUser, setIsFollowingInProgress, setPage, unfollowUser} from "../../redux/users-reducer";
import {ProfileImageItem} from "../Profile/ProfileItem/ProfileItemImage/ProfileImage";
import {
    getAllUsers,
    getCurrentPage,
    getFollowingInProgress,
    getPageSize,
    getUsersHeaderImages
} from "../../redux/selectors/users-selectors";
import classNames from 'classnames';
import {getIsFetching} from "../../redux/selectors/auth-selectors";

const UsersContainer = ({isFriend, totalUsersCount, searchString, setCurrentPage, loadUsers}) => {
    const dispatch = useDispatch()

    const users = useSelector(state => getAllUsers(state))
    const isFetching = useSelector(state => getIsFetching(state))
    const headerImages = useSelector(state => getUsersHeaderImages(state))
    const pageSize = useSelector(state => getPageSize(state))
    const currentPage = useSelector(state => getCurrentPage(state))
    const followingInProgress = useSelector(state => getFollowingInProgress(state))

    const follow = (id) => {
        dispatch(followUser(id))
    }

    const unfollow = (id) => {
        dispatch(unfollowUser(id))
    }

    const setFollowingInProgress = (isFetching, userId) => {
        dispatch(setIsFollowingInProgress(isFetching, userId))
    }

    console.log('UsersContainer RERENDER')

    return (
        <UsersContext.Provider value={[followUser, unfollowUser, currentPage, pageSize, totalUsersCount]}>
            <UsersAPI users={users}
                      headerImages={headerImages}
                      isFetching={isFetching}
                      currentPage={currentPage}
                      setCurrentPage={setCurrentPage}
                      pageSize={pageSize}
                      follow={follow}
                      unfollow={unfollow}
                      followingInProgress={followingInProgress}
                      setFollowingInProgress={setFollowingInProgress}
                      loadUsers={loadUsers}
                      searchString={searchString}
                      isFriend={isFriend}
            />
        </UsersContext.Provider>
    )
}

class UsersAPI extends Component {

    follow = (userId) => {
        this.props.follow(userId)
    }

    unfollow = (userId) => {
        this.props.unfollow(userId)
    }

    loadComponent = (page) => {
        this.props.loadUsers(this.props.isFriend, this.props.searchString, page, this.props.pageSize)
    }

    setPage = (page) => {
        this.props.setCurrentPage(page)
    }

    componentDidMount() {
        this.loadComponent(1)
    }

    /*    shouldComponentUpdate(nextProps, nextState) {
            console.log({nextProps, props: this.props})
            return nextProps.currentPage !== this.props.currentPage || nextProps.searchString !== this.props.searchString;

        }*/

    componentDidUpdate(prevProps, prevState, snapshot) {
        /*     if (prevProps.searchString !== this.props.searchString || prevProps.currentPage !== this.props.currentPage) {
                 console.log('LOAD ALL AND FILTERED USERS')
                 this.loadComponent(this.props.currentPage)
             }*/

        if (!this.props.searchString && prevProps.currentPage !== this.props.currentPage) {
            console.log('LOAD ALL USERS')
            this.loadComponent(this.props.currentPage)
        }
        if (this.props.searchString && prevProps.currentPage !== this.props.currentPage) {
            console.log('LOAD FILTERED USERS')
            this.loadComponent(this.props.currentPage)
        }
    }

    render() {
        return <>
            {
                this.props.isFetching ?
                    <Preloader/> :
                    <Users {...this.props}
                           follow={this.follow}
                           unfollow={this.unfollow}
                    />
            }
        </>
    }
}

const Users = ({isFetching, users, headerImages, setCurrentPage, followingInProgress, follow, unfollow}) => {

    let imageIndex = 0;

    return (
        isFetching ?
            <Card>
                <Preloader/>
            </Card>
            :
            <>
                <Container>
                    <Row>
                        {
                            users.map(user => {
                                let index = imageIndex;

                                (imageIndex >= 0 && imageIndex < headerImages.length - 1) ? imageIndex++ : imageIndex = 0;

                                return <UsersItem key={user.id}
                                                  id={user.id}
                                                  user={user}
                                                  imageIndex={index}
                                                  headerImages={headerImages}
                                                  followed={user.followed}
                                                  follow={follow}
                                                  unfollow={unfollow}
                                                  followingInProgress={followingInProgress}/>

                            })
                        }
                    </Row>
                </Container>

                <Pagination setPage={setCurrentPage}/>
            </>
    )
}

const UsersItem = ({user, id, imageIndex, headerImages, followed, follow, unfollow, followingInProgress}) => {

    return (
        <Col sm={3}>
            <Card>
                <div className={styles.friendItem}>
                    <div className={styles.friendHeaderThumb}>
                        <UsersItemImage index={imageIndex}
                                        headerImages={headerImages}
                        />
                    </div>

                    <div className={styles.friendItemContent}>
                        <div className={styles.friendAvatar}>
                            <div className={styles.authorThumb}>
                                <ProfileImageItem image={user.photos.small}
                                                  classNames="friendsImg"
                                />
                            </div>
                            <div className={styles.authorContent}>
                                <NavLink to={`/profile/${user.id}`} className="h5 author-name">{user.name}</NavLink>
                                {user.status && <div>{user.status}</div>}
                            </div>
                        </div>
                        {followed ?
                            <button type='button'
                                    disabled={followingInProgress.some(userId => id === userId)}
                                    className={classNames(styles.followBtn, styles.unfollow)}
                                    onClick={() => unfollow(id)}>
                                Unfollow
                            </button>
                            : <button type='button'
                                      disabled={followingInProgress.some(userId => id === userId)}
                                      className={classNames(styles.followBtn, styles.follow)}
                                      onClick={() => follow(id)}>
                                Follow
                            </button>
                        }
                    </div>
                </div>
            </Card>
        </Col>
    )
}

const UsersItemImage = ({index, headerImages}) => {


    //const [loaded, setLoaded] = useState(false)

    return (
        <img src={require(`../../assets/images/${headerImages[index]?.image}.png`)}
             alt={headerImages[index]?.image}
            //onLoad={() => setLoaded(true)
        />
    )
}

export default UsersContainer;
