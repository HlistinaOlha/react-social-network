import Card from "../../UI/Card/Card";
import React from "react";
import styles from "./Message.module.css"

const Message = ({message, likes}) => {
    return (
        <Card className={styles.message}>
            <div>{message}</div>
            <div>Likes: {likes}</div>
        </Card>
    )
}

export default Message;