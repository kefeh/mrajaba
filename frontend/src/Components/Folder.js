import React, { useState } from 'react'
import '../Stylesheets/Folder.css'
import { useStateValue } from '../Data/StateProvider';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import $ from 'jquery';

import client from '../services/Client'

function Folder({a_folder}) {

    const [{active_user, active_class, active_nav, refresh, folder, showAddFile}, dispatch] = useStateValue();

    const [fetchingInProgress, setFetchingInProgress] = useState(false);

    const refresher = () => {
        dispatch({
            type: 'SET_REFRESH',
            item: !(refresh),
        })
    }
    const setFolder =(folder_name) => {
        console.log(folder_name);
        dispatch({
            type: 'ADD_ACTIVE_FOLDER',
            item: folder_name
        })
    }

    const deleteFolder = (id) => {
        setFetchingInProgress(true);
        $.ajax({
            url: `/folders?id=${id}&class=${active_class}&category=${active_nav}&shared_to=${active_user}&user=${client.getUserData()}`, //TODO: update request URL
            type: "DELETE",
            dataType: 'json',
            contentType: 'application/json',
            xhrFields: {
              withCredentials: true
            },
            crossDomain: true,
            success: (result) => {
              console.log(result)
              setFetchingInProgress(false);
              refresher();
              return;
            },
            error: (error) => {
              // console.log(error)
              // alert(error.responseJSON.message)
              setFetchingInProgress(false)
              refresher();
              return;
            }
        })
    }

    return (
        <div className="folder">
            <div onClick={()=>{deleteFolder(a_folder.id)}} className="folder__delete-buttone">
                <DeleteOutlineIcon />
            </div>
            <div onClick={()=>{setFolder(a_folder.folder)}} className="folder__content">
                <img src="../images/folder.png" alt="folder" />
            </div>
            <div className="folder__title">
            {a_folder.folder}
            </div>
        </div>
    )
}

export default Folder
