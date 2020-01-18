import React, { useState, useEffect } from 'react';
import ImageCard from './ImageCard';
import { Loader } from 'semantic-ui-react';

const ImagesList = ({imageList, setActiveImage}) => {
  let [carousalStartIndex, setCarousalStartIndex] = useState(0);
  let [ visibleImages, setVisibleImages ] = useState(null);
  let carousalEndIndex = Math.min(carousalStartIndex + 4, imageList.length)
  useEffect(() => {
    const images = imageList.filter((image, index) => {
      console.log('index', index);
      if(index >= carousalStartIndex && index < carousalEndIndex)
        return true;
      return false;
    });
    setVisibleImages(images)
  }, [carousalStartIndex, imageList.length])
  if (!visibleImages)
    return <Loader active content='Loading' inline='centered' size='medium'/>;
  return (
    <div className='images'>
      {carousalStartIndex ? <div className='arrow prevArrow' onClick={() => setCarousalStartIndex(carousalStartIndex - 1)}>{'<'}</div> : ''}
      <div className='image-list'>
        {visibleImages.map((details, index) => <ImageCard key={details.id} details={details} clickHandler={setActiveImage}/>)}
      </div>
      {carousalEndIndex < imageList.length ? <div className='arrow nextArrow' onClick={() => setCarousalStartIndex(carousalStartIndex + 1)}>{'>'}</div> : ''}
    </div>
  )
};

export default ImagesList;