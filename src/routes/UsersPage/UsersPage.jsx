import {useDispatch, useSelector} from "react-redux";
import React, {useState} from "react";
import {
    getAllUsers,
    getPageSize,
    getTotalUsersCount
} from "../../redux/selectors/users-selectors";
import UsersContainer from "../../components/Users/Users";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "../../components/UI/Card/Card";
import CardTitle from "../../components/UI/Card/CardTitle";
import {SearchUserReduxForm} from "../../components/Profile/ProfileForms/ProfileForms";
import Container from "react-bootstrap/Container";
import {getUsers, setPage} from "../../redux/users-reducer";
import {getIsFetching} from "../../redux/selectors/users-selectors";

const UsersPage = ({}) => {
    const dispatch = useDispatch()

    const users = useSelector(state => getAllUsers(state))
    const isFetching = useSelector(state => getIsFetching(state))
    const totalUsersCount = useSelector(state => getTotalUsersCount(state))
    const pageSize = useSelector(state => getPageSize(state))
    const isFriend = null;
    const title = `All Users (${totalUsersCount})`
    const formId = "searchUserForm";
    const [searchString, setSearchString] = useState('')

    const loadUsers = (isFriend, searchString, page, pageSize) => {
        dispatch(getUsers(isFriend, searchString, page, pageSize))
    }

    const setCurrentPage = (page) => {
        dispatch(setPage(page))
    }

    return (
        <>
            <Container>
                <Row>
                    <Col xs={12}>
                        <Card>
                            <CardTitle title={title}>
                                <SearchUserReduxForm loadUsers={loadUsers}
                                                     formId={formId}
                                                     searchString={searchString}
                                                     setSearchString={setSearchString}
                                                     isFriend={isFriend}
                                                     pageSize={pageSize}
                                                     setCurrentPage={setCurrentPage}
                                />
                            </CardTitle>
                        </Card>

                        <UsersContainer users={users}
                                        isFriend={isFriend}
                                        isFetching={isFetching}
                                        searchString={searchString}
                                        setCurrentPage={setCurrentPage}
                                        loadUsers={loadUsers}
                                        totalUsersCount={totalUsersCount}
                        />
                    </Col>
                </Row>
            </Container>
        </>
    )
}


export default UsersPage
