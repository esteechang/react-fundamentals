import './App.css';
<<<<<<< HEAD
import { Header } from './components/Header/Header';
import { Courses } from './components/Courses/Courses';
=======
import Header from './components/Header';
import Courses from './components/Courses';
>>>>>>> week1
import { useState, useEffect } from 'react';
import { mockedCoursesList, mockedAuthorsList } from './MockedData';

function App() {
  const [courseList, setCourseList] = useState(mockedCoursesList);
  const [authorsList, setAuthorsList] = useState(mockedAuthorsList);

  useEffect(() => {
<<<<<<< HEAD
    return setCourseList(courseList);
=======
    setCourseList(courseList);
>>>>>>> week1
  }, [courseList]);

  useEffect(() => {
    setAuthorsList(authorsList);
  }, [authorsList]);

  const addCourseHandler = (newCourse) => {
    setCourseList((prevCourseList) => {
      return [...prevCourseList, newCourse];
    });
<<<<<<< HEAD
    console.log(courseList);
=======
>>>>>>> week1
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
      <div>
        <Courses
          courseList={courseList}
          authorsList={authorsList}
          addCourse={addCourseHandler}
          addAuthor={addAuthorHandler}
        />
      </div>
    </div>
  );
}

export default App;
