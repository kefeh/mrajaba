import React from 'react'
import '../Stylesheets/FloatingButton.css';
import AddIcon from '@material-ui/icons/Add';

function FloatingButton() {
    return (
        <div className="floating-action" >
            <div className="floating-action__side" >
                <div className='btn btn__outline'>
                    <span>Folder</span>
                </div>
                <div className='btn btn__outline'>
                    <span>Document</span>
                </div>
                <div className='btn btn__outline'>
                    <span>Video</span>
                </div>
                <div className='btn btn__outline'>
                    <span>Image</span>
                </div>
            </div>
            <div className="btn__primary btn__floating-icon-btn ">
                <AddIcon className="icon"/>
            </div>
        </div>
    )
}

export default FloatingButton
