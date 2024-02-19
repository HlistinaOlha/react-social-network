import {combineReducers} from "redux";
import profileReducer from "./profile-reducer";
import {configureStore} from "@reduxjs/toolkit";
import usersReducer from "./users-reducer";
import authReducer from "./auth-reducer";
import {reducer as formReducer} from 'redux-form'
import appReducer from "./app-reducer.ts";

let reducers = combineReducers({
    profilePage: profileReducer,
    usersPage: usersReducer,
    auth: authReducer,
    app: appReducer,
    form: formReducer
})

let store = configureStore({
    reducer: reducers,
    //middleware: [thunkMiddleware]
});

export default store;
