import React, { useEffect, useState } from 'react';
import Create from './Create';
import './Style.css';
import axios from 'axios';
import { RiCheckboxBlankCircleLine } from 'react-icons/ri';
import { MdOutlineDeleteOutline } from 'react-icons/md';
import { FaCircleCheck } from 'react-icons/fa6';

const Home = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get('http://localhost:8080/get');
      setTodos(response.data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  const handleEdit = (id) => {
    axios.put('http://localhost:8080/update/' + id)
      .then(result => {
        setTodos(prevTodos => prevTodos.map(todo => {
          if (todo._id === id) {
            return { ...todo, done: !todo.done };
          }
          return todo;
        }));
      })
      .catch(err => console.log(err));
  };

  const handleDelete = (id) => {
    axios.delete('http://localhost:8080/delete/' + id)
      .then(result => {
        setTodos(prevTodos => prevTodos.filter(todo => todo._id !== id));
      })
      .catch(err => console.log(err));
  };

  return (
    <div className='container'>
      <h2>Todo List</h2>
      <Create onAdd={fetchTodos} /> {/* Pass fetchTodos function as a prop */}
      {
        todos.length === 0
          ? <div><h3>No Record</h3></div>
          : todos.map(todo => (
            <div className='task' key={todo._id}>
              <div className='checkbox' onClick={() => handleEdit(todo._id)}>
                {todo.done
                  ? <FaCircleCheck className='icon' size={40} />
                  : <RiCheckboxBlankCircleLine className='icon' size={40} />
                }
                <p className={todo.done ? 'line_through' : ""}>{todo.task}</p>
              </div>
              <div>
                <span ><MdOutlineDeleteOutline className='icon_delete' size={40} onClick={() => handleDelete(todo._id)} /></span>
              </div>
            </div>
          ))
      }
    </div>
  );
};

export default Home;
