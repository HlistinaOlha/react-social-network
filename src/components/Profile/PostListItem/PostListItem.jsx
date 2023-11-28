import React from "react";
import styles from './PostListItem.module.css'

const PostListItem = ({message, likes}) => {

return (
    <li className={styles.item}>
        <div className={styles.photo}/>
        <span>{message}</span>
        <span>Likes: {likes}</span>
    </li>
)
}

export default PostListItem
