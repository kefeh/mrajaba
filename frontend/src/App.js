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
import AddFolder from './Components/AddFolder';

function App() {
  const [{showRegister, showAddFolder, user}] = useStateValue();
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
              {
                (typeof(showAddFolder) !== 'undefined' && showAddFolder === true) && <AddFolder />
              }
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
