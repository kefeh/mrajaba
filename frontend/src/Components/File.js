import React from 'react'
import '../Stylesheets/Assets.css'
import '../Stylesheets/File.css'
import GetAppIcon from '@material-ui/icons/GetApp';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';

function File() {
    return (
        <div className="file">
            <div className="file__delete-buttone">
                <DeleteOutlineIcon />
            </div>
            <div className="file__content">
                <img src="../images/file.png" alt="file thumbnail"/>
                <div className="btn btn__icon-btn btn__text-icon-btn">
                    <GetAppIcon className="icon"/>
                    <span>Download</span>
                </div>
            </div>
            <div className="file__title">
            The gem might not be able to compile, to solve this you might need to
            </div>
        </div>
    )
}

export default File
