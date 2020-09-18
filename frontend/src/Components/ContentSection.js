import React, { useState, useEffect } from 'react'
import '../Stylesheets/ContentSection.css'
import FloatingButton from './FloatingButton'
import File from './File'
import Folder from './Folder'

import { useStateValue } from '../Data/StateProvider';


function ContentSection({files, folders}) {
    const [{active_nav}] = useStateValue();

    return (
        <div className="content-section">
            <div className="content-section__main">
                {folders.length !== 0 && folders.map((folder, index) => (
                    <Folder key={index} folder={folder}/>
                ))} 
                {files.length !== 0 && files.map((file, index) => (
                    <File key={index} file={file}/>
                ))}
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
