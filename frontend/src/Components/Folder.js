import React from 'react'
import '../Stylesheets/Folder.css'
import { useStateValue } from '../Data/StateProvider';


function Folder({a_folder}) {
    const [{}, dispatch] = useStateValue();

    // useEffect(() => {
    //     getFiles()
    // }, [active_user, active_class, active_nav, folder])

    const setFolder =(folder_name) => {
        console.log(folder_name);
        dispatch({
            type: 'ADD_ACTIVE_FOLDER',
            item: folder_name
        })
    }

    return (
        <div onClick={()=>{setFolder(a_folder.folder)}} className="folder">
            <div className="folder__content">
                <img src="../images/folder.png" alt="folder" />
            </div>
            <div className="folder__title">
            {a_folder.folder}
            </div>
        </div>
    )
}

export default Folder
