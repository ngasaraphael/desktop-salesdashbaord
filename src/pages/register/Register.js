import React, { useState } from 'react';
import './register.css';
import axios from 'axios';
import { ErrorAlert } from '../../components/alert/Alert';
import { Link } from 'react-router-dom';

const Register = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
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

    if (name === '' || password === '' || email === '') {
      setErrorText('Please enter all input fields');
      return false;
    } else if (password.length < 6) {
      setErrorText('Password must consist of atleast 6 characters');
      return false;
    } else if (!email.match(re)) {
      setErrorText('Incorrect email or password');
      return false;
    }

    axios
      .post('https://salesdashboard-server.herokuapp.com/user/register', {
        name: name,
        email: email,
        password: password,
      })
      .then((response) => {
        const data = response.data;
        console.log(data);
        window.open('/', '_self');
        alert('User has been registered. Login into Pro team');
        // the second argument '_self' is necessary so that the page will open in the current tab
      })
      .catch((e) => {
        console.log('Registration error');
        if (
          password.length > 1 &&
          email.length > 1 &&
          name.length > 1 &&
          email.match(re)
        ) {
          setErrorText('User already exist. Please go back to Login');
        }
      });
  };

  const handleLogin = () => {
    window.open('/', '_self');
  };

  return (
    <div>
      <div className='formContainer'>
        {errorText && <ErrorAlert text={errorText} />}
        <form className='form'>
          <h3>Pro Team</h3>
          <div className='formGroup'>
            <label htmlFor='name'>User name</label>
            <input
              id='name'
              type='name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
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
              onChange={(e) => setPassword(e.target.value)} // reject paste in input field
            />
          </div>
          <div className='formBtns'>
            <input
              type='submit'
              value='Register'
              onClick={handleSubmit}
              className='formInputBtn'
            />
          </div>
          <Link to='/register'>
            <button className='loginBtn' onClick={handleLogin}>
              Login
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Register;
