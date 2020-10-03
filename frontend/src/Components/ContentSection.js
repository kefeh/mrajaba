import React, { useState, useEffect } from 'react'
import '../Stylesheets/ContentSection.css'
import FloatingButton from './FloatingButton'
import File from './File'
import Folder from './Folder'

import { useStateValue } from '../Data/StateProvider';
import { useAsyncReference } from './AsyncReference';


function ContentSection({files, folders, getFiles, getFolders}) {
    const asyncFiles = useAsyncReference(files, true);
    const asyncFolders = useAsyncReference(folders, true);
    const [{active_nav, search_term}] = useStateValue();
    const [a_files, setFiles] = useState([]);
    useEffect(() => {
        console.log(asyncFiles.current)
        if(search_term !== '') {
            var some_files = asyncFiles.current.filter(file =>
                file.name.toLowerCase().includes(search_term)
            );
            setFiles(some_files)
            console.log(some_files)
        }else {
            setFiles(asyncFiles.current)
            console.log(asyncFiles.current)
        }
    }, [search_term, active_nav])
    return (
        <div className="content-section">
            <div className="content-section__main">
                {search_term === '' && asyncFolders.current.length !== 0 && asyncFolders.current.map((a_folder, index) => (
                    <Folder  key={index} a_folder={a_folder}/>
                ))}
                {a_files.length !== 0 && a_files.map((file, index) => (
                    <File key={index} file={file}/>
                ))}
                {a_files.length === 0 && (asyncFolders.current.length === 0 || search_term !== '') && <div>No files uploaded</div>}
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
