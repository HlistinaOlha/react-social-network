import React from "react";
import {addMessage} from "../../redux/messages-reducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {compose} from "redux";
import {getMessages, getMessageText} from "../../redux/selectors/messages-selectors";
import {getDialogs, getDialogsSelector, getDialogsSuperSelector} from "../../redux/selectors/profile-selectors";

/*const mapDispatchToProps = (dispatch) => {
    return {
        addMessage: () => {
            dispatch(addMessageActionCreator())
        },
        updateMessageText: (message) => {
            dispatch(updateMessageTextActionCreator(message))
        }
    }
}*/

const mapStateToProps = (state) => {
    return {
        dialogs: getDialogs(state),
        messages: getMessages(state),
        messageText: getMessageText(state)
    }
}

/*
const AuthRedirectComponent = WithAuthRedirect(Dialogs);

//const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs)
const DialogsContainer = connect(mapStateToProps, {addMessage, updateMessageText})(AuthRedirectComponent)
*/

export default compose(
  /*  WithAuthRedirect,*/
    connect(mapStateToProps, {addMessage})
)(Dialogs)

