import './App.css';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Courses from './components/Courses';
import { useState, useEffect } from 'react';
import { mockedCoursesList, mockedAuthorsList } from './MockedData';
import CourseInfo from './components/CourseInfo';

function App() {
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
        {/* <Route exact path="/login" component={Login} /> */}
        {/* <Route exact path="/registration" component={Registration} /> */}
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
        {/* <Route exact path="/courses/add" component={CreateCourse} /> */}
        <Route exact path="/courses/:courseId" element={<CourseInfo />} />
        {/* <PrivateRoute
          exact
          path="/courses/update/:courseId"
          component={UpdateCourse}
        /> */}
      </Routes>
    </div>
  );
}

export default App;
