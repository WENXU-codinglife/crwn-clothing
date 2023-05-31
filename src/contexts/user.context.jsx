import { createContext, useEffect, useReducer } from "react";
import { createUserDocumentFromAuth, onAuthStateChangedListener } from "../utils/firebase/firebase.utils";

import createAction from "../utils/reducer/reducer.utils";

// as the acutal value you want to access
export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null,
});

export const USER_ACTION_TYPES = {
    SET_CURRENT_USER: 'SET_CUURENT_USER'
}


const userReducer = (state, action) => {
    const { type, payload } = action;
    
    switch(type) {
        case USER_ACTION_TYPES.SET_CURRENT_USER:
            return {
                ...state,
                currentUser: payload
            }
            default: 
            throw new Error(`Unhandled type ${type} in userReducer`);
        }
    }
    
const INITIAL_STATE = {
    currentUser: null
}

export const UserProvider = ({ children }) => {
    const [ { currentUser }, dispatch ] = useReducer(userReducer, INITIAL_STATE)
    // const { currentUser } = state

    const setCurrentUser = (user) => {
        dispatch({ type: USER_ACTION_TYPES.SET_CURRENT_USER, payload: user })
        dispatch(createAction(
            USER_ACTION_TYPES.SET_CURRENT_USER,
            user,
        ))
    }

    const value = { currentUser, setCurrentUser };

    useEffect(() => {
        const unsubscribe = onAuthStateChangedListener((user) => {
            if(user)createUserDocumentFromAuth(user);
            setCurrentUser(user);
        });
        return unsubscribe;
    }, [])

    return <UserContext.Provider value={value}>{children} </UserContext.Provider>
}
/*
In React, the useEffect hook takes a callback function as its first argument. 
This callback function is known as the "effect" and is used to specify the side 
effects that you want to run when certain component props or state values change. 
This function does not return a value, but it can return another function called 
the "cleanup" function.

The cleanup function is used to perform any necessary cleanup before the component 
re-renders. This cleanup function would be invoked by React before the component 
re-renders, it can be used to cancel any ongoing network requests, remove event 
listeners, or any other cleanup logic that is necessary before the component is 
re-rendered.
*/ 