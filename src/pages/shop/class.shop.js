import React from 'react';
import { useParams } from 'react-router-dom';
import ShopPage from './shop.component';



const FunctionalShopPage = () => {
    const collections = useParams();
  
    return <ShopPage collections={collections}/>;
  };


export default FunctionalShopPage;