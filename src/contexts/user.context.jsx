import { createContext, useState, useEffect } from "react";
import { createUserDocumentFromAuth, onAuthStateChangedListener } from "../utils/firebase/firebase.utils";

// as the acutal value you want to access
export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null,
});

export const UserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
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