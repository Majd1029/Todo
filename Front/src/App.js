import { useEffect, useRef,useState } from 'react';
import './App.css';
import axios from 'axios'

function App() {
  const [todos, setTodos] = useState([]);
  const inputRef = useRef()

  useEffect(()=>{
    const getAllItems = async () => {
      await axios.get("http://localhost:4000/api/tasks/",{
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((response) => {
        setTodos(response.data)
      }).catch((error) => {
        console.log('Error', error)
      })
    }

    getAllItems()
  }, [todos])

  const handleAddTodo = async () => {
    const text = inputRef.current.value;
    const newItem = { completed: false, text};
    inputRef.current.value = "";
    await axios.post("http://localhost:4000/api/tasks", {
      title:newItem.text,
      completed:newItem.completed
    }).then((response) => {
      console.log('Successfully added ', response.data); // Corrected response variable to response.data
    }).catch((error) => console.log(error));
};


const handleItemDone = async (id, index) => {
  const newTodos = [...todos];
  newTodos[index].completed = !newTodos[index].completed; // Toggle the completed status
  setTodos(newTodos); // Update the state

  try {
    await axios.put(`http://localhost:4000/api/tasks/${id}`, {
      completed: newTodos[index].completed,
    });
    console.log('Item status updated successfully');
  } catch (error) {
    console.log('Error updating item status:', error);
  }
}


  const handleDeleteItem = async (id) => {
    const newTodos = [...todos];
    const index = newTodos.findIndex(todo => todo._id === id); // Find the index of the item with the specified _id
    if (index !== -1) {
      newTodos.splice(index, 1); // Remove the item from the array
      setTodos(newTodos); // Update the state
  
      try {
        await axios.delete(`http://localhost:4000/api/tasks/${id}`); // Delete the item from the backend
        console.log('Item deleted successfully');
      } catch (error) {
        console.log('Error deleting item:', error);
      }
    }
  }
  

  return (
    <div className="App">
      <h2>To Do List</h2>
      <div className="to-do-container">
      <ul>
        {todos.map(({title, completed, _id}, index) => {
          return(
            <div className="item" key={_id}>
              <li className={completed ? "done" : ""} 
              key={index} onClick={() => handleItemDone(_id,index)}>{title}
              </li>
              <span onClick={() => handleDeleteItem(_id)}>❌</span>
            </div>);
      })}
      </ul>
      <input ref={inputRef} placeholder="Enter item.."/>
      <button onClick={handleAddTodo}>Add</button>
    </div>
    </div>
  );
}

export default App;
