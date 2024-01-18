import React, {memo} from "react";
import {addPost} from "../../../redux/profile-reducer";
import PostList from "./PostList";
import {useDispatch, useSelector} from "react-redux";
import {getPosts, getPostText} from "../../../redux/selectors/profile-selectors";
import {useAuth} from "../../../hook/useAuth";
import { reset } from 'redux-form';
//1)CREATING CONTAINER COMPONENT

/*const PostListContainer = () => {

    const [store] = useOutletContext();

    const addPost = () => {
        store.dispatch.call(store, addPostActionCreator())
    }

    const updatePostText = (text) => {
        store.dispatch.call(store, updatePostTextActionCreator(text))
    }

    return (
        <PostList posts={store.getState().profilePage.posts}
                  postText={store.getState().profilePage.postText}
                  updatePostText={updatePostText}
                  addPost={addPost}/>
    )
}*/

//2)CREATING CONTAINER COMPONENT WITH CONNECT()

/*const mapStateToProps = (state) => {
    return {
        posts: state.profilePage.posts,
        postText: state.profilePage.postText
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addPost: () => {
            dispatch(addPostActionCreator())
        },
        updatePostText: (text) => {
            dispatch(updatePostTextActionCreator(text))
        }
    }
}

const PostListContainer = connect(mapStateToProps, mapDispatchToProps)(PostList)
*/

//2)CREATING CONTAINER COMPONENT WITH useDispatch() AND useSelector()

const PostListContainer =  memo(() => {
    const dispatch = useDispatch()

    const posts = useSelector(state => getPosts(state))
    const postText = useSelector(state => getPostText(state))
    const {authorisedUser} = useAuth()

    const addNewPost = (postText) => {
        dispatch(addPost(postText))
        dispatch(reset('post'));
    }

    return (
        <PostList posts={posts}
                  postText={postText}
                  addNewPost={addNewPost}
                  image={authorisedUser?.photos.small}
                  name={authorisedUser?.fullName}
        />
    )
})

export default PostListContainer
