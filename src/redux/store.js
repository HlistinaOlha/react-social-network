import profileReducer from "./profile-reducer";
import messagesReducer from "./messages-reducer";
import sidebarReducer from "./sidebar-reducer";

const store = {
    _state: {
        profilePage: {
            postText: '',
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
            ],
            dialogs: [
                {
                    name: 'Alex',
                    id: 1
                },
                {
                    name: 'Olha',
                    id: 2
                },
                {
                    name: 'Sam',
                    id: 3
                },
                {
                    name: 'Lena',
                    id: 4
                },
            ]
        },
        messagesPage: {
            messageText: '',
            messages: [
                {
                    message: 'Hi',
                    likes: '3',
                    id: 1
                },
                {
                    message: "Hey there!",
                    likes: '13',
                    id: 2
                },
                {
                    message: 'Good day!',
                    likes: '8',
                    id: 3
                },
                {
                    message: "Yo!",
                    likes: '33',
                    id: 4
                },
            ],
        },
        usersPage: {
            users: [
                {
                    id: 0,
                    name: 'Dmitriy K.',
                    status: 'I am looking for a job right now...',
                    location: 'Ukraine, Kharkiv'
                },
                {
                    id: 1,
                    name: 'Svetlana D.',
                    status: 'I am so pretty!',
                    location: 'Ukraine, Sumy'
                },
                {
                    id: 2,
                    name: 'Sergei J.',
                    status: 'I like football!',
                    location: 'Ukraine, Kiev'
                },
                {
                    id: 3,
                    name: 'Andrew V.',
                    status: 'I am free to help you learn JS',
                    location: 'United States, Philadelphia'
                },
                {
                    id: 4,
                    name: 'Dmitriy K.',
                    status: 'I am looking for a job right now...',
                    location: 'Ukraine, Kharkiv'
                },
                {
                    id: 5,
                    name: 'Svetlana D.',
                    status: 'I am so pretty!',
                    location: 'Ukraine, Sumy'
                },
                {
                    id: 6,
                    name: 'Sergei J.',
                    status: 'I like football!',
                    location: 'Ukraine, Kiev'
                },
                {
                    id: 7,
                    name: 'Andrew V.',
                    status: 'I am free to help you learn JS',
                    location: 'United States, Philadelphia'
                },
            ]
        },
        sidebar: {
            friends: [
                {
                    name: 'Andrew',
                    id: 11
                },
                {
                    name: 'Sasha',
                    id: 12
                },
                {
                    name: 'Steven',
                    id: 13
                },
            ]
        }
    },
    _callSubscriber() {
        console.log('State has been changed')
    },

    getState() {
        return this._state;
    },
    subscribe(observer) {
        console.log(this)
        this._callSubscriber = observer;
    },

    dispatch(action) { //action - is an object: { type: 'ADD-POST'}
        this._state.profilePage = profileReducer(this._state.profilePage, action)
        this._state.messagesPage = messagesReducer(this._state.messagesPage, action)
        this._state.sidebar = sidebarReducer(this._state.sidebar, action)

        this._callSubscriber(this._state)
    }
}

export default store;
