import React, {useEffect} from "react";
import {useAuth} from "../hook/useAuth";
import {Navigate, useLocation} from "react-router";

const RequireAuth = ({children}) => {
    const location = useLocation();
    const {currentUser, isAuthorized} = useAuth()


        if (!currentUser && !isAuthorized) {
            return <Navigate to="/login" state={{from: location}}/>
        }

    return children

}

export {RequireAuth}


