import React from 'react'
import '../Stylesheets/Assets.css'
import '../Stylesheets/Login.css'
import '../Stylesheets/Auth.css'

function Login() {
    return (
        <div className="login">
            <div className="auth__image">
                <img src="../images/auth.png" alt=""/>
            </div>
            <form action="" className="auth__form">
                <div className="form-item auth__form-email">
                    <label>Email</label>
                    <input type="text"/>
                </div>
                
                <div className="form-item auth__form-password">
                    <label>Password</label>
                    <input type="password"/>
                </div>
                <div className="auth__buttons">
                    <div className='btn btn__outline'>
                        <span>Cancel</span>
                    </div>
                    <div className='btn btn__primary'>
                        <span>save</span>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Login
