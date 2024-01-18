import Card from "../../UI/Card/Card";
import styles from "./ProfileItem.module.scss";
import React from "react";
import CardTitle from "../../UI/Card/CardTitle";
import CardContent from "../../UI/Card/CardContent";

const ProfileData = ({profile, title, additionalInfo, children}) => {
    return (
        <Card>
            <CardTitle title={title}/>
            <CardContent>
                <ul className={`${styles.personalInfo} ${styles.widget}`}>
                    {
                        profile.aboutMe &&
                        <li>
                            <span className={styles.title}>About me: </span>
                            <span className={styles.text}>{profile.aboutMe}</span>
                        </li>
                    }
                    <li>
                        <span className={styles.title}>Looking for a job: </span>
                        <span className={styles.text}>{profile.lookingForAJob ? "yes" : "no"}</span>
                    </li>
                    {additionalInfo}
                </ul>
                {children}
            </CardContent>
        </Card>
    )
}

export default ProfileData;
