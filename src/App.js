import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import SideBar from './components/sidebar/SideBar';
import Home from './pages/home/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/login/Login';
import AddItem from './pages/addItem/AddItem';
import Register from './pages/register/Register';
import Products from './pages/products/Products';
import Footer from './components/footer/Footer';
import EditItem from './pages/editItem/EditItem';
import ScrollToTop from './ScrollToTop';
import EditProfit from './pages/editprofit/EditProfit';
import Users from './pages/users/Users';

const App = () => {
  const [user, setUser] = useState('');

  useEffect(() => {
    let user = localStorage.getItem('user');
    setUser(user);

    // window.open('/', '_self');
    //window.location.reload();
  }, []);

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
      <ScrollToTop /> {/* loads page from the top */}
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
            <AddItem />
          </Route>
          <Route path='/edititem'>
            <EditItem />
          </Route>
          <Route path='/editprofit'>
            <EditProfit />
          </Route>
        </Switch>
      </div>
      <Footer />
    </Router>
  );
};

export default App;
