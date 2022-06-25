import React from 'react';
import { Button } from '../../../../common/Button/Button';
import './SearchBar.css';

export const SearchBar = (props) => {
  return (
    <div className="searchbar">
      <input
        type="text"
        placeholder={props.placeholder}
        onChange={(event) => {
          props.setState(event.target.value);
        }}
      />
      <Button title="Search" onClickFunction={props.onClickFunction} />
    </div>
  );
};
