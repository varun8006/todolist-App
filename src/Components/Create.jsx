import React, { useState } from 'react';
import axios from 'axios';
import './Style.css';

const Create = ({ onAdd }) => {
  const [task, setTask] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleAdd = () => {
    if (!task.trim()) {
      setErrorMessage('Please add a task');
      return;
    }

    axios.post('http://localhost:8080/add', { task: task })
      .then(result => {
        onAdd(); // Call the callback function passed from Home
        setTask(''); // Clear input field after adding task
        setErrorMessage(''); // Clear error message
      })
      .catch(err => console.log(err));
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Prevent default form submission behavior
      handleAdd(); // Call handleAdd function to submit the form
    }
  };

  return (
    <div className='inputtask'>
      <input
        type='text'
        placeholder={errorMessage ? errorMessage : "Type task..."}
        value={task}
        onChange={(e) => {
          setTask(e.target.value);
          setErrorMessage(''); // Clear error message when user types
        }}
        onKeyDown={handleKeyDown}
      />
      <button type='submit' onClick={handleAdd}>Add Task</button>
    </div>
  );
};

export default Create;
