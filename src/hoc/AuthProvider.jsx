import React, {createContext} from "react";
import {useSelector} from "react-redux";
import {getAuthorisedUser, getAuthorisedUserId, getAuthorisedUserStatus} from "../redux/selectors/auth-selectors";

export const AuthContext = createContext(null);

export const AuthProvider = ({children}) => {
    const authorisedUser = useSelector(state => getAuthorisedUser(state))
    const isAuthorized = localStorage.getItem('authorisedUserId');
    const authorisedUserId = useSelector(state => getAuthorisedUserId(state))
    const authorisedUserStatus = useSelector(state => getAuthorisedUserStatus(state))

    const value = {isAuthorized, authorisedUser, authorisedUserId, authorisedUserStatus}

    return <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>
}
