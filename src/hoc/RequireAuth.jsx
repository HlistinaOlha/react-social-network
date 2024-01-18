import React from "react";
import {useAuth} from "../hook/useAuth";
import {Navigate, useLocation} from "react-router";

const RequireAuth = ({children}) => {
    const location = useLocation();
    const {authorisedUser, isAuthorized} = useAuth()


        if (!authorisedUser && !isAuthorized) {
            return <Navigate to="/login" state={{from: location}}/>
        }

    return children

}

export {RequireAuth}


