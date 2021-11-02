import React from 'react';
import { Link } from 'react-router-dom';
import './sidebar.modules.css';

const SideBar = () => {
  const handleLogOut = () => {
    localStorage.clear();
    window.open('/', '_self');
  };

  return (
    <div className='sidebar'>
      <div className='sidebarLinks'>
        <div className='logo'>
          <i className='fas fa-universal-access'></i>
          <p>Pro Team</p>
        </div>

        <Link to='/' className='sidebarLink'>
          <i className='fas fa-home'></i>
          <span className='linkName'>Home</span>
        </Link>
        <Link to='/products' className='sidebarLink'>
          <i className='fab fa-product-hunt'></i>
          <span className='linkName'>Products</span>
        </Link>
        <Link to='/additem' className='sidebarLink'>
          <i className='fas fa-plus'></i>
          <span className='linkName'>Add Item</span>
        </Link>
        <Link to='/user' className='sidebarLink'>
          <i className='fas fa-user'></i>
          <span className='linkName'>User</span>
        </Link>
        <Link to='/newuser' className='sidebarLink'>
          <i className='fas fa-user-plus'></i>
          <span className='linkName'>New User</span>
        </Link>

        <button onClick={handleLogOut} className='logOutBtn'>
          <i className='fas fa-sign-out-alt'></i>
          <span className='linkName'>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default SideBar;
