import React from "react";
import Preloader from "../../common/Preloader/Preloader";
import ProfileImage from "./ProfileImage";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";

function ProfileItem({profile, status, changeStatus, changeImage, isProfileCurrentUser}) {

   const updateImage = (e) => {
       changeImage(e.target.files[0], profile.userId)
       e.target.value = null;
    }

    if (!profile) {
        return <Preloader/>
    }

    return (
        <div>
            <ProfileImage image={profile.photos.large}
                          changeImage={updateImage}
            />
            <div>{profile.fullName}</div>
            <div> {profile.aboutMe}</div>
            <ProfileStatusWithHooks userStatus={status}
                           changeStatus={changeStatus}
                           isProfileCurrentUser={isProfileCurrentUser}
            />
            {profile.lookingForAJobDescription &&
            <div><b>What am I looking for? </b>{profile.lookingForAJobDescription}</div>}
            {profile.contacts.length > 0 &&
            <div> Contacts:
                {profile.contacts.facebook && <div><b>facebook: </b> {profile.contacts.facebook}</div>}
                {profile.contacts.github && <div><b>github: </b> {profile.contacts.github}</div>}
                {profile.contacts.instagram && <div><b>instagram: </b> {profile.contacts.instagram}</div>}
                {profile.contacts.mainLink && <div><b>mainLink: </b> {profile.contacts.mainLink}</div>}
                {profile.contacts.twitter && <div><b>twitter: </b> {profile.contacts.twitter}</div>}
                {profile.contacts.website && <div><b>website: </b> {profile.contacts.website}</div>}
            </div>
            }
        </div>
    )
}

export default ProfileItem
