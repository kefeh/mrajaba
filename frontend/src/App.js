import React from 'react';
import './App.css';
import TestPage from './Components/TestPage';
import Search from './Components/Search';
import File from './Components/File';
import News from './Components/News';
import MainContent from './Components/MainContent';

function App() {
  return (
    <div className="App">
      <News />
      <MainContent />
    </div>
  );
}

export default App;
