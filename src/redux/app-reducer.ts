import {handleAuth} from "./auth-reducer";
import {ActionTypes} from "../types/types";

const INITIALIZED_SUCCESS = 'socialNetwork/app/INITIALIZED_SUCCESS';

let initialState = {
    isInitialized: false,
}

export type InitialStateType = typeof initialState;

export type CurrentActionTypes = ActionTypes<typeof actions>

const appReducer = (state = initialState, action: CurrentActionTypes): InitialStateType => {

    switch (action.type) {
        case INITIALIZED_SUCCESS:
            return {
                isInitialized: true
            };
        default:
            return state;
    }
}


type InitializedSuccessActionType = {
    type: typeof INITIALIZED_SUCCESS
}
const actions = {
    initializedSuccess: (): InitializedSuccessActionType => ({type: INITIALIZED_SUCCESS} as const)
}

export const {initializedSuccess} = actions

export const initializeApp = () => {

    return async (dispatch: any) => {
        await dispatch(handleAuth())
        dispatch(initializedSuccess())
    }
}

export default appReducer;
