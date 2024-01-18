import React from "react";
import ava from "../../../../assets/images/ava.png";
import styles from "../ProfileItem.module.scss"

const ProfileImage = ({image, classNames}) => {

    return <>
        <div className={styles.profileImgContainer}>
            <ProfileImageItem image={image}
                              classNames={classNames}/>
        </div>
    </>
}

export const ProfileImageItem = ({image, classNames}) => {
    const img = image ? image : ava;

    return <img loading="lazy" src={img} className={classNames} alt="avatar"/>
}

export default ProfileImage;
