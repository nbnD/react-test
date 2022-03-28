import React from 'react';
import CollectionItems from '../collection-item/collection-item.component.jsx';

import './collection-preview.styles.scss';

const CollectionPreview = ({ title, items }) => (
    <div className='collection-preview'>
        <h1 className='title'> {title.toUpperCase()}</h1>
        <div className='preview'>
            {
                items.filter((item, index) => index < 4)
                    .map(({ id, ...otherItemProps }) => (<CollectionItems key={id} {...otherItemProps} />

                    ))
            }
        </div>
    </div>
);
export default CollectionPreview;