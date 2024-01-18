import React from "react";
import styles from './Card.module.scss'

const Card = ({children, post = false}) => {
    return (
        <div className="uiBlock">
            {
                post ?
                    <article className={`${styles.card} post`}>
                        {children}
                    </article>
                    :
                    children
            }
        </div>
    )
}

export default Card;
