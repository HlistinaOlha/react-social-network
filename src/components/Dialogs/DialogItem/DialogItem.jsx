import React from "react";
import {NavLink} from "react-router-dom";
import Message from "../Message/Message";
import logo from "../../../assets/images/logo192.png";
import styles from './DialogItem.module.css'



const DialogItem = ({id, name}) => {
    return (
        <div className={styles.dialogItemContainer}>
            <img src={logo} className={styles.image} height={40} alt="image"/>
            <NavLink to={`${id}`} >
                <div>{name}:</div>
            </NavLink>
        </div>
    )
}

export default DialogItem;