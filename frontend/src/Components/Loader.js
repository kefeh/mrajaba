import React from 'react'
import '../Stylesheets/Loader.css'

function Loader() {
    return (
        <div>
            
            <div className="loading__frame">
                <img src="../images/loading.png" alt=""/>
                <div className="loader__container">
                    <div className="loader">
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Loader
