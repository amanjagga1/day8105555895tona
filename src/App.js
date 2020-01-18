import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import ActiveImage from './ActiveImage';
import ImagesList from './ImagesList';

function App() {
  const [imageList, setImageList ] = useState([]);
  const [activeImage, setActiveImage] = useState(null);

  useEffect(() => {
    axios.get('https://74k4rzrsqubz5ma3f-mock.stoplight-proxy.io/api/v1/images/list')
    .then((res) => {
      setImageList(res.data);
    })
  }, [])
  return (
    <div className="App">
      <span className='heading'>
        <div className='underline'>Images</div>
      </span>
      <ImagesList imageList={imageList} setActiveImage={setActiveImage} />
      {activeImage && <ActiveImage image={activeImage} />}
    </div>
  );
}

export default App;
