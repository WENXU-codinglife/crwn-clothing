import { Fragment, useContext } from "react";
import { Outlet,Link } from "react-router-dom";
import { ReactComponent as CrownLogo } from "../../assets/crown.svg";
import { UserContext } from "../../contexts/user.context";
import { CartContext } from "../../contexts/cart.context";
import { signOutUser } from "../../utils/firebase/firebase.utils";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown-components";
import "./navigation.styles.scss"

const Navigation = () => {
    const { currentUser, setCurrentUser } = useContext(UserContext);
    const { isCartOpen, setIsCartOpen } = useContext(CartContext);

    return (
        <Fragment>
            <div className='navigation'>
                <Link className='logo-container' to='/'>
                    <CrownLogo className='logo' />
                </Link>
                <div className='nav-links-container'>
                    <Link className='nav-link' to='/shop'>SHOP</Link>
                    {
                        currentUser?
                            (<span className='nav-link' onClick={signOutUser}>SIGN OUT</span>)
                            :
                            (<Link className='nav-link' to='/authentication'>SIGN IN</Link>)
                        
                    }
                    <CartIcon />
                </div>
            </div>
            {isCartOpen && (<CartDropdown />)}
            <Outlet/>
        </Fragment>
    )
}
export default Navigation;