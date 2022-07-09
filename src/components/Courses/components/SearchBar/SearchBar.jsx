import React from 'react';
import Button from '../../../../common/Button';
import './SearchBar.css';

const SearchBar = (props) => {
  const { value, name, placeholder, type, onChange, onClick } = props;
  return (
    <div className="searchbar">
      <input
        type={type}
        value={value}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
      />
      <Button title="Search" onClick={onClick} />
    </div>
  );
};

export default SearchBar;
