import { Fragment, useContext } from "react";
import { Outlet,Link } from "react-router-dom";
import { ReactComponent as CrownLogo } from "../../assets/crown.svg";
import { UserContext } from "../../contexts/user.context";
import { CartContext } from "../../contexts/cart.context";
import { signOutUser } from "../../utils/firebase/firebase.utils";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown-components";
import { NavigationContainer, LogoContainer, NavLinkContainer, NavLink } from "./navigation.styles.jsx"

const Navigation = () => {
    const { currentUser, setCurrentUser } = useContext(UserContext);
    const { isCartOpen, setIsCartOpen } = useContext(CartContext);

    return (
        <Fragment>
            <NavigationContainer>
                <LogoContainer to='/'>
                    <CrownLogo className='logo' />
                </LogoContainer>
                <NavLinkContainer>
                    <NavLink to='/shop'>SHOP</NavLink>
                    {
                        currentUser?
                            (<NavLink as='span' onClick={signOutUser}>SIGN OUT</NavLink>)
                            :
                            (<NavLink to='/authentication'>SIGN IN</NavLink>)
                        
                    }
                    <CartIcon />
                </NavLinkContainer>
            </NavigationContainer>
            {isCartOpen && (<CartDropdown />)}
            <Outlet/>
        </Fragment>
    )
}
export default Navigation;