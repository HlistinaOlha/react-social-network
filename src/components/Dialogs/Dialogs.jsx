import React from "react";
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import styles from "./Dialogs.module.css"
import {Field, reduxForm} from "redux-form";
import {maxLengthCreator, required} from "../../utils/validators/validators";
import {TextArea} from "../common/FormControls/FormControls";

const maxLength5 = maxLengthCreator(5)

const MessageForm = ({handleSubmit}) => {
    return (
        <form className={styles.dialogsContainer}
              onSubmit={handleSubmit}>
            <Field component={TextArea}
                   name={'messageText'}
                   validate={[required, maxLength5]}
            placeholder="Enter your message"/>
            <button type={"submit"}>Send Message</button>
        </form>
    )
}

const MessageReduxForm = reduxForm({form: 'message'})(MessageForm)

const Dialogs = ({dialogs, messages, addMessage}) => {


    const onSubmit = (messageBody) => {
        addMessage(messageBody.messageText)

    }
    return (
        <>
            <div className={styles.dialogsContainer}>

                <div>{
                    dialogs.map(message => (

                        <DialogItem key={message.id}
                                    id={message.id}
                                    name={message.name}
                        />
                    ))
                }</div>
                <div>{
                    messages.map(message => (
                        <Message key={message.id}
                                 message={message.message}
                                 likes={message.likes}/>
                    ))
                }
                </div>
            </div>
            <MessageReduxForm onSubmit={onSubmit}/>
        </>)


}

export default Dialogs;

/*const Dialog = () => {
    const dialogs = [
        {
            name: 'Alex',
            message: 'Hi, how are you',
            id: 1
        },
        {
            name: 'Olha',
            message: "It's my first post",
            id: 2
        },
    ]

    const dialogs = [
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
    ]

    const dialogsElements = dialogs.map(dialog => <DialogItem key={dialog.id}
                                                              id={dialog.id}
                                                              name={dialog.name}/>)
    const messagesElements = dialogs.map(message => <DialogItem key={message.id}
                                                                 message={message.message}
                                                                 likes={message.likes}/>)
    return (
        <div>
            <div>{dialogsElements}</div>
            <div>{messagesElements}</div>
        </div>
    )
}*/

