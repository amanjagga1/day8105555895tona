import React from 'react';

const ImageCard = (props) => {
  return(
    <img
      className='image-card'
      alt={'Image'}
      width="150"
      height="150"
      src={props.details.url}
      onClick={() => props.clickHandler(props.details)} />
  );

};

export default ImageCard;