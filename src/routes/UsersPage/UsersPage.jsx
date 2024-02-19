import {useDispatch, useSelector} from "react-redux";
import React, {useState} from "react";
import {getPageSize, getTotalUsersCount} from "../../redux/selectors/users-selectors";
import UsersContainer from "../../components/Users/Users";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "../../components/UI/Card/Card";
import CardTitle from "../../components/UI/Card/CardTitle";
import {SearchUserReduxForm} from "../../components/Profile/ProfileForms/ProfileForms";
import Container from "react-bootstrap/Container";
import {getUsers, setPage} from "../../redux/users-reducer";

const UsersPage = ({}) => {
    const dispatch = useDispatch()

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
                    </Col>
                </Row>
            </Container>
            <UsersContainer searchString={searchString}
                            totalUsersCount={totalUsersCount}
                            isFriend={isFriend}
                            setCurrentPage={setCurrentPage}
                            loadUsers={loadUsers}/>
        </>
    )
}


export default UsersPage
