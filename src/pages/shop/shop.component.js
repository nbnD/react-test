import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { connect } from 'react-redux';
import { updateCollections } from '../../redux/shop/shop.actions';
import WithSpinner from '../../components/with-spinner/with-spinner.component';
import CollectionsOverview from '../../components/collections-overview/collections-overview.component';
import CollectionPage from '../collection/collection.component';

import { firestore, convertCollectionsSnapShotToMap } from '../../firebase/firebase.utils';

const CollectionsOverviewWithSnpiiner=WithSpinner(CollectionsOverview);
const CollectionsPageWithSpinner=WithSpinner(CollectionPage);
class ShopPage extends React.Component {


  state = {
    loading: true,
  };

  unsubscribeFromSnapshot = null;

  componentDidMount() {
    const { updateCollections } = this.props;
    const collectionRef = firestore.collection('collections');
    // this.unsubscribeFromSnapshot = collectionRef.onSnapshot(async snapShopt => {
    //   const collectionsMap = convertCollectionsSnapShotToMap(snapShopt);
    //   updateCollections(collectionsMap);
    //   this.setState({loading:false});

    // })
// fetch('https://firestore.googleapis.com/v1/projects/thegadgetsnepal-db/databases/(default)/documents/collections')
// .then(response=>response.json())
// .then(collections=>console.log("collections",collections));

     collectionRef.get().then(
      async snapShopt => {
        const collectionsMap = convertCollectionsSnapShotToMap(snapShopt);
        updateCollections(collectionsMap);
        this.setState({loading:false});
  
      }
     )
    
  }

  render() {
    const {loading}=this.state;
    return (
      <div className='shop-page'>
        <Routes>
           <Route path="/" element={<CollectionsOverviewWithSnpiiner isLoading={loading} />} />
           {/* <Route path="/" element={<CollectionsOverview />} /> */}
         
          <Route path=":collectionId" element={<CollectionsPageWithSpinner isLoading={loading} collectionId={this.props.collections.collectionId}  />} />
        </Routes>
      </div>
    )
  }
}
const mapDispatchToProps = dispatch => ({
  updateCollections: collectionsMap => dispatch(updateCollections(collectionsMap))
})


export default connect(null, mapDispatchToProps)(ShopPage);