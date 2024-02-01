import React from "react";
import Preloader from "../../common/Preloader/Preloader";
import ProfileHeader from "./ProfileItemHeader/ProfileItemHeader";
import {Outlet} from "react-router-dom";
import store from "../../../redux/redux-store";
import {Container, Row} from "react-bootstrap";

function ProfileItem({
                         profile,
                         status,
                         changeImage,
                         headerImages,
                         updateProfile,
                         authorisedUser,
                         isCurrentUserAuthorised,
                         isFetching
                     }) {

    const updateImage = (e) => {
        if (e.target.files.length) {
            changeImage(e.target.files[0])
        }
        e.target.value = null;
    }

    if (!profile) {
        return <Preloader/>
    }

    return (
        <>
            <ProfileHeader profile={profile}
                           authorisedUser={authorisedUser}
                           isCurrentUserAuthorised={isCurrentUserAuthorised}
                           status={status}
                           updateImage={updateImage}
                           headerImages={headerImages}
                           updateProfile={updateProfile}
                           isFetching={isFetching}
            />
            <Container>
                <Row>
                    <Outlet context={[store, isCurrentUserAuthorised]}/>
                </Row>
            </Container>
        </>
    )
}

export default ProfileItem
