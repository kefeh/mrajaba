import React from 'react';
import './App.css';
import MainContent from './Components/MainContent';
import News from './Components/News';
import Register from './Components/Register';
import Notification from './Components/Notification';
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
import AddFile from './Components/AddFile';
import AddNews from './Components/AddNews';

function App() {
  const [{showRegister, showAddFolder, showAddFile, showNotification, showAddNews}] = useStateValue();
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact>
            {
              client.isLoggedIn() ? (
                 typeof(showRegister) === 'undefined' || showRegister === false ?  
            ( <>
              <>
              <News />
              <MainContent />
              {
                (typeof(showNotification) !== 'undefined' && showNotification === true) && <Notification />
              }
              {
                (typeof(showAddFolder) !== 'undefined' && showAddFolder === true) && <AddFolder />
              }
              {
                (typeof(showAddFile) !== 'undefined' && showAddFile === true) && <AddFile/>
              }
              {
                (typeof(showAddNews) !== 'undefined' && showAddNews === true) && <AddNews/>
              }
              </>
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
