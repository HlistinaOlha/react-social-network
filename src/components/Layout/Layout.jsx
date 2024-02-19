import React from "react";
import store from "../../redux/redux-store";
import {Outlet} from "react-router-dom";
import styles from './Layout.module.scss'
import HeaderContainer from "../Header/Header";

const Layout = () => {

    return (
        <>
            <HeaderContainer/>
            <div className="app-wrapper-content">
                <Outlet context={[store]}/>
            </div>
            <footer>
                <div className={styles.footerContent}>2023 Copyright © Company - All rights reserved </div>
            </footer>
        </>
    )
}

export default Layout
