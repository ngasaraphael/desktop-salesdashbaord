import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import SideBar from './components/sidebar/SideBar';
import Home from './pages/home/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import NewUser from './pages/newuser/NewUser';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import Products from './pages/products/Products';
import AddItemModal from './components/addItemModal/AddItemModal';
import Footer from './components/footer/Footer';
import User from './pages/user/User';

const App = () => {
  const [user, setUser] = useState('');

  useEffect(() => {
    let user = localStorage.getItem('user');
    setUser(user);

    // window.open('/', '_self');
    //window.location.reload();
  }, ['']);

  const LoggedIn = (authData) => {
    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user);
    console.log(localStorage);
  };

  if (!user) {
    return (
      <Router>
        <Switch>
          <Route exact path='/'>
            <Login LoggedIn={LoggedIn} />
          </Route>
          <Route path='/register'>
            <Register />
          </Route>
        </Switch>
      </Router>
    );
  }

  return (
    <Router>
      <div className='App'>
        <SideBar />
        <Switch>
          <Route exact path='/'>
            <Home />
          </Route>
          <Route path='/products'>
            <Products />
          </Route>
          <Route path='/additem'>
            <AddItemModal />
          </Route>
          <Route path='/user'>
            <User />
          </Route>
          <Route path='/newuser'>
            <NewUser />
          </Route>
        </Switch>
      </div>
      <Footer />
    </Router>
  );
};

export default App;
