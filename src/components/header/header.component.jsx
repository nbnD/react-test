import React from "react";
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Link } from "react-router-dom";
import { ReactComponent as Logo } from '../../assets/crown.svg';
import { auth } from "../../firebase/firebase.utils";
import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from "../cart-dropdown/cart-dropdown.component";
import "./header.styles.scss";
import { selectCartHidden } from "../../redux/cart/cart.selector";
import { selectCurrentUser } from "../../redux/user/user.selector";
import { HeaderContainer,LogoContainer,OptionsContainer,OptionLink } from "./header.styles";
const Header = ({ currentUser, hidden }) => (

    

    <HeaderContainer>
        <LogoContainer to="/" >
            <Logo className='logo' />
        </LogoContainer>
        <OptionsContainer to="/">
            <OptionLink  to='/shop'>SHOP</OptionLink>
            {/* <Link className='option' to='/shop'>CONTACT</Link> */}
            {
                currentUser ? <OptionLink as='div' className="option" onClick={() => auth.signOut()}> SIGN OUT</OptionLink> : <OptionLink  to='/signin'>SIGN IN </OptionLink>
            }
            <CartIcon />
        </OptionsContainer>
        {hidden ? null : <CartDropdown />}

    </HeaderContainer>
);

const mapStateToPropos =  createStructuredSelector({
    currentUser: selectCurrentUser,
    hidden: selectCartHidden

});


export default connect(mapStateToPropos)(Header);