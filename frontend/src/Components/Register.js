import React from 'react'
import '../Stylesheets/Assets.css'
import '../Stylesheets/Register.css'
import '../Stylesheets/Auth.css'

function Register() {
    return (
        <div className="register">
            <div className="auth__image">
                <img src="../images/auth.png" alt=""/>
            </div>
            <form action="" className="auth__form">
                <div className="form-item auth__form-name">
                    <label>Name</label>
                    <input type="text"/>
                </div>

                <div className="form-item auth__form-email">
                    <label>Email</label>
                    <input type="text"/>
                </div>
                
                <div className="form-item auth__form-password">
                    <label>Password</label>
                    <input type="password"/>
                </div>

                <div className="form-item auth__form-confirm-password">
                    <label>Confirm Password</label>
                    <input type="password"/>
                </div>
                <div className="checkbox">
                    <input type="checkbox"/>
                    <label>Admin</label>
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

export default Register
