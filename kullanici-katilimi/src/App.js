import logo from './logo.svg';
import './App.css';
import Form from './Form.js';
import { useEffect, useState } from 'react';

function App() {
  const [users, setUsers] = useState([]);

  const addNewUser = (user) => {
    setUsers([...users, user]);
  };

  useEffect (() => {
    console.log("users: ", users);
  }, [users]);

  return (
    <div className="App">
     <Form addNewUser={addNewUser} />
     <hr />
     <pre>{JSON.stringify(users)}</pre>
    </div>
  );
}

export default App;
