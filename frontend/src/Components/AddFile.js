import React, { useState, useEffect } from 'react'
import $ from 'jquery';
import '../Stylesheets/Assets.css'
import '../Stylesheets/AddFile.css'
import '../Stylesheets/Auth.css'
import '../Stylesheets/Loader.css'

import { useStateValue } from '../Data/StateProvider'
import { colors } from '@material-ui/core';

function AddFile() {
    const document = ".pdf,.doc,.docx,.xml,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    const images = "image/*"
    const videos = "video/*"
    const [{active_user, active_class, active_nav, folder, showAddFile}, dispatch] = useStateValue();
    
    var acceptType = ''
    if(active_nav === 'Documents'){
        acceptType=document
    }
    if(active_nav === 'Videos'){
        acceptType=videos
    }
    if(active_nav === 'Images'){
        acceptType=images
    }
    const [selectedFile, setSelectedFile] = useState(undefined);
    const [progress, setProgress] = useState(0);
    const [showProgress, setShowProgress] = useState(false);

    const selectFile = (event) => {
        console.log(event.target.files)
        setSelectedFile(event.target.files);
      };

    const toggleHideAddFile = () => {
        dispatch({
            type: 'HIDE_ADD_FILE',
            item: true
        })
    }

    const upload = (event) => {
        var data = new FormData();
        setShowProgress(true)
        data.append('file', selectedFile[0]);
        data.append('user', active_user);
        data.append('class', active_class);
        data.append('category', active_nav);
        data.append('folder', folder);
        $.ajax({
            type: "POST",
            url: "/upload",
            data: data,
            processData: false,
            contentType: false,
            xhr: () => {
                var xhr = $.ajaxSettings.xhr();
                xhr.onprogress = function e() {
                    // For downloads
                    if (e.lengthComputable) {
                        setProgress(Math.round((e.loaded / e.total)*100))
                        // console.log(e.loaded / e.total);
                    }
                };
                xhr.upload.onprogress = function (e) {
                    // For uploads
                    if (e.lengthComputable) {
                        setProgress(Math.round((e.loaded / e.total)*100))
                        // console.log(e.loaded / e.total);
                    }
                };
                return xhr;
            },
            success: (result) => {
                // console.log(result)
                // console.log(event.loaded)
                toggleHideAddFile();
                // setIsloading(false)
                // toggleShowAddFolder()
                return;
              },
              error: (error) => {
                console.log(error)
                alert(error.responseJSON.error)
                toggleHideAddFile();
                return;
              }
        })
    }

    return (
        <div className="addFile">
            
            <form action="" className="addFile__form">
                {showProgress ? (<div className="">
                    <div className="addFileloader__containers">
                        <div className="addFile_loader">
                    </div>
                </div>
            </div>):(<><div className="form-item auth__form-email">
                    <input type="file" name="file" id="addFile" class="file__inputfile" onChange={selectFile} accept={acceptType}/>
                    {/* <label for="file">Choose a file</label> */}
                </div>
                <div className="addFile__buttons">
                    <div onClick={toggleHideAddFile}  className='btn btn__outline'>
                        <span>cancel</span>
                    </div>
                    
                        {/* <div className='btn btn__primary loading'>
                            <span>loading...</span>
                        </div>    */}
                        <div onClick={upload} type="submit"  className='btn btn__primary'>
                            <span>save</span>
                        </div> 
                </div> </>)}
                
            </form>
        </div>
    )
}

export default AddFile
