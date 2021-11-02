import React from 'react';
import './footer.modules.css';

const Footer = () => {
  // return (
  //   <div >
  //     <small>
  //       <i className='fas fa-universal-access'></i>
  //
  //     </small>
  //   </div>
  // );
  return (
    <small className='footer'>
      &copy;
      {new Date().getFullYear()}&nbsp; &nbsp;{' '}
      <i className='fas fa-universal-access'></i> &nbsp; Pro Team
    </small>
  );
};

export default Footer;
