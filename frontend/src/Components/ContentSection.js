import React, { useState, useEffect } from 'react'
import '../Stylesheets/ContentSection.css'
import FloatingButton from './FloatingButton'
import File from './File'
import Folder from './Folder'

import { useStateValue } from '../Data/StateProvider';


function ContentSection({files, folders, getFiles, getFolders}) {
    const [{active_nav}] = useStateValue();

    return (
        <div className="content-section">
            <div className="content-section__main">
                {folders.length !== 0 && folders.map((a_folder, index) => (
                    <Folder  key={index} a_folder={a_folder}/>
                ))}
                {files.length !== 0 && files.map((file, index) => (
                    <File key={index} file={file}/>
                ))}
                {files.length === 0 && folders.length === 0 && <div>No files uploaded</div>}
            </div>
            {active_nav!== "Recently" && (
            <div className="content-section__floating-button">
                <FloatingButton />
            </div>
            )}
        </div>
    )
}

export default ContentSection
