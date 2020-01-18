import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Loader, Button } from 'semantic-ui-react';
import tesseract from 'tesseract.js';

const ActiveImage = (props) => {
  const [imageDetails, setImageDetails ] = useState(null);
  const [loading, setLoading ] = useState(false);
  const [ scanCode, setScanCode ] = useState(false);

  console.log('active', props.image)
  useEffect(() => {
    setLoading(true);
    axios.get('https://74k4rzrsqubz5ma3f-mock.stoplight-proxy.io/api/v1/images', {
      params: {
        id: props.image.id
      }
    }).then((res) => {
      setImageDetails(res.data);
      setLoading(false);
    })
  }, [props.image.id]);

  if(loading) {
    return <Loader active />;
  }
  if(!imageDetails)
    return null;

  console.log(imageDetails)
  return(
    <div>
      <span className='heading'>
        <div className='underline'>Detail</div>
      </span>
      <div class='detail-card'>
        <div className='image-row'>
          <img className='active-image' width='200' height='200' src={imageDetails.url} />
          <div>
            <div className='bold'>{imageDetails.title}</div>
            <div> Quantity: {imageDetails.quantity}</div>
            <div className='bold' style={{marginTop: '10px'}}>Description</div>
            <div> {imageDetails.description}</div>
          </div>
        </div>
        <div>
          <div className='bold'>Features</div>
          <ol>
          {imageDetails.features && imageDetails.features.map((feature) => (<li>{feature}</li>))}
          </ol>
        </div>
        <div className='button' onClick={() => scanNow(imageDetails.url, setScanCode)}>Scan Now</div>
      </div>
      {scanCode.loading || scanCode.code ?
        <div className='scan-code'>
          {scanCode.loading ? <Loader active /> : scanCode.code }
        </div>
      : null}
    </div>
  );

};

function scanNow(url, setScanCode) {
  // axios.get(url,{
  //   headers: {
  //     'Access-Control-Allow-Origin' : '*'
  //   }
  // })
  // .then((res) => console.log('red'))
  setScanCode({ loading: true });
  tesseract.recognize('./sample.jpg')
    .then(({ data: { text }}) => setScanCode({ code: text, loading: false }));
  // var img = new Image;
  // var canvas = document.createElement("canvas");
  // var ctx = canvas.getContext("2d");

  // img.crossOrigin = "Anonymous";

  // img.onload = function() {
  //   canvas.width = img.width;
  //   canvas.height = img.height;
  //   ctx.drawImage(img, 0, 0);


  // }
  // img.src = url;
}

export default ActiveImage;