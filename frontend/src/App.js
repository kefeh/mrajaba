import React from 'react';
import './App.css';
import MainContent from './Components/MainContent';
import News from './Components/News';
import Register from './Components/Register';
import { useStateValue } from './Data/StateProvider';

function App() {
  const [{showRegister}] = useStateValue();
  return (
    <div className="App">
      { typeof(showRegister) === 'undefined' || showRegister === false ?  
      ( <>
        <News />
        <MainContent /> 
      </> ):
      <Register/>}
    </div>
  );
}

export default App;
