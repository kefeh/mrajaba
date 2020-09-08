import React from 'react';
import './App.css';
import MainContent from './Components/MainContent';
import News from './Components/News';
import Register from './Components/Register';
import Login from './Components/Login';
import { useStateValue } from './Data/StateProvider';


import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'

function App() {
  const [{showRegister}] = useStateValue();
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact>
            { typeof(showRegister) === 'undefined' || showRegister === false ?  
            ( <>
              <News />
              <MainContent /> 
            </> ):
            <Register/>}
          </Route>
          <Route path="/login" component={Login} />
          {/* <Route path="/logout" component={Logout} /> */}
        </Switch>
      </Router>
    </div>
  );
}

export default App;
