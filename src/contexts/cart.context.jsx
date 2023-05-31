import { createContext, useReducer} from "react";
import createAction from '../utils/reducer/reducer.utils'

const addCartItem = (cartItems, productToAdd) => {
    const existingCartItem = cartItems.find(
        (cartItem) => cartItem.id === productToAdd.id
    );
    if(existingCartItem){
        return cartItems.map((cartItem) => {
            return cartItem.id === productToAdd.id?
            { ...cartItem, quantity: cartItem.quantity + 1}
            : cartItem;
        });
    }

    return [...cartItems, { ...productToAdd, quantity: 1 }];
}

const removeCartItem = (cartItems, cartItemToRemove) => {
    const existingCartItem = cartItems.find(
        (cartItem) => cartItem.id === cartItemToRemove.id
    );
    if(existingCartItem.quantity === 1){
        return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id)
    }
    return cartItems.map((cartItem) => {
        return cartItem.id === cartItemToRemove.id?
        { ...cartItem, quantity: cartItem.quantity - 1}
        : cartItem;
    });
}

const clearCartItem = (cartItems, cartItemToClear) => {
    // console.log(cartItems);
    return cartItems.filter(cartItem => cartItem.id !== cartItemToClear.id);
}

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    removeItemFromCart: () => {},
    clearItemFromCart: () => {},
    cartCount: 0,
    cartTotal: 0,
})

const CART_ACTION_TYPES = {
    SET_CART_ITEMS:'SET_CART_ITEMS',
    SWITCH_IS_CART_OPEN: 'SWITCH_IS_CART_OPEN'
}

const INITIAL_STATE = {
    isCartOpen: false,
    cartItems: [],    
    cartCount: 0,
    cartTotal: 0    
}

const cartReducer = (state, action) => {
    const { type, payload } = action;
    switch(type){
        case CART_ACTION_TYPES.SET_CART_ITEMS:
            return {
                ...state,
                ...payload,
            }
        case CART_ACTION_TYPES.SWITCH_IS_CART_OPEN:
            return {
                ...state,
                ...payload,
            }
        default:
            throw new Error(`unhandled type of ${type} ini cartReducer`)
    }
}

export const CartProvider = ({children}) => {
    // const [isCartOpen, setIsCartOpen] = useState(false);
    // const [cartItems, setCartItems] = useState([]);
    // const [cartCount, setCartCount] = useState(0);
    // const [cartTotal, setCartTotal] = useState(0);

    const [{ isCartOpen, cartItems, cartCount, cartTotal }, dispatch] = useReducer(cartReducer, INITIAL_STATE);

    // useEffect(() => {
    //     const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
    //     setCartCount(newCartCount);
    // }, [cartItems]);

    // useEffect(() => {
    //     const newCartTotal = cartItems.reduce((total, cartItem) => total + cartItem.price * cartItem.quantity, 0);
    //     setCartTotal(newCartTotal);
    // }, [cartItems]);

    const updateCartItemsReducer = (newCartItems) => {
        const newCartCount = newCartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
        const newCartTotal = newCartItems.reduce((total, cartItem) => total + cartItem.price * cartItem.quantity, 0);
        dispatch(createAction(
            CART_ACTION_TYPES.SET_CART_ITEMS,
            {
                cartItems: newCartItems, 
                cartTotal: newCartTotal, 
                cartCount: newCartCount 
            }
        ))
    }

    const addItemToCart = (productToAdd) => {
        const newCartItems = addCartItem(cartItems, productToAdd);
        updateCartItemsReducer(newCartItems);
        // setCartItems(addCartItem(cartItems, productToAdd));
    }
    
    const removeItemFromCart = (cartItemToRemove) => {
        const newCartItems = removeCartItem(cartItems, cartItemToRemove);
        updateCartItemsReducer(newCartItems);
        // setCartItems(removeCartItem(cartItems, cartItemToRemove));
    }
    
    const clearItemFromCart = (cartItemToClear) => {
        const newCartItems = clearCartItem(cartItems, cartItemToClear);
        updateCartItemsReducer(newCartItems);
        // setCartItems(clearCartItem(cartItems, cartItemToClear));
    }

    const updateIsCardOpenReducer = (newIsCartOpen) => {
        dispatch(createAction(
            CART_ACTION_TYPES.SWITCH_IS_CART_OPEN,
            {
                isCartOpen: newIsCartOpen
            }
        ))
    }

    const setIsCartOpen = (newIsCartOpen) => {
        updateIsCardOpenReducer(newIsCartOpen);
    }

    const value = { isCartOpen, setIsCartOpen, cartItems, addItemToCart, cartCount, removeItemFromCart, clearItemFromCart, cartTotal };
    return (
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    );
};