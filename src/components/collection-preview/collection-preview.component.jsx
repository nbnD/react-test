import React from 'react';
import CollectionItems from '../collection-item/collection-item.component.jsx';
import { useLocation, useNavigate } from "react-router-dom";

import './collection-preview.styles.scss';

const CollectionPreview = ({ title, items, routeName }) => {
    let navigate = useNavigate();

    let { pathname } = useLocation();

    return (
        <div className='collection-preview'>
            <h1 className='title'
                onClick={() => navigate(`${pathname}/${routeName}`)}> {title.toUpperCase()}</h1>
            <div className='preview'>
                {
                    items.filter((item, index) => index < 4)
                        .map(item => (<CollectionItems key={item.id} item={item} />
                        ))}
            </div>
        </div>
    )
};
export default CollectionPreview;