import React, { useState, useEffect } from 'react'
import '../Stylesheets/ContentSection.css'
import FloatingButton from './FloatingButton'
import File from './File'
import Folder from './Folder'

import { useStateValue } from '../Data/StateProvider';


function ContentSection({files, folders, getFiles, getFolders}) {
    const [{active_nav, search_term}] = useStateValue();
    const [a_files, setFiles] = useState([]);
    useEffect(() => {
        if(search_term !== '') {
            var some_files = files.filter(file =>
                file.name.toLowerCase().includes(search_term)
            );
            setFiles(some_files)
            console.log(some_files)
        }else {
            setFiles(files)
            console.log(files)
        }
    }, [search_term])
    return (
        <div className="content-section">
            <div className="content-section__main">
                {search_term === '' && folders.length !== 0 && folders.map((a_folder, index) => (
                    <Folder  key={index} a_folder={a_folder}/>
                ))}
                {a_files.length !== 0 && a_files.map((file, index) => (
                    <File key={index} file={file}/>
                ))}
                {a_files.length === 0 && (folders.length === 0 || search_term !== '') && <div>No files uploaded</div>}
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
