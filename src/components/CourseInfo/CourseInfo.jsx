import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getCourseDuration } from '../../helpers';
import { IoIosArrowBack } from 'react-icons/io';
import { mockedCoursesList, mockedAuthorsList } from '../../MockedData';
import './CourseInfo.css';

const CourseInfo = () => {
  const { courseId } = useParams();
  const [courseList, setCourseList] = useState(mockedCoursesList);
  const [authorList, setAuthorList] = useState(mockedAuthorsList);
  const [course, setCourse] = useState({});
  const [authors, setAuthors] = useState([]);

  const getCourse = () => {
    courseList.forEach((course) => {
      if (course.id === courseId) {
        setCourse(course);
      }
    });
  };

  useEffect(() => {
    getCourse();
  }, []);

  const displayAuthorName = () => {
    const authorsArray = [];
    let authorsArrayCounter = 1;
    if (course.authors === undefined) {
      return <p>is Loading</p>;
    } else {
      course.authors.map((authorCode) => {
        if (authorsArrayCounter !== course.authors.length) {
          authorsArray.push(checkAuthorId(authorCode) + ', ');
          authorsArrayCounter++;
        } else {
          authorsArray.push(checkAuthorId(authorCode));
        }
      });
    }
    return (
      <p className="info" style={{ display: 'inline' }}>
        {authorsArray}
      </p>
    );
  };

  const checkAuthorId = (authorCode) => {
    let authorName = 'Author ID not found!';
    authorList.forEach((author) => {
      if (author.id === authorCode) {
        return (authorName = author.name);
      }
    });
    return authorName;
  };

  return (
    <div className="container">
      <Link to={'/courses/'} className="back">
        <IoIosArrowBack /> back to courses
      </Link>
      <h2> {course.title}</h2>
      <div className="courseInfoContainer">
        <div className="left">{course.description}</div>
        <div className="right">
          <div className="infoContainer">
            <p className="label">Duration: </p>
            <p className="info"> {getCourseDuration(course.duration)} </p>
          </div>
          <div className="infoContainer">
            <p className="label">Created: </p>
            <p className="info"> {course.creationDate} </p>
          </div>
          <div className="infoContainer">
            <p className="label">Authors: </p>
            {displayAuthorName()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseInfo;
