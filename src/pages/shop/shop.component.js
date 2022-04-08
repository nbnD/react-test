import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { connect } from 'react-redux';

import { fetchCollectionsStart } from '../../redux/shop/shop.actions';
// import { fetchCollectionsStart } from '../../redux/shop/shop.sagas';
import CollectionsOverviewContainer from '../../components/collections-overview/collections-overview.container';
import CollectionsPageContainer from '../collection/collection.container';


class ShopPage extends React.Component {

  componentDidMount() {
    //for thunk
    // const { fetchCollectionsStartAsync } = this.props;
    // fetchCollectionsStartAsync();
    //for thunk 

    //for saga
    const { fetchCollectionsStart } = this.props;
    fetchCollectionsStart();
  }

  render() {
   
    return (
      <div className='shop-page'>
        <Routes>
          {/* <Route path="/" element={<CollectionsOverviewWithSnpiiner isLoading={!isCollectionsLoaded} />} /> */}
          <Route path="/" element={<CollectionsOverviewContainer/>} />
          <Route path=":collectionId" element={<CollectionsPageContainer collectionId={this.props.collections.collectionId}/>} />
          {/* <Route path=":collectionId" element={<CollectionsPageWithSpinner isLoading={!isCollectionsLoaded} collectionId={this.props.collections.collectionId} />} /> */}
        </Routes>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  //for thunk
  // fetchCollectionsStartAsync: () => dispatch(fetchCollectionsStartAsync())
  // for thunk

  //for saga
  fetchCollectionsStart: () => dispatch(fetchCollectionsStart())
})
export default connect(null, mapDispatchToProps)(ShopPage);