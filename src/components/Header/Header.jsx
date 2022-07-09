import React from 'react';
import Logo from './components/Logo';
import Button from '../../common/Button';
import './Header.css';

const Header = (props) => {
  return (
    <div className="header">
      <div className="logo">
        <Logo />
      </div>
      <div className="button">
        <p className="userName">{props.username}</p>
        <Button title="Logout" nameDisplay="userName" />
      </div>
    </div>
  );
};

export default Header;
