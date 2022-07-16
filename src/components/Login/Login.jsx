import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom/';
import axios from 'axios';
import Input from '../../common/Input';
import Button from '../../common/Button';
import './Login.css';

const ErrorMessage = () => {
  return (
    <div className="errorMsg">
      Wrong username or password, please try again!
    </div>
  );
};

const Login = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const [loginDetails, setLoginDetails] = useState({
    email: 'admin@mail.com',
    password: '123456',
  });
  const [error, setError] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login();
  };

  const login = async () => {
    await axios
      .post('http://localhost:4000/login', loginDetails)
      .then((response) => {
        localStorage.setItem('token', response.data.result);
        navigate('/courses');
      })
      .catch((error) => setError(true));
  };

  return (
    <div className="container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <Input
          type="email"
          value={loginDetails.email}
          name="email"
          onChange={handleChange}
          placeholder="Enter email"
          label="Email"
        />

        <Input
          type="password"
          value={loginDetails.password}
          name="password"
          onChange={handleChange}
          placeholder="Enter password"
          label="Password"
        />

        <Button title="Login" />

        {error && <ErrorMessage />}
        <div className="footer">
          If you do not have an account, you can{' '}
          <Link to={`/registration`} className="link">
            Register
          </Link>{' '}
          here
        </div>
      </form>
    </div>
  );
};

export default Login;
