import React, {useState} from 'react';
import './App.css';
import ModalAddTask from "./components/UI/ModalAddTask/ModalAddTask";
import ListTasks from "./components/ListTasks/ListTasks";

function App() {
  return (
    <div className="App">
        <ListTasks></ListTasks>
    </div>
  );
}

export default App;
