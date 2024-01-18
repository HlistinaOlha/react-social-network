import React from "react";
import styles from './PostListItem.module.scss'
import Card from "../../UI/Card/Card";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import {ProfileImageItem} from "../ProfileItem/ProfileItemImage/ProfileImage";
import ModalWindowContainer from "../../common/Modal/ModalWindow";
import {Form, reduxForm} from "redux-form";
import {createField, TextArea} from "../../common/FormControls/FormControls";

const PostListItem = ({id, image, name, message, likes, removePost, changePost}) => {

    return (
        <Card post={true}>
            <div className={styles.postAuthor}>
                <div className={styles.authorInfo}>
                    <ProfileImageItem image={image} classNames="avatar"/>
                    <h6 className={styles.authorName}>{name}</h6>
                </div>
                <Dropdown id={id}
                          message={message}
                          removePost={removePost}
                          changePost={changePost}/>
            </div>
            <p>{message}</p>
            <div className={styles.postAdditionalInfo}>
                <div className={styles.likeContainer}>
                    <FavoriteBorderIcon className={styles.like}/>
                    <span>{likes}</span>
                </div>
            </div>
        </Card>
    )
}

const Dropdown = ({id, message, removePost, changePost}) => {
    const EditPostReduxForm = createEditPostReduxForm(message);

    return (
        <div className="more">
            <MoreHorizIcon/>
            <ul className="moreDropdown">
                <li>
                    <ModalWindowContainer text="Edit post"
                                          onSubmit={changePost}
                                          submitBtnText="Edit post">
                        <EditPostReduxForm initialValues={{postTextEdit: message}}/>
                    </ModalWindowContainer>
                </li>
                <li>
                    <a href="#" onClick={(e) => removePost(e, id)}>Delete Post</a>
                </li>
            </ul>
        </div>
    )

}

const createEditPostReduxForm = () => {

    const EditPostForm = ({handleSubmit}) => {

        return (
            <Form onSubmit={handleSubmit}>
                {createField(TextArea, "postTextEdit", '', [])}
            </Form>
        )
    }

    return reduxForm({
        form: 'post',
        enableReinitialize: true
    })(EditPostForm)
};


export default PostListItem
