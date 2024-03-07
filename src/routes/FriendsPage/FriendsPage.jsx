import {useDispatch, useSelector} from "react-redux";
import React from "react";
import {getAuthorisedUser, getIsFetching} from "../../redux/selectors/auth-selectors";
import UsersContainer from "../../components/Users/Users";
import CardTitle from "../../components/UI/Card/CardTitle";
import {getTotalUsersCount, getUsersFiltered} from "../../redux/selectors/users-selectors";
import {getUsers, setPage} from "../../redux/users-reducer";
import Card from "../../components/UI/Card/Card";
import CardContent from "../../components/UI/Card/CardContent";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

const FriendsPage = ({}) => {
    const dispatch = useDispatch()

    const authorisedUser = useSelector(state => getAuthorisedUser(state))
    const userName = authorisedUser && authorisedUser?.fullName?.split(' ')[0];
    const filteredUsers = useSelector(state => getUsersFiltered(state))
    const isFetching = useSelector(state => getIsFetching(state))
    const filteredUsersCount = useSelector(state => getTotalUsersCount(state))
    const totalUsersCount = useSelector(state => getTotalUsersCount(state))
    //const formId = "searchFriendForm";

    const loadUsers = (isFriend, searchString, page, pageSize) => {
        dispatch(getUsers(isFriend, searchString, page, pageSize))
    }

    const setCurrentPage = (page) => {
        dispatch(setPage(page))
    }

    return (
        <Container>
            <Row>
                <Col xs={12}>
                    <Card>
                        <CardTitle title={`${userName}’s Friends (${filteredUsersCount})`}/>
                    </Card>
                    <UsersContainer
                        users={filteredUsers}
                        isFriend={true}
                        isFetching={isFetching}
                        setCurrentPage={setCurrentPage}
                        loadUsers={loadUsers}
                        totalUsersCount={totalUsersCount}
                    />
                </Col>
            </Row>
        </Container>
    )
}

export default FriendsPage
