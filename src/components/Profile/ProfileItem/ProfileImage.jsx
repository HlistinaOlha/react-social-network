import React from "react";
import ava from "../../../assets/images/ava.png";
import styles from "./ProfileItem.module.css"

const ProfileImage = ({image, changeImage}) => {

    return <div>
        {image ?
            <img src={image} className={styles.ava}/>
            :
            <img src={ava} className={styles.ava}/>
        }
        <label htmlFor="avatar">Upload a profile picture: </label>
        <input type="file"
               id="avatar"
               accept="image/png, image/jpeg"
               onChange={changeImage}
        />
    </div>
}

export default ProfileImage;
