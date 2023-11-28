import profileReducer, {addPost, deletePost} from "./profile-reducer";
import {render, screen} from "@testing-library/react";
import App from "../App";

let initialState = {
    posts: [
        {
            message: 'Hi, how are you',
            likes: '3',
            id: 1
        },
        {
            message: "It's my first post",
            likes: '5',
            id: 2
        },
        {
            message: 'Wow, that is cool',
            likes: '13',
            id: 3
        },
        {
            message: "I am so happy to be here!",
            likes: '25',
            id: 4
        },
    ]
}
let action = addPost('i-am-learning-react-woo-hoo!');

test('length of posts should be incremented', () => {
    //1.test data

    //2.action
    let newState = profileReducer(initialState, action);

    //expectation
    expect(newState.posts.length).toBe(5)

});

test('message of a new post should be correct', () => {
    //1.test data

    //2.action
    let newState = profileReducer(initialState, action);

    //expectation
    expect(newState.posts[4].message).toBe('i-am-learning-react-woo-hoo!')

});

test('likes count of a new post should be 0', () => {
    //1.test data

    //2.action
    let newState = profileReducer(initialState, action);

    //expectation
    expect(newState.posts[4].likes).toBe(0)

});

test('after deleting length of posts should be decremented', () => {
    //1.test data
    let action = deletePost(1);

    //2.action
    let newState = profileReducer(initialState, action);

    //expectation
    expect(newState.posts.length).toBe(3)

});

test("after deleting length of posts shouldn't be be decremented if id is incorrect", () => {
    //1.test data
    let action = deletePost(1000);

    //2.action
    let newState = profileReducer(initialState, action);

    //expectation
    expect(newState.posts.length).toBe(4)

});
