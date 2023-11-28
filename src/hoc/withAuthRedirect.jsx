import React from "react";
import {Navigate, useLocation} from "react-router";
import {connect} from "react-redux";

const mapStateToPropsForRedirect = (state) => {
    return {
        currentUser: localStorage.getItem("currentUser")

    }
}


const WithAuthRedirect = (Component) => {
    //const location = useLocation();

    const RedirectComponent = (props) => {

        if (!props.currentUser) {
            return <Navigate to="/login"/>
        }

        return <Component {...props}/>
    }



    let ConnectedAuthRedirectComponent = connect(mapStateToPropsForRedirect)(RedirectComponent)

    return ConnectedAuthRedirectComponent
}


export {WithAuthRedirect}


