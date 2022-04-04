import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { connect } from 'react-redux';
import './App.css';
import { createStructuredSelector } from 'reselect';
import HomePage from './pages/homepage/homepage.component';
import FunctionalShopPage from './pages/shop/class.shop';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
// import CollectionsOverview from './components/collections-overview/collections-overview.component';
import CollectionPage from './pages/collection/collection.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
// import { selectCollectionsForPreview } from './redux/shop/shop.selector';

import { setCurrentUser } from './redux/user/user.actions';
import { selectCurrentUser } from './redux/user/user.selector';
import CheckoutPage from './pages/checkout/checkout.component';


class App extends React.Component {

  unsubscribeFromAuth = null;


  componentDidMount() {

    const { setCurrentUser } = this.props;
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data()

          });

        });
      }

      setCurrentUser(userAuth);
      // addCollectionAndDocuments('collections',collectionsArray.map(({title,items}) => ({title,items})));
    });
  }
  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }
  render() {

    return (
      <div >
        <Header />
        <Routes>
          <Route path='/' element={<HomePage />} >         
          </Route>
          <Route path='/shop/*' element={<FunctionalShopPage />}>
            <Route index element={<ShopPage />} />
            <Route path=":collectionId" element={<CollectionPage />} />
          </Route>
          <Route path='/checkout' element={<CheckoutPage />} />
          <Route path='/signin' element={<>
            {this.props.currentUser ?
              <Navigate to="/" />
              :
              <SignInAndSignUpPage />
            }
          </>
          }

          />

          <Route path='/signin' element={this.props.user ? <Navigate to="/" /> : <SignInAndSignUpPage />} />


        </Routes>
      </div>
    );
  }
}
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  // collectionsArray:selectCollectionsForPreview
})
const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
