import React from 'react';
import gif from './loading.gif';
import './Loading.modules.css';

const Loading = () => {
  return (
    <div className='loading'>
      <img src={gif} alt='' className='loading-gif' />
    </div>
  );
};

export default Loading;
