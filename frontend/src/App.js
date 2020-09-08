import React from 'react';
import './App.css';
import MainContent from './Components/MainContent';
import News from './Components/News';
import Register from './Components/Register';
import Login from './Components/Login';
import { useStateValue } from './Data/StateProvider';
import { Redirect } from 'react-router-dom';

import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'
import client from './services/Client';

function App() {
  const [{showRegister, user}] = useStateValue();
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact>
            {
              client.isLoggedIn() ? (
                 typeof(showRegister) === 'undefined' || showRegister === false ?  
            ( <>
              <News />
              <MainContent /> 
            </> ):
            <Register/>
                ) : (
                <Redirect to='/login'/>
            )
            }
            
          </Route>
          <Route path="/login" component={Login} />
          {/* <Route path="/logout" component={Logout} /> */}
        </Switch>
      </Router>
    </div>
  );
}

export default App;
