import React from 'react';
import { useParams } from 'react-router-dom';
import FormatCard from './FormatCard';
import ComparisonModal from './ComparisonModal';
import QuarterStarsAverageRating from '../ReviewsRatings/QuarterStarsAverageRating';
import { useGetRelatedProductInfoQuery } from '../../features/api/apiSlice';
import itemStyles from './Items.module.css';

function ItemsList({ relatedIndex }) {
  const params = useParams();
  const {
    data: relatedProducts,
    isFetching,
  } = useGetRelatedProductInfoQuery(`${params.productId}`, {
    refetchOnMountOrArgChange: true,
  });

  // Finds first available image for the primary style
  function findImage(item) {
    for (let i = 0; i < item.photos.results.length; i++) {
      const style = item.photos.results[i];
      for (let j = 0; j < style.photos.length; j++) {
        const stylePhoto = style.photos[j];
        if (stylePhoto.thumbnail_url) {
          return stylePhoto.thumbnail_url;
        }
      }
    }
  }

  // ATTEMPTED REFACTOR, DOES NOT WORK
  // const findImage = function (item) {
  //   for (let i = 0; i < item.photos.results.length; i++) {
  //     const style = item.photos.results[i];
  //     return style.photos.find(photo => photo.thumbnail_url);
  //   };
  // };

  function renderList(item, index) {
    return (
      <div key={index}>
        {relatedIndex <= index && (
          <FormatCard
            stars={Object.keys(item.ratings.ratings).length > 0
              ? <QuarterStarsAverageRating productRating={item.ratings.ratings} />
              : <p>rating unavailable</p>}
            name={item.details.name}
            category={item.details.category}
            image={findImage(item)}
            price={item.details.default_price}
            salePrice={item.details.sale_price}
            itemStyles={itemStyles}
            item={item}
          />
        )}
      </div>
    );
  }

  if (isFetching) {
    return <div>loading...</div>;
  }

  return relatedProducts && (
    <div className={itemStyles['items-list-wrapper']}>
      <ComparisonModal />
      <span className={itemStyles['items-list-title']}>Other items that might interest you</span>
      <div className={itemStyles['items-list-content']}>
        { relatedProducts.map((item, index) => renderList(item, index)) }
      </div>
    </div>
  );
}

export default ItemsList;
