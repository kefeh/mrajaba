import React from 'react';
import './App.css';
import Register from './Components/Register';
import Login from './Components/Login';
import News from './Components/News';
import MainContent from './Components/MainContent';

function App() {
  return (
    <div className="App">
      {/* <News />
      <MainContent /> */}
      <Register/>
      {/* <Login /> */}
    </div>
  );
}

export default App;
