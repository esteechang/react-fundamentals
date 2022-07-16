import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Courses from './components/Courses';
import Login from './components/Login/Login';
import { useState, useEffect } from 'react';
import { mockedCoursesList, mockedAuthorsList } from './MockedData';
import CourseInfo from './components/CourseInfo';
import Registration from './components/Registration/Registration';
import CreateCourse from './components/CreateCourse/';
import CreateCourse1 from './components/CreateCourse/CreateCourse1';

function App() {
  const token = localStorage.getItem('token');
  const [courseList, setCourseList] = useState(mockedCoursesList);
  const [authorsList, setAuthorsList] = useState(mockedAuthorsList);

  useEffect(() => {
    setCourseList(courseList);
  }, [courseList]);

  useEffect(() => {
    setAuthorsList(authorsList);
  }, [authorsList]);

  const addCourseHandler = (newCourse) => {
    setCourseList((prevCourseList) => {
      return [...prevCourseList, newCourse];
    });
  };

  const addAuthorHandler = (newAuthor) => {
    setAuthorsList((prevAuthorList) => {
      return [...prevAuthorList, newAuthor];
    });
    return authorsList;
  };

  return (
    <div className="App">
      <Header username="user" />
      <Routes>
        {token ? (
          <Route path="/" element={<Navigate replace to="/courses" />} />
        ) : (
          <Route path="/" element={<Navigate replace to="/login" />} />
        )}
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/registration" element={<Registration />} />
        <Route
          exact
          path="/courses"
          element={
            <Courses
              courseList={courseList}
              authorsList={authorsList}
              addCourse={addCourseHandler}
              addAuthor={addAuthorHandler}
            />
          }
        />
        <Route exact path="/courses/:courseId" element={<CourseInfo />} />
        <Route exact path="/courses/add" element={<CreateCourse1 />} />
      </Routes>
    </div>
  );
}

export default App;
