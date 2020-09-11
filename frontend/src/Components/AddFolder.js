import React, { useState } from 'react'
import $ from 'jquery';
import '../Stylesheets/Assets.css'
import '../Stylesheets/AddFolder.css'
import '../Stylesheets/Auth.css'

import { useStateValue } from '../Data/StateProvider'

function AddFolder() {
    const [{active_user, active_class, active_nav}, dispatch] = useStateValue();

    // creating the states
    const [folder, setFolder] = useState(null);
    const [isloading, setIsloading] = useState(false);

    const saveFolder = () => {
        setIsloading(true)
        $.ajax({
          url: `/folder`, 
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
    }

    return (
        <div className="folder">
            <form action="" className="folder__form">
                <div className="form-item auth__form-email">
                    <label>New Folder</label>
                    <input type="text" name="folder" onChange={handleFolderChange} required/>
                </div>
                <div className="folder__buttons">
                    <div className='btn btn__outline'>
                        <span>Cancel</span>
                    </div>
                    <div onClick={saveFolder} className='btn btn__primary'>
                        <span>save</span>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default AddFolder
