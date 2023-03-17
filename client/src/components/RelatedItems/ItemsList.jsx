import React, { useState } from 'react';
import FormatCard from './FormatCard';
import sampleData from './sampleData';

const ItemsList = (/* id, image, rating, prod_category, prod_name, price */) => {

  const [relatedItemsList, setRelatedItemsList] = useState(sampleData);
  console.log('relatedItemsList: ', relatedItemsList);

  const renderList = (item, index) => {
    return <FormatCard key={index} name={item.name} image={item.image} image={item.image} price={item.price} />
  };

  return(
    <div>
      {relatedItemsList.sampleData.map((item, index) => renderList(item, index))}
    </div>
  )
};

export default ItemsList;
