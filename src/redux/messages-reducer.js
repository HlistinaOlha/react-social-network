const ADD_MESSAGE = 'socialNetwork/messages/ADD-MESSAGE';

let initialState = {
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
}

export const messagesReducer = (state = initialState, action) => {

    switch (action.type) {
        case ADD_MESSAGE:
            let updatedState = {...state};

            let newMessage = {
                message: action.messageText,
                likes: 0,
                id: state.messages.length + 1
            }

            if (newMessage.message && newMessage.message.trim()) {
                updatedState = {
                    ...state,
                    messages: [...state.messages, newMessage],
                }
            }
            return updatedState;
        default:
            return state;
    }
}

export const addMessage = (messageText) => ({
    type: ADD_MESSAGE,
    messageText
})

export default messagesReducer;
