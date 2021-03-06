import React from "react";
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { ReactComponent as Logo } from '../../assets/crown.svg';
import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from "../cart-dropdown/cart-dropdown.component";
import "./header.styles.scss";
import { selectCartHidden } from "../../redux/cart/cart.selector";
import { selectCurrentUser } from "../../redux/user/user.selector";
import { HeaderContainer, LogoContainer, OptionsContainer, OptionLink } from "./header.styles";
import { signOutStart } from "../../redux/user/user.actions";


const Header = ({ currentUser, hidden, signOutStart }) => (
    <HeaderContainer>
        <LogoContainer to="/" >
            <Logo className='logo' />
        </LogoContainer>
        <OptionsContainer to="/">
            <OptionLink to='/shop'>SHOP</OptionLink>
            {/* <Link className='option' to='/shop'>CONTACT</Link> */}
            {
                currentUser ? <OptionLink as='div' className="option" onClick={signOutStart}> SIGN OUT</OptionLink> : <OptionLink to='/signin'>SIGN IN </OptionLink>
            }
            <CartIcon />
        </OptionsContainer>
        {hidden ? null : <CartDropdown />}

    </HeaderContainer>
);

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    hidden: selectCartHidden

});
const mapDispatchToProps = dispatch => ({
    signOutStart: () => dispatch(signOutStart())
})

export default connect(mapStateToProps, mapDispatchToProps)(Header);