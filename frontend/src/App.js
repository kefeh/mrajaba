import React from 'react';
import './App.css';
import TestPage from './Components/TestPage';
import Search from './Components/Search';
import File from './Components/File';
import FloatingButton from './Components/FloatingButton';
import Folder from './Components/Folder';

function App() {
  return (
    <div className="App">
      <TestPage/>
      <Search/>
      <File/>
      <FloatingButton/>
      <Folder/>
    </div>
  );
}

export default App;
