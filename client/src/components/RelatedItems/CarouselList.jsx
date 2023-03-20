import React from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import ItemsList from './ItemsList';
import OutfitList from './OutfitList';
import { newRelatedCarouselIndex } from '../../features/related/relatedSlice';

const CarouselList = function ({ itemStyles }) {
  let { carouselIndex, related } = useSelector((state) => state.related);
  const dispatch = useDispatch();

  const nextSlide = function () {
    dispatch(newRelatedCarouselIndex(carouselIndex === related.length - 1 ? 0 : carouselIndex + 1));
  };
  const prevSlide = function () {
    dispatch(newRelatedCarouselIndex(carouselIndex === 0 ? related.length - 1 : carouselIndex - 1));
  };

  console.log('carouselIndex: ', carouselIndex);

  return (
    <div>
      <div className={itemStyles['items-list']}>
        <FaChevronLeft className={itemStyles['left-arrow']} onClick={prevSlide} itemStyles={itemStyles} />
        <ItemsList itemStyles={itemStyles} />
        <FaChevronRight className={itemStyles['right-arrow']} onClick={nextSlide} itemStyles={itemStyles} />
      </div>
      <div>
        {/* <FaChevronLeft />
        <OutfitList />
        <FaChevronRight /> */}
      </div>
    </div>
  );
};

export default CarouselList;
