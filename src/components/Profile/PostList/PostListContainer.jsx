import React, {memo} from "react";
import {addPost} from "../../../redux/profile-reducer";
import PostList from "./PostList";
import {connect, useDispatch, useSelector} from "react-redux";

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

    const posts = useSelector(state => state.profilePage.posts)
    const postText = useSelector(state => state.profilePage.postText)

    const addNewPost = (postText) => {
        dispatch(addPost(postText))
    }

    return (
        <PostList posts={posts}
                  postText={postText}
                  addNewPost={addNewPost}/>
    )
})

export default PostListContainer
