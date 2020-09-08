import React, { useState } from 'react'
import $ from 'jquery';
import '../Stylesheets/Assets.css'
import '../Stylesheets/Register.css'
import '../Stylesheets/Auth.css'
import { useStateValue } from '../Data/StateProvider'
import Loader from './Loader';

function Register() {
    const [{}, dispatch] = useStateValue();

    // creating the states
    const [name, setName] = useState(null);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [admin, setAdmin] = useState(null);
    const [confirm_password, setConfirmPassword] = useState(null);
    const [match_password, setMatchPassword] = useState(true);
    const [isloading, setIsloading] = useState(false);

    const toggleShowRegister = () => {
        dispatch({
            type: 'HIDE_REGISTER',
            item: false
        })
    }

    const addUser = (user) => {
        dispatch({
            type: 'ADD_USER',
            item: user
        })
    }

    const register = () => {
        if(password !== confirm_password){
          setMatchPassword(false)
          return;
        }
        setIsloading(true)
        $.ajax({
          url: `/register`, //TODO: update request URL
          type: "POST",
          dataType: 'json',
          contentType: 'application/json',
          data: JSON.stringify({
            name: name,
            email: email,
            password: password,
            admin: admin,
          }),
          success: (result) => {
            console.log(result.user);
            alert("success");
            // addUser(result.user)
            setIsloading(false)
            toggleShowRegister();
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

    const  handleNameChange = (event) => {
        setName(event.target.value)
      }

    const  handleEmailChange = (event) => {
        setEmail(event.target.value)
      }

    const  handlePasswordChange = (event) => {
        setPassword(event.target.value)
      }

    const  handleConfirmPasswordChange = (event) => {
        setMatchPassword(true)
        setConfirmPassword(event.target.value)
      }
    
    const  handleAdminChange = (event) => {
        setAdmin(event.target.value)
      }

    if(isloading) {
      return (
        <Loader/>
      )
    }
    else {
      return (
        <div className="register">
          
            <div className="auth__image">
                <img src="../images/auth.png" alt=""/>
            </div>
            <form action="" className="auth__form">
                <div className="form-item auth__form-name">
                    <label>Name</label>
                    <input type="text" name="name" onChange={handleNameChange}/>
                </div>

                <div className="form-item auth__form-email">
                    <label>Email</label>
                    <input type="text" name="email" onChange={handleEmailChange}/>
                </div>
                
                <div className="form-item auth__form-password">
                    <label>Password</label>
                    <input type="password" name="password" onChange={handlePasswordChange}/>
                </div>

                <div className="form-item auth__form-confirm-password">
                    <label>Confirm Password  
                      {!match_password?<strong style={{color: "red"}}> Password doesnt match</strong>:<></>}
                    </label>
                    <input type="password" name="password_confirm" onChange={handleConfirmPasswordChange}/>
                </div>
                <div className="checkbox">
                    <input type="checkbox" name="admin" onChange={handleAdminChange}/>
                    <label>Admin</label>
                </div>

                <div className="auth__buttons">
                    <div onClick={toggleShowRegister} className='btn btn__outline'>
                        <span>Cancel</span>
                    </div>
                    <div onClick={register} className='btn btn__primary'>
                        <span>save</span>
                    </div>
                </div>
            </form>
        </div>
    )
    }
    
}

export default Register
