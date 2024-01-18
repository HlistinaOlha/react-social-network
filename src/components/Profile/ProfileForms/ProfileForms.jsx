import React, {Fragment, useRef, useState} from "react";
import Preloader from "../../common/Preloader/Preloader";
import {Form, reduxForm} from "redux-form";
import styles from "../ProfileItem/ProfileItem.module.scss";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import {createField, Input, InputFile, InputSearch, Radio, TextArea} from "../../common/FormControls/FormControls";
import {Row} from "react-bootstrap";
import {Col} from "react-bootstrap";
import {required} from "../../../utils/validators/validators";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from '@mui/icons-material/Clear';
import {reset} from 'redux-form';
import {useDispatch} from "react-redux";

const UploadImageForm = ({handleSubmit, updateImage, isFetching}) => {

    const hiddenFileInput = useRef(null);

    const handleClick = (e) => {
        e.preventDefault();
        hiddenFileInput.current.click();
    };

    return (
        isFetching ?
            <Preloader/>
            :
            <Form onSubmit={handleSubmit}>
                <a href="#"
                   className={styles.uploadPhotoItem}
                   onClick={handleClick}>
                    <DriveFolderUploadOutlinedIcon/>
                    <h6>Upload Photo</h6>
                    <span>Browse an image from your computer.</span>
                </a>
                {createField(InputFile, "inputFile", '', [],
                    {
                        updateImage,
                        hiddenFileInput
                    })}
            </Form>
    )
}


export const UploadImageReduxForm = reduxForm({form: 'uploadImage'})(UploadImageForm)

const SearchUserForm = ({handleSubmit, onSubmit, formId}) => {

    const [searchString, setSearchString] = useState('')

    const searchUser = (e) => {
        const newSearchString = e.target.value && e.target.value.trim().toLowerCase()
        setSearchString(newSearchString)
        onSubmit(newSearchString)
    }

    const clearSearchField = () => {
        setSearchString('')
    }


    return (
        <div className={styles.searchUserFormContainer}>
            <Form id={formId}
                  onSubmit={handleSubmit}
                  className={styles.searchUserForm}>
                {createField(InputSearch, "inputSearch", 'Search users...', [],
                    {
                        searchUser,
                        value: searchString
                    })}
            </Form>
            {searchString ?
                <button onClick={clearSearchField}
                        className={`${styles.searchBtnWrapper} ${styles.submitBtn}`}>
                    <ClearIcon/>
                </button>
                :
                <button type="submit"
                        form={formId}
                        className={`${styles.searchBtnWrapper} ${styles.submitBtn}`}>
                    <SearchIcon/>
                </button>
            }

        </div>
    )
}


export const SearchUserReduxForm = reduxForm({form: 'searchUser'})(SearchUserForm)

const EditProfileForm = ({handleSubmit, formId, authorisedUser, isFetching}) => {

    const {lookingForAJob} = authorisedUser;

    const radioOptions = [
        {
            label: "Yes",
            value: "true"
        },
        {
            label: "No",
            value: "false"
        }
    ]


    const [lookingForAJobSelectedOption, setLookingForAJobSelectedOption] = useState(String(lookingForAJob))

    const handleOptionChange = (e) => {
        setLookingForAJobSelectedOption(e.target.value);
        //setLookingForAJobSelectedOption(lookingForAJobSelectedOption === "true" ? "false" : "true");
    };

    return (
        isFetching ?
            <Preloader/>
            :
            <Form id={formId} onSubmit={handleSubmit}>
                <Row>
                    <Col className="col col-lg-6 col-md-6 col-sm-12 col-12">
                        {createField(Input, "firstName", "First Name", [required])}
                        {createField(TextArea, "lookingForAJobDescription", "Describe your professional skills",
                            [required])}
                    </Col>
                    <Col className="col col-lg-6 col-md-6 col-sm-12 col-12">
                        {createField(Input, "lastName", "Last Name", [required])}
                        <div>Are you looking for a job?</div>
                        <div className="d-flex mt-3">
                            {
                                radioOptions.map(option => (
                                    <Fragment key={option.value}>
                                        {
                                            createField(Radio, "lookingForAJob", "", [],
                                                {
                                                    checked: lookingForAJobSelectedOption === option.value,
                                                    value: option.value,
                                                    handleOptionChange
                                                }, option.label)
                                        }
                                    </Fragment>
                                ))
                            }
                        </div>
                    </Col>
                    <Col className="col col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 mt-3">
                        {createField(TextArea, "aboutMe", "Write a little description about you",
                            [required])}
                    </Col>
                    <Col className="col col-lg-6 col-md-6 col-sm-12 col-12 mt-3">
                        {createField(Input, "facebook", "Your Facebook Account", [],
                            {
                                type: "url",
                                pattern: "https://.*",
                                size: "30"
                            })}
                        {createField(Input, "github", "Your Github Account", [],
                            {
                                type: "url",
                                pattern: "https://.*",
                                size: "30"
                            })}
                        {createField(Input, "instagram", "Your Instagram Account", [],
                            {
                                type: "url",
                                pattern: "https://.*",
                                size: "30"
                            })}
                        {createField(Input, "mainLink", "Your MainLink Account", [],
                            {
                                type: "url",
                                pattern: "https://.*",
                                size: "30"
                            })}
                    </Col>
                    <Col className="col col-lg-6 col-md-6 col-sm-12 col-12 mt-3">
                        {createField(Input, "twitter", "Your Twitter Account", [],
                            {
                                type: "url",
                                pattern: "https://.*",
                                size: "30"
                            })}
                        {createField(Input, "vk", "Your VK Account", [],
                            {
                                type: "url",
                                pattern: "https://.*",
                                size: "30"
                            })}
                        {createField(Input, "website", "Your Website", [],
                            {
                                type: "url",
                                pattern: "https://.*",
                                size: "30"
                            })}
                        {createField(Input, "youtube", "Your Youtube Account", [],
                            {
                                type: "url",
                                pattern: "https://.*",
                                size: "30"
                            })}
                    </Col>
                </Row>
            </Form>
    )
}

export const EditProfileReduxForm = reduxForm({form: 'editProfile'})(EditProfileForm)
