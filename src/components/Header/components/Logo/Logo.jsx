import React from 'react';
import CourseLogo from './courseLogo.png';
import './Logo.css';

const Logo = () => {
  return (
    <div className="logo">
      <img src={CourseLogo} alt="courseLogo" />
    </div>
  );
};
export default Logo;
