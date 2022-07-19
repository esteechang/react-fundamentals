import React from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from './components/Logo';
import Button from '../../common/Button';
import './Header.css';

const Header = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const username = localStorage.getItem('name');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="header">
      <div className="logo">
        <Logo />
      </div>
      {token ? (
        <div className="button">
          <p className="userName">{username}</p>
          <Button
            title="Logout"
            nameDisplay="userName"
            onClick={handleLogout}
          />
        </div>
      ) : null}
    </div>
  );
};

export default Header;
