import React from 'react';
import './App.css';
import TestPage from './Components/TestPage';
import Search from './Components/Search';
import File from './Components/File';

function App() {
  return (
    <div className="App">
      <TestPage/>
      <Search/>
      <File/>
    </div>
  );
}

export default App;
