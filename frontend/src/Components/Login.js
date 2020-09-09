import React, { useState } from 'react'
import $ from 'jquery';
import '../Stylesheets/Assets.css'
import '../Stylesheets/Login.css'
import '../Stylesheets/Auth.css'
import { useStateValue } from '../Data/StateProvider'
import Loader from './Loader';

import { Redirect } from 'react-router-dom';

function Login() {
    const [{}, dispatch] = useStateValue();

    // creating the states
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [isloading, setIsloading] = useState(false);
    const [shouldRedirect, setShouldRedirect] = useState(false);

    const addUser = (user) => {
        dispatch({
            type: 'ADD_USER',
            item: user
        })
    }

    const login = () => {
        setIsloading(true)
        $.ajax({
          url: `/login`, 
          type: "POST",
          dataType: 'json',
          contentType: 'application/json',
          data: JSON.stringify({
            email: email,
            password: password,
          }),
          success: (result) => {
            addUser(result.user)
            setShouldRedirect(true)
            return;
          },
          error: (error) => {
            console.log(error)
            alert(error.responseJSON.error)
            setIsloading(false)
            return;
          }
        })
      }

    const  handleEmailChange = (event) => {
        setEmail(event.target.value)
      }

    const  handlePasswordChange = (event) => {
        setPassword(event.target.value)
      }
    if(shouldRedirect){
       return (<Redirect to='/'/>) 
    }
    if(isloading) {
      return (
        <Loader/>
      )
    }
    else  {
        return (
            <div className="login">
                <div className="auth__image">
                    <img src="../images/auth.png" alt=""/>
                </div>
                <form action="" className="auth__form">
                    <div className="form-item auth__form-email">
                        <label>Email</label>
                        <input type="text" name="email" onChange={handleEmailChange}/>
                    </div>
                    
                    <div className="form-item auth__form-password">
                        <label>Password</label>
                        <input type="password" name="password" onChange={handlePasswordChange}/>
                    </div>
                    <div className="auth__buttons">
                        <div className='btn btn__outline'>
                            <span>Cancel</span>
                        </div>
                        <div onClick={login} className='btn btn__primary'>
                            <span>save</span>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

export default Login
