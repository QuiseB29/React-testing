import { Routes, Route } from 'react-router-dom';
import React from 'react';;
import 'bootstrap/dist/css/bootstrap.min.css'
import PostForm from './PostForm';



const  App = () => {
  return (
    <div>
      <h1>JSONPlaceholder Post Manager</h1>
      <PostForm />

    </div>
  );
};

export default App;
