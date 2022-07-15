import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../../common/Input';
import Button from '../../common/Button';
import axios from 'axios';
import './Registration.css';

const ErrorMessage = ({ email, none }) => {
  let msg = '';
  if (email) {
    msg = 'Registration failed. Please try again with a different email.';
  } else if (none) {
    msg = 'Successfully registered! Redirecting you to login now...';
  } else {
    msg =
      'Password should be a string and length should be 6 characters minimum';
  }
  return <div className={none ? 'successMsg' : 'errorMsg'}>{msg}</div>;
};

const Registration = () => {
  const navigate = useNavigate();
  const [registrationDetails, setRegistrationDetails] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegistrationDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    postRegistrationDetails();
  };

  const postRegistrationDetails = async () => {
    await axios
      .post('http://localhost:4000/register', registrationDetails)
      .then((response) => {
        console.log(response);
        if (response.data.successful === true) {
          setError('none');
          setTimeout(() => {
            navigate('/login');
          }, 2000);
        }
      })
      .catch((error) => {
        if (
          error.response.data.successful === false &&
          error.response.data.errors.toString().includes('email')
        ) {
          setError('email');
        } else {
          setError('password');
        }
      });
  };

  return (
    <div className="container">
      <h2>Registration</h2>
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          value={registrationDetails.name}
          name="name"
          onChange={handleChange}
          placeholder="Enter name"
          label="Name"
          required
        />
        <Input
          type="email"
          value={registrationDetails.email}
          name="email"
          onChange={handleChange}
          placeholder="Enter email"
          label="Email"
          required
        />
        <Input
          type="password"
          value={registrationDetails.password}
          name="password"
          onChange={handleChange}
          placeholder="Enter password"
          label="Password"
          required
        />
        <Button title="Register" />
      </form>

      {error === 'email' && <ErrorMessage email />}
      {error === 'password' && <ErrorMessage />}
      {error === 'none' && <ErrorMessage none />}

      <div className="footer">
        If you have an account, you can{' '}
        <Link to={`/login`} className="link">
          Login
        </Link>{' '}
        here
      </div>
    </div>
  );
};

export default Registration;
