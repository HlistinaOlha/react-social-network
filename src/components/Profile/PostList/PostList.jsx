import React from "react";
import PostListItem from "../PostListItem/PostListItem";
import {reduxForm, SubmissionError} from "redux-form";
import {maxLengthCreator} from "../../../utils/validators/validators";
import Card from "../../UI/Card/Card";
import {deletePost, editPost} from "../../../redux/profile-reducer";
import {useDispatch} from "react-redux";
import styles from './PostList.module.scss'
import {createField, TextArea} from "../../common/FormControls/FormControls";
import {Form} from "react-bootstrap";
import {ProfileImageItem} from "../ProfileItem/ProfileItemImage/ProfileImage";
import classNames from 'classnames';

const maxLength50 = maxLengthCreator(50)

const PostForm = ({image, handleSubmit}) => {

    function submit(values) {
        const error = maxLength50(values.postText)
        if (error) {
            throw new SubmissionError({_error: error, postText: error})
        }
        return handleSubmit()
    }


    return (
        <Form className={styles.postForm}
              onSubmit={handleSubmit(submit)}>
            <div className={styles.postAuthor}>
                <ProfileImageItem image={image}
                                  classNames={classNames(styles.postAvatar, 'avatar')}/>
                {createField(TextArea, "postText", 'Add new post...')}
            </div>
            <button className="btn btn-primary">Add Post</button>
        </Form>

    )
}

const PostReduxForm = reduxForm({form: 'post'})(PostForm)

const PostList = (props) => {

    let {image, name, posts, addNewPost} = props;
    const dispatch = useDispatch()

    const onSubmit = (data) => {
        addNewPost(data.postText)
    }

    const removePost = (e, postId) => {
        e.preventDefault()
        dispatch(deletePost(postId))
    }

    const changePost = (e, postId, postText) => {
        e.preventDefault()
        dispatch(editPost(postId, postText))
    }

    return (
        <div>
            <Card post={true}>
                <PostReduxForm image={image} onSubmit={onSubmit}/>
            </Card>
            <ul>
                {
                    [...posts].reverse().map(post => (
                        <PostListItem key={post.id}
                                      id={post.id}
                                      image={image}
                                      name={name}
                                      message={post.message}
                                      likes={post.likes}
                                      removePost={removePost}
                                      changePost={changePost}
                        />
                    ))
                }
            </ul>
        </div>

    )
}

export default PostList

