import React, {createContext, useState} from "react";
import {useSelector} from "react-redux";
import {getCurrentUser} from "../redux/selectors/auth-selectors";

export const AuthContext = createContext(null);

export const AuthProvider = ({children}) => {
    const currentUser = useSelector(state => getCurrentUser(state))
    const isAuthorized = localStorage.getItem('currentUser');


    const value = {currentUser, isAuthorized}

    return <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>
}
