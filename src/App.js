import React, { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { connect } from 'react-redux';
import './App.css';
import { createStructuredSelector } from 'reselect';
import HomePage from './pages/homepage/homepage.component';
import FunctionalShopPage from './pages/shop/class.shop';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import CollectionsPageContainer from './pages/collection/collection.container';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import CheckoutPage from './pages/checkout/checkout.component';
import { checkUserSession } from './redux/user/user.actions';
import { selectCurrentUser } from './redux/user/user.selector';

const App = ({ checkUserSession, currentUser }) => {

  // unsubscribeFromAuth = null;

  useEffect(() => {
    checkUserSession();
  }, [checkUserSession])



  return (
    <div >
      <Header />
      <Routes>
        <Route path='/' element={<HomePage />} >
        </Route>
        <Route path='/shop/*' element={<FunctionalShopPage />}>
          <Route index element={<ShopPage />} />
          <Route path=":collectionId" element={<CollectionsPageContainer />} />
        </Route>
        <Route path='/checkout' element={<CheckoutPage />} />
        <Route path='/signin' element={<>
          {currentUser ?
            <Navigate to="/" />
            :
            <SignInAndSignUpPage />
          }
        </>
        }

        />
        <Route path='/signin' element={currentUser ? <Navigate to="/" /> : <SignInAndSignUpPage />} />


      </Routes>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
})

const mapDispatchToProps = dispatch => ({
  checkUserSession: () => dispatch(checkUserSession())
})


export default connect(mapStateToProps, mapDispatchToProps)(App);
