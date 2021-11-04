import React, { useState } from 'react';
import axios from 'axios';
import './login.css';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { ErrorAlert } from '../../components/alert/Alert';

const Login = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorText, setErrorText] = useState('');

  //hide error message after 5s
  if (errorText) {
    setTimeout(() => {
      setErrorText('');
    }, 4500);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    //form validation
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!password || !email === '') {
      setErrorText('Please enter all input fields');
      return false;
    } else if (password.length < 1) {
      setErrorText('Incorrect email or password');
      return false;
    } else if (!email.match(re)) {
      setErrorText('Incorrect email or password');
      return false;
    }

    axios
      .post('https://sales-dashboard-server.herokuapp.com/user/login', {
        email: email,
        password: password,
      })
      .then((res) => {
        const userInfo = res.data;
        const token = userInfo.token;
        const user = userInfo.user.name;
        // const authData = { token, user };
        props.LoggedIn({ token, user });
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
        if (password.length > 1 && email.length > 1) {
          setErrorText('Incorrect email or password');
        }
      });
  };

  const handleRegister = () => {
    window.open('/register', '_self');
  };

  return (
    <Router>
      <div className='formContainer'>
        {errorText && <ErrorAlert text={errorText} />}
        <form className='form'>
          <h3>Pro Team</h3>
          <div className='formGroup'>
            <label htmlFor='email'>Email</label>
            <input
              id='email'
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className='formGroup'>
            <label htmlFor='password'>Password</label>
            <input
              id='password'
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className='formBtns'>
            <input
              type='submit'
              value='Login'
              onClick={handleSubmit}
              className='formInputBtn'
            />
            <Link to='/register'>
              <button className='registerBtn' onClick={handleRegister}>
                Register
              </button>
            </Link>
          </div>
        </form>
      </div>
    </Router>
  );
};

Login.propTypes = {
  user: PropTypes.shape({
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
  }),
  LoggedIn: PropTypes.string.isRequired,
};

export default Login;
