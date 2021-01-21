// External
import React from 'react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import { createStructuredSelector } from "reselect";

// Styles
import './header.styles.scss';
import { ReactComponent as Logo} from '../../assets/crown.svg';

// Components
import {auth} from '../../firebase/firebase.utils';
import CartIcon from'../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';
import {selectCartHidden} from '../../redux/cart/cart.selectors';
import {selectCurrentUser} from '../../redux/user/user.selector'

function Header ({currentUser, hidden}){
    return(
        <div className='header'>
            <Link className='logo-container' to='/'>
                <Logo className='logo'/>
            </Link>
            <div className="options">
                <Link to='/shop' className='options'> SHOP</Link>
            </div>
            <div className="options">
                <Link to='/contact' className='options'> CONTACT</Link>
                {
                    currentUser ? (
                    <div className='option' onClick={() => auth.signOut()}>
                    SIGN OUT
                    </div>
                    ) : (
                    <Link className='option' to='/signin'>
                    SIGN IN
                    </Link>
                    )}
                    <CartIcon/>
            </div>
            {

                hidden ? null:
            <CartDropdown />
            }
        </div>
    )
}

const mapStateToProps = createStructuredSelector ({
    currentUser: selectCurrentUser,
    hidden: selectCartHidden
})

export default connect(mapStateToProps)(Header);