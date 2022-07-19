import React, { useState, useEffect } from 'react';
import CourseCard from './components/CourseCard';
import Button from '../../common/Button';
import CreateCourse from '../CreateCourse';
import { getCourseDuration } from '../../helpers/index';
import SearchBar from './components/SearchBar';
import './Courses.css';
import { Link } from 'react-router-dom';

const Courses = (props) => {
  const [searchInput, setSearchInput] = useState('');
  const [courseList, setCourseList] = useState(props.courseList);
  const [showAddCourseScreen, setShowAddCourseScreen] = useState(false);

  const getAuthorName = (authorCodeArray) => {
    const authorsArray = [];
    let authorsArrayCounter = 1;
    authorCodeArray.forEach((authorCode) => {
      if (authorsArrayCounter !== authorCodeArray.length) {
        authorsArray.push(checkAuthorId(authorCode) + ', ');
        authorsArrayCounter++;
      } else {
        authorsArray.push(checkAuthorId(authorCode));
      }
    });
    return authorsArray;
  };

  const checkAuthorId = (authorCode) => {
    let authorName = 'Author ID not found!';
    props.authorsList.forEach((author) => {
      if (author.id === authorCode) {
        return (authorName = author.name);
      }
    });
    return authorName;
  };

  const handleChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleSearchClick = () => {
    const filtered = props.courseList.filter((course) => {
      return searchInput.trim() === '' || searchInput === ''
        ? course
        : course.title.toLowerCase().includes(searchInput.toLowerCase()) ||
            course.id.toLowerCase().includes(searchInput.toLowerCase());
    });

    setCourseList(filtered);
  };

  const addNewCourseHandler = (enteredNewCourseData) => {
    const courseData = {
      ...enteredNewCourseData,
      id: Math.random().toString(),
    };
    if (showAddCourseScreen) {
      props.addCourse(courseData);
    }
    setShowAddCourseScreen(!showAddCourseScreen);
  };

  const addNewAuthorHandler = (enteredNewAuthorData) => {
    const authorData = {
      id: Math.random().toString(),
      ...enteredNewAuthorData,
    };
    props.addAuthor(authorData);
  };

  const displayCourses = () => {
    if (courseList === undefined || !courseList.length) {
      return <p>No courses available</p>;
    } else {
      return courseList.map((course) => (
        <CourseCard
          key={course.id}
          id={course.id}
          title={course.title}
          description={course.description}
          authors={getAuthorName(course.authors)}
          duration={course.duration}
          creationDate={course.creationDate}
        />
      ));
    }
  };

  useEffect(() => {
    setCourseList(props.courseList);
  }, [props.courseList]);

  return (
    <div className="container">
      <div className="row">
        <SearchBar
          type="text"
          name="search"
          placeholder="Enter course name..."
          value={searchInput}
          onChange={handleChange}
          onClick={handleSearchClick}
        />
        <div className="AddCourseButton">
          <Link to={'/courses/add'}>
            <Button title="Add new course" />
          </Link>
        </div>
      </div>
      {displayCourses()}
    </div>
  );
};

export default Courses;
