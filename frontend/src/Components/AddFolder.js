import React, { useState } from 'react'
import $ from 'jquery';
import '../Stylesheets/Assets.css'
import '../Stylesheets/AddFolder.css'
import '../Stylesheets/Auth.css'

import { useStateValue } from '../Data/StateProvider'
import { colors } from '@material-ui/core';

function AddFolder() {
    const [{active_user, active_class, active_nav, showAddFolder}, dispatch] = useStateValue();

    // creating the states
    const [folder, setFolder] = useState(null);
    const [emptyFolder, setEmptyFolder] = useState(false);
    const [isloading, setIsloading] = useState(false);

    const toggleShowAddFolder = () => {
        dispatch({
            type: 'HIDE_ADD_FOLDER',
            item: false
        })
    }

    const saveFolder = () => {
        if(!folder){
          setEmptyFolder(true)
          return;
        }
        setIsloading(true) 
        $.ajax({
          url: `/folders`,
          type: "POST",
          dataType: 'json',
          contentType: 'application/json',
          data: JSON.stringify({
            user: active_user,
            class: active_class,
            category: active_nav,
            folder: folder,
          }),
          success: (result) => {
            setIsloading(false)
            toggleShowAddFolder()
            return;
          },
          error: (error) => {
            console.log(error)
            alert(error.responseJSON.error)
            setIsloading(false)
            return;
          }
        })
      }

    const handleFolderChange = (event) => {
        setFolder(event.target.value)
        setEmptyFolder(false)
    }

    return (
        <div className="folder">
            <form action="" className="folder__form">
                <div className="form-item auth__form-email">
                    <label>New Folder</label>{emptyFolder&& <strong style={{color:"red"}}> Folder Name is empty</strong>}
                    <input type="text" name="folder" onChange={handleFolderChange} required/>
                </div>
                <div className="folder__buttons">
                    <div onClick={toggleShowAddFolder} className='btn btn__outline'>
                        <span>Cancel</span>
                    </div>
                    {
                      isloading?(
                        <div className='btn btn__primary loading'>
                            <span>loading...</span>
                        </div>    
                      ):(
                        <div type="submit" onClick={saveFolder} className='btn btn__primary'>
                            <span>save</span>
                        </div> 
                      )
                    }
                    
                </div>
            </form>
        </div>
    )
}

export default AddFolder
