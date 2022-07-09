import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Button from '../../common/Button';
import { getCourseDuration } from '../../helpers/index';
import './CreateCourse.css';

const CreateCourse = (props) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [timeDuration, setTimeDuration] = useState(0);
  const [courseAuthorList, setCourseAuthorList] = useState(
    props.authorsList.map((data) => data.id)
  );
  const [selectedAuthorList, setSelectedAuthorList] = useState([]);
  const [newAuthorName, setNewAuthorName] = useState('');

  const titleChangeHandler = (event) => {
    setTitle(event.target.value);
  };

  const descriptionChangeHandler = (event) => {
    setDescription(event.target.value);
  };

  const durationChangeHandler = (event) => {
    setTimeDuration(event.target.value);
  };

  const newAuthorHandler = (event) => {
    setNewAuthorName(event.target.value);
  };

  const addNewAuthorHandler = (event) => {
    event.preventDefault();
    if (newAuthorName === '' || newAuthorName.trim().length < 2) {
      return;
    } else {
      const newAuthor = {
        name: newAuthorName,
      };
      props.addNewAuthorHandler(newAuthor);
    }
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

  const addCourseAuthorHandler = (event) => {
    event.preventDefault();
    setSelectedAuthorList((prevSelectedAuthorList) => {
      return [...prevSelectedAuthorList, event.target.value];
    });
    setCourseAuthorList(
      courseAuthorList.filter((data) => data !== event.target.value)
    );
  };

  const removeCourseAuthorHandler = (event) => {
    event.preventDefault();
    setCourseAuthorList((prevCourseAuthorList) => {
      return [...prevCourseAuthorList, event.target.value];
    });
    setSelectedAuthorList(
      selectedAuthorList.filter((data) => data !== event.target.value)
    );
  };

  const displayAuthorsList = (authorList) => {
    return authorList.map((data) => {
      return (
        <div className="AddAuthorSegment">
          <div className="AuthorName">
            <p>{checkAuthorId(data)}</p>
          </div>
          <div className="AuthorButton">
            <Button
              onClick={addCourseAuthorHandler}
              title="Add Author"
              className="AuthorButton"
              value={data}
            />
          </div>
        </div>
      );
    });
  };

  const displaySelectedAuthorsList = (selectedAuthorArray) => {
    if (selectedAuthorArray.length === 0) {
      return (
        <div className="EmptyCourseAuthorSegment">
          <p>Author List is Empty</p>
        </div>
      );
    } else {
      return selectedAuthorArray.map((data) => {
        return (
          <div className="AddAuthorSegment">
            <div className="AuthorName">
              <p>{checkAuthorId(data)}</p>
            </div>
            <div className="AuthorButton">
              <Button
                onClick={removeCourseAuthorHandler}
                title="Remove Author"
                className="AuthorButton"
                value={data}
              />
            </div>
          </div>
        );
      });
    }
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (
      title === '' ||
      description === '' ||
      timeDuration === 0 ||
      selectedAuthorList.length === 0
    ) {
      alert('Please fill in all fields!');
    } else {
      const today = new Date();
      const date =
        today.getDate() +
        '/' +
        parseInt(today.getMonth() + 1) +
        '/' +
        today.getFullYear();
      const newCourse = {
        id: uuidv4(),
        title: title,
        description: description,
        creationDate: date,
        duration: timeDuration,
        authors: selectedAuthorList,
      };
      props.addNewCourseHandler(newCourse);
    }
  };

  useEffect(() => {
    setCourseAuthorList(props.authorsList.map((data) => data.id));
  }, [props.authorsList]);

  return (
    <div className="Create">
      <form onSubmit={submitHandler}>
        <div className="TopSegmentTitleAndButton">
          <div>
            <h4>Title:</h4>
            <input
              placeholder="Enter Title..."
              className="CreateCourseTitle"
              onChange={titleChangeHandler}
            />
          </div>
          <div className="CreateCourseButton">
            <Button title="Create Course" type="submit" />
          </div>
        </div>
        <div className="Description">
          <h4>Description:</h4>
          <textarea
            placeholder="Enter Description..."
            className="CreateCourseDescription"
            onChange={descriptionChangeHandler}
          />
        </div>
        <div className="BottomSegment">
          <div className="BottomSegmentLeft">
            <div className="AddAuthor">
              <h2>Add Authors</h2>
              <h4>Author name</h4>
              <input
                type="text"
                placeholder="Enter Author Name"
                className="CreateCourseAddAuthor"
                onChange={newAuthorHandler}
              />
              <Button title="Create Author" onClick={addNewAuthorHandler} />
            </div>
            <div className="Duration">
              <h2>Duration</h2>
              <h4>Duration</h4>
              <input
                type="number"
                placeholder="Enter duration in minutes..."
                onChange={durationChangeHandler}
                min="0"
                className="CreateCourseDuration"
              />
              <div className="DurationDisplay">
                <p>Duration :</p>
                <h3>{getCourseDuration(timeDuration)}</h3>
              </div>
            </div>
          </div>
          <div className="BottomSegmentRight">
            <div className="CourseAuthorsSegment">
              <h2>Authors</h2>
              {displayAuthorsList(courseAuthorList)}
            </div>
            <div className="CourseAuthorsSegment">
              <h2>Course Authors</h2>
              {displaySelectedAuthorsList(selectedAuthorList)}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateCourse;
