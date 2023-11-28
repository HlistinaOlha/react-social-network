import React, {Component} from "react";
import Header from "./Header";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../../redux/auth-reducer";
import {getCurrentUser, getIsFetching, getLoginName} from "../../redux/selectors/auth-selectors";

class HeaderContainerAPI extends Component {

    render() {
        return <Header {...this.props}/>
    }
}

const HeaderContainer = () => {
    const dispatch = useDispatch()

    const isFetching = useSelector(state => getIsFetching(state))
    const loginName = useSelector(state => getLoginName(state))
    const currentUser = useSelector(state => getCurrentUser(state))

    const handleLogout = () => {
        dispatch(logout())
    }

    return <HeaderContainerAPI isFetching={isFetching}
                               loginName={loginName}
                               currentUser={currentUser}
                               logout={handleLogout}
    />
}

export default HeaderContainer;
