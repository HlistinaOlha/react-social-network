import React, {Component, useContext, useEffect} from "react";
import Card from "../UI/Card/Card";
import Preloader from "../common/Preloader/Preloader";
import {Col} from "react-bootstrap";
import CardTitle from "../UI/Card/CardTitle";
import {SearchUserReduxForm} from "../Profile/ProfileForms/ProfileForms";
import Pagination from "../common/Pagination/Pagination";
import styles from "./Users.module.scss";
import {NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {UsersContext} from "./UsersList/UsersContext";
import {followUser, getUsers, setIsFollowingInProgress, setPage, unfollowUser} from "../../redux/users-reducer";
import {ProfileImageItem} from "../Profile/ProfileItem/ProfileItemImage/ProfileImage";
import {
    getCurrentPage,
    getFollowingInProgress,
    getPageSize,
    getTotalUsersCount
} from "../../redux/selectors/users-selectors";

const UsersContainer = ({users, isFetching, isFriend, title, formId, headerImages}) => {
    const dispatch = useDispatch()

    const totalUsersCount = useSelector(state => getTotalUsersCount(state))
    const pageSize = useSelector(state => getPageSize(state))
    const currentPage = useSelector(state => getCurrentPage(state))
    const followingInProgress = useSelector(state => getFollowingInProgress(state))

    //const [_, __, page, pageSize] = useContext(UsersContext)

    const loadUsers = (searchString, page, pageSize) => {
        dispatch(getUsers(isFriend, searchString, page, pageSize))
    }

    const searchFilteredUsers = (data, page, pageSize) => {
        const searchString = data.inputSearch ? data.inputSearch : data;
        loadUsers(searchString, page, pageSize);
    }

    const setPageNum = (page) => {
        dispatch(setPage(page))
    }

    const setCurrentPage = (page) => {
        setPageNum(page)
        searchFilteredUsers('', page, pageSize)
    }

    useEffect(() => {
        if (users.length > pageSize) {
            console.log('load')
            searchFilteredUsers('', currentPage, pageSize)
        }
    }, [users])

    const follow = (id) => {
        dispatch(followUser(id))
    }

    const unfollow = (id) => {
        dispatch(unfollowUser(id))
    }

    const setFollowingInProgress = (isFetching, userId) => {
        dispatch(setIsFollowingInProgress(isFetching, userId))
    }

    return (
        <UsersContext.Provider value={[followUser, unfollowUser, currentPage, pageSize, totalUsersCount]}>
            <UsersAPI users={users}
                      headerImages={headerImages}
                      isFetching={isFetching}
                      formId={formId}
                      title={title}
                      currentPage={currentPage}
                      setCurrentPage={setCurrentPage}
                      pageSize={pageSize}
                      setPageNum={setPageNum}
                      follow={follow}
                      unfollow={unfollow}
                      followingInProgress={followingInProgress}
                      setFollowingInProgress={setFollowingInProgress}
                      loadUsers={loadUsers}
                      searchFilteredUsers={searchFilteredUsers}
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
        this.props.loadUsers('', page, this.props.pageSize)
    }

    setPage = (page) => {
        this.props.setPageNum(page)
        this.loadComponent(page)
    }

    componentDidMount() {
        this.loadComponent(this.props.currentPage)
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

const Users = ({isFetching, title, users, formId, headerImages, searchFilteredUsers, setCurrentPage, follow, unfollow}) => {

    let imageIndex = 0;

    return (
        isFetching ?
            <Card>
                <Preloader/>
            </Card>
            :
            <>
                <Col xs={12}>
                    <Card>
                        <CardTitle title={title}>
                            <SearchUserReduxForm onSubmit={searchFilteredUsers}
                                                 formId={formId}
                            />
                        </CardTitle>
                    </Card>
                </Col>
                {
                    users.map(user => {
                        let index = imageIndex;

                        (imageIndex >= 0 && imageIndex < headerImages.length) ? imageIndex++ : imageIndex = 0;

                        return <UsersItem key={user.id}
                                          user={user}
                                          imageIndex={index}
                                          headerImages={headerImages}/>

                    })
                }
                <Pagination setPage={setCurrentPage}/>
            </>
    )
}

const UsersItem = ({user, imageIndex, headerImages}) => {

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
                                <div>{user.status}</div>
                            </div>
                        </div>
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
