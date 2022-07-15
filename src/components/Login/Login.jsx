import React, { useState } from 'react';
import { Link } from 'react-router-dom/';
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

const RequiredFieldMessage = () => {
  return <div className="requiredField">This field is required!</div>;
};

const Login = () => {
  const [loginDetails, setLoginDetails] = useState({
    email: '',
    password: '',
  });
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(loginDetails);
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
