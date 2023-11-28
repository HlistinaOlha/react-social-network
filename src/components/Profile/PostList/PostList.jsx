import React, {PureComponent} from "react";
import PostListItem from "../PostListItem/PostListItem";
import styles from './PostList.module.css'
import {Field, reduxForm} from "redux-form";
import {maxLengthCreator, required} from "../../../utils/validators/validators";
import {TextArea} from "../../common/FormControls/FormControls";
import * as PropTypes from "prop-types";

const maxLength5 = maxLengthCreator(5)

const PostForm = ({handleSubmit}) => {

    return (
        <form className={styles.postForm}
              onSubmit={handleSubmit}>
            <Field component={TextArea}
                   name={'postText'}
                   validate={[required, maxLength5]}
            />
            <button type={"submit"}
                    className={styles.submitBtn}>Add post
            </button>
        </form>
    )
}

const PostReduxForm = reduxForm({form: 'post'})(PostForm)

const PostList = (props) => {

    let {posts, addNewPost} = props;

    const onSubmit = (data) => {
        addNewPost(data.postText)
    }

    return (
        <>
            <h3>My posts</h3>
            <PostReduxForm onSubmit={onSubmit}/>
            <ul>
                {
                    [...posts].reverse().map(post => (
                        <PostListItem key={post.id}
                                      message={post.message}
                                      likes={post.likes}/>
                    ))
                }
            </ul>
        </>
    )
}

export default PostList

