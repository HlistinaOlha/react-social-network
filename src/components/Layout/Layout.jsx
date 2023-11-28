import React from "react";
import Navbar from "../Navbar/Navbar";
import store from "../../redux/redux-store";
import {Outlet} from "react-router-dom";
import styles from './Layout.module.css'
import HeaderContainer from "../Header/HeaderContainer";
import {useSelector} from "react-redux";
import {getFriends} from "../../redux/selectors/sidebar-selectors";

const Layout = () => {

    const friends = useSelector((state) => getFriends(state))

    return (
        <>
            <HeaderContainer/>
            <Navbar friends={friends}/>
            <div className="app-wrapper-content">
                <Outlet context={[store]}/>
            </div>
            <footer>
                <div className={styles.year}>2023</div>
            </footer>

        </>
    )
}

export default Layout
