import React from 'react';
<<<<<<< HEAD
import { Logo } from './components/Logo/Logo';
import { Button } from '../../common/Button/Button';
import './Header.css';

export const Header = (props) => {
=======
import Logo from './components/Logo';
import Button from '../../common/Button';
import './Header.css';

const Header = (props) => {
>>>>>>> week1
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
<<<<<<< HEAD
=======

export default Header;
>>>>>>> week1
