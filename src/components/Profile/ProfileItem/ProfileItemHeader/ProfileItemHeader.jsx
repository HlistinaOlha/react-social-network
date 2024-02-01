import React from "react";
import ProfileImage from "../ProfileItemImage/ProfileImage";
import {Col, Container, Row} from "react-bootstrap";
import styles from "../ProfileItem.module.scss"
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ModalWindowContainer from "../../../common/Modal/ModalWindow";
import {EditProfileReduxForm, UploadImageReduxForm} from "../../ProfileForms/ProfileForms";
import {NavLink} from "react-router-dom";

const ProfileHeader = ({profile, authorisedUser, isCurrentUserAuthorised, status, updateImage, updateProfile, isFetching}) => {
    const leftMenu = [
        {name: 'timeline', link: ''},
        {name: 'about', link: 'about'}
    ]
    const rightMenu = [
        {name: 'friends', link: 'friends'},
        {name: 'users', link: '/users'},
        {name: 'settings'}
    ]

    return (
        <Container>
            <Row>
                <Col>
                    <div className="uiBlock">
                        <div className={styles.profileBg}/>
                        <div className={styles.profileSection}>
                            <Row>
                                <Col className="col col-lg-5 col-md-5 col-sm-12 col-12">
                                    <ProfileHeaderMenu menuItems={leftMenu}/>
                                </Col>
                                <Col className="col col-lg-5 ms-auto col-md-5 col-sm-12 col-12">
                                    <ProfileHeaderMenu updateProfile={updateProfile}
                                                       updateImage={updateImage}
                                                       isCurrentUserAuthorised={isCurrentUserAuthorised}
                                                       authorisedUser={authorisedUser}
                                                       isFetching={isFetching}
                                                       menuItems={rightMenu}/>
                                </Col>
                            </Row>
                            {/*<div className={`${styles.btnControl} btn more`}>
                                <TuneIcon className={styles.settingsIcon}/>
                                <ul className="moreDropdown moreWithTriangle triangleBottomRight">
                                    <li>
                                        <a href="#" data-bs-toggle="modal" data-bs-target="#update-header-photo">Update
                                            Profile Photo</a>
                                    </li>
                                    <li>
                                        <a href="#" data-bs-toggle="modal" data-bs-target="#update-header-photo">Update
                                            Header Photo</a>
                                    </li>
                                    <li>
                                        <a href="29-YourAccount-AccountSettings.html">Edit Profile Info</a>
                                    </li>
                                </ul>
                            </div>*/}
                        </div>
                        <div className={styles.profileUser}>
                            <ProfileImage
                                image={authorisedUser && isCurrentUserAuthorised ? authorisedUser.photos.large : profile.photos.large}
                                classNames={styles.ava}/>
                            <div
                                className={`${styles.profileName} h4`}>{authorisedUser && isCurrentUserAuthorised ? authorisedUser.fullName : profile.fullName}</div>
                            <div className={styles.status}>{status}</div>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

const ProfileHeaderMenu = ({menuItems, updateProfile, updateImage, isCurrentUserAuthorised, authorisedUser, isFetching}) => {
    const editProfileFormId = "editProfileForm";

    const {fullName, lookingForAJob, contacts, ...profileData} = authorisedUser || {};
    const [firstName, lastName] = fullName?.split(' ') || [];

    const profileObj = {
        firstName: firstName,
        lastName: lastName,
        lookingForAJob: lookingForAJob ? 'true' : 'false',
        ...contacts,
        ...profileData
    }

    const editProfile = (profile) => {
        const {
            firstName, lastName,
            facebook, github, instagram, mainLink, twitter, vk, website, youtube,
            ...profileData
        } = profile;

        const profileObj = {
            fullName: `${firstName} ${lastName}`,
            contacts: {facebook, github, instagram, mainLink, twitter, vk, website, youtube},
            ...profileData
        };

        updateProfile(profileObj)
    }

    return (
        <ul className={styles.profileMenu}>
            {menuItems.map(item => (
                !isCurrentUserAuthorised && item === 'settings' ?
                    null
                    :
                    <li key={item.name}>
                        {item.name === 'settings' ?
                            <div className="more btnControl">
                                <MoreHorizIcon/>
                                <ul className="moreDropdown moreWithTriangle triangleBottomRight">
                                    <li>
                                        <ModalWindowContainer text="Update Profile Photo"
                                                              dependency={authorisedUser}>
                                            <UploadImageReduxForm updateImage={updateImage}
                                                                  isFetching={isFetching}/>
                                        </ModalWindowContainer>
                                    </li>
                                    <li>
                                        <a href="#" data-bs-toggle="modal" data-bs-target="#update-header-photo">Update
                                            Header Photo</a>
                                    </li>
                                    <li>
                                        <ModalWindowContainer text="Edit Personal Info"
                                                              formId={editProfileFormId}
                                                              dependency={authorisedUser}
                                                              submitBtnText="Save all Changes">
                                            <EditProfileReduxForm initialValues={profileObj}
                                                                  onSubmit={editProfile}
                                                                  formId={editProfileFormId}
                                                                  authorisedUser={authorisedUser}
                                                                  isFetching={isFetching}/>
                                        </ModalWindowContainer>
                                    </li>
                                </ul>
                            </div>
                            :
                            <NavLink to={item.link}
                                     end
                                     className="profileHeaderMenuItem"
                            >{item.name}</NavLink>
                        }
                    </li>
            ))
            }
        </ul>
    )
}

export default ProfileHeader
