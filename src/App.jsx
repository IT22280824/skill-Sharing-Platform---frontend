import { useState, useEffect } from 'react'
import './App.css'
import api from './api/axiosConfig.jsx';
import Post from './components/post/post.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';


import PostList from './components/post/PostList.jsx';

function App() {
  

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
        <Route path="/posts" element={<PostList />} />
        </Routes>
      </BrowserRouter>
      
      
    </div>
  )
}

export default App
