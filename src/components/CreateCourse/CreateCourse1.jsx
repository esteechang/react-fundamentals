import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate, Link } from 'react-router-dom';
import { mockedAuthorsList, mockedCoursesList } from '../../MockedData';
import Button from '../../common/Button';
import Input from '../../common/Input';
import './CreateCourse.css';
import { getCourseDuration } from '../../helpers';

const CreateCourse = (props) => {
  const today = new Date();

  const date =
    today.getDate() +
    '/' +
    parseInt(today.getMonth() + 1) +
    '/' +
    today.getFullYear();

  const [courseInfo, setCourseInfo] = useState({
    id: uuidv4(),
    title: '',
    description: '',
    creationDate: date,
    duration: '',
    authors: [],
  });
  const [authorInfo, setAuthorInfo] = useState({ id: '', name: '' });

  const authorsNameArray = mockedAuthorsList.map((author) => author.name);
  const [authorsNameList, setAuthorsNameList] = useState(authorsNameArray);

  const [selectedAuthors, setSelectedAuthors] = useState([]);
  const [newAuthorsList, setNewAuthorsList] = useState(mockedAuthorsList);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourseInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAuthorInput = (e) => {
    setAuthorInfo((prev) => ({
      ...prev,
      id: uuidv4(),
      name: e.target.value,
    }));
  };

  const handleCreateAuthorButton = (author) => {
    setAuthorsNameList([...authorsNameList, author]);
    newAuthorsList.push(authorInfo);
  };

  const handleAddAuthorClick = (author) => {
    const remainingAuthors = newAuthorsList.filter((a) => a.id !== author.id);

    setNewAuthorsList(remainingAuthors);
    selectedAuthors.push(author);

    const selectedAuthorsId = selectedAuthors.map((author) => author.id);
    setCourseInfo({ ...courseInfo, authors: selectedAuthorsId });
  };

  const handleDeleteAuthorClick = (author) => {
    const newSelectedAuthorList = selectedAuthors.filter(
      (a) => a.id !== author.id
    );
    setSelectedAuthors(newSelectedAuthorList);
    newAuthorsList.push(author);

    const selectedAuthorsId = newSelectedAuthorList.map((author) => author.id);
    setCourseInfo({ ...courseInfo, authors: selectedAuthorsId });
  };

  const handleCreateCourseButton = () => {
    setCourseInfo({
      ...courseInfo,
      title: courseInfo.title,
      description: courseInfo.description,
      duration: courseInfo.duration,
    });

    mockedCoursesList.push(courseInfo);
  };

  const CreateCourseButton = () => {
    if (
      !courseInfo.authors.length ||
      courseInfo.description.length < 2 ||
      courseInfo.duration < 1 ||
      courseInfo.title.length < 2
    ) {
      return <Button title="Create course" error />;
    } else {
      return (
        <Link to={'/courses'}>
          <Button title="Create course" onClick={handleCreateCourseButton} />
        </Link>
      );
    }
  };

  return (
    <div className="container">
      <div className="firstRow">
        <div className="titleContainer">
          <Input
            type="text"
            value={courseInfo.title}
            name="title"
            onChange={handleChange}
            placeholder="Enter title..."
            label="Title"
          />
        </div>
        <div className="buttonContainer">
          <CreateCourseButton />
        </div>
      </div>
      <p className="label"> Description</p>
      <textarea
        className="textarea"
        type="text"
        value={courseInfo.description}
        name="description"
        onChange={handleChange}
        placeholder="Enter description..."
      />
      <div className="authorInfoContainer">
        <div className="leftRightContainer">
          <p className="authorLabel">Add author</p>
          <Input
            type="text"
            value={authorInfo.name}
            name="name"
            onChange={handleAuthorInput}
            placeholder="Enter author name..."
            label="Author name"
          />
          <Button
            title="Create author"
            onClick={() => handleCreateAuthorButton(authorInfo.name)}
          />
          <div style={{ padding: 20 }}></div>
          <Input
            type="number"
            value={courseInfo.duration}
            name="duration"
            onChange={handleChange}
            placeholder="Enter duration in minutes..."
            label="Duration"
          />
          <div>
            Duration:
            <p style={{ display: 'inline', fontWeight: 'bold' }}>
              {' '}
              {getCourseDuration(courseInfo.duration)}
            </p>
          </div>
        </div>

        <div className="leftRightContainer">
          <p className="authorLabel">Authors</p>
          {newAuthorsList.map((author) => (
            <div className="authorsContainer" key={author.id}>
              <p className="authorName"> {author.name}</p>
              <Button
                title="Add author"
                onClick={() => handleAddAuthorClick(author)}
              />
            </div>
          ))}

          <p className="authorLabel">Course authors</p>

          {selectedAuthors.length > 0
            ? selectedAuthors.map((author) => (
                <div className="authorsContainer" key={author.id}>
                  <p className="authorName">{author.name}</p>
                  <Button
                    title="Delete author"
                    onClick={() => handleDeleteAuthorClick(author)}
                  />
                </div>
              ))
            : 'Author list is empty'}
        </div>
      </div>
    </div>
  );
};

export default CreateCourse;
