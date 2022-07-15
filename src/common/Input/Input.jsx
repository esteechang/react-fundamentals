import React from 'react';
import './Input.css';

const Input = ({
  value,
  name,
  placeholder,
  type,
  onChange,
  label,
  required,
}) => {
  return (
    <>
      {label ? <p className="label">{label}</p> : ''}

      <input
        type={type}
        value={value}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        className="input"
        required={required}
      />
    </>
  );
};

export default Input;
