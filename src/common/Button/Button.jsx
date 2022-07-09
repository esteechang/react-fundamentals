import React from 'react';
import './Button.css';

const Button = (props) => {
  return (
    <div>
      <button onClick={props.onClick} value={props.value} type={props.type}>
        {props.title}
      </button>
    </div>
  );
};

export default Button;
