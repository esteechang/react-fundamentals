import React from 'react';
<<<<<<< HEAD
import { Button } from '../../../../common/Button/Button';
import { formatDate } from '../../../../helpers';
import './CourseCard.css';

export const CourseCard = (props) => {
=======
import Button from '../../../../common/Button';
import { formatDate } from '../../../../helpers';
import './CourseCard.css';

const CourseCard = (props) => {
>>>>>>> week1
  const { title, description, authors, duration, creationDate } = props;
  return (
    <div className="CourseCardContainer">
      <div className="LeftContainer">
        <h1 className="Title">{title}</h1>
        <p className="Description">{description}</p>
      </div>
      <div className="RightContainer">
        <div className="RightContents">
          <div className="RightSegments" style={{ whiteSpace: 'nowrap' }}>
            <h4 className="alternateTitle">Authors: </h4>
            <p style={{ textOverflow: 'ellipsis', overflow: 'hidden' }}>
              {authors}
            </p>
          </div>
          <div className="RightSegments">
            <h4 className="alternateTitle">Duration: </h4>
            <p>{duration}</p>
          </div>
          <div className="RightSegments">
            <h4 className="alternateTitle">Created: </h4>
            <p>{formatDate(creationDate)}</p>
          </div>
        </div>
        <div className="ButtonContainer">
          <Button title="Show Course" />
        </div>
      </div>
    </div>
  );
};
<<<<<<< HEAD
=======

export default CourseCard;
>>>>>>> week1
