import React from 'react'
import '../Stylesheets/Folder.css'

function Folder({folder}) {
    return (
        <div className="folder">
            <div className="folder__content">
                <img src="../images/folder.png" alt="folder" />
            </div>
            <div className="folder__title">
            {folder.folder}
            </div>
        </div>
    )
}

export default Folder
