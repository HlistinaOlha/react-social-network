import {handleAuth} from "./auth-reducer";

const INITIALIZED_SUCCESS = 'socialNetwork/app/INITIALIZED_SUCCESS';

let initialState = {
    isInitialized: false,
}

const appReducer = (state = initialState, action) => {

    switch (action.type) {
        case INITIALIZED_SUCCESS:
            return {
                isInitialized: true,
            };
        default:
            return state;
    }
}

const initializedSuccess = () => ({type: INITIALIZED_SUCCESS})

export const initializeApp = () => {

    return async (dispatch) => {
        await dispatch(handleAuth())
        dispatch(initializedSuccess())

        /*let promise2 = dispatch(smthElse2())
        let promise3 = dispatch(smthElse3())
        Promise.all([promise, promise2, promise3]).then(() => {
            dispatch(initializedSuccess())
        })*/
    }
}

export default appReducer;
