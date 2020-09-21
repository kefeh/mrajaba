import React, {useState} from 'react'
import '../Stylesheets/Assets.css'
import '../Stylesheets/File.css'
import GetAppIcon from '@material-ui/icons/GetApp';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import { useStateValue } from '../Data/StateProvider';
import $ from 'jquery';


function File({file}) {
    const [{refresh}, dispatch] = useStateValue();
    const [fetchingInProgress, setFetchingInProgress] = useState(false);
    const icon_path = {
        "Documents": "../images/file.png",
        "Videos": "../images/video.png",
        "Images": "../images/image.png",
    }


    const refresher = () => {
        dispatch({
            type: 'SET_REFRESH',
            item: !(refresh),
        })
    }

    const deleteFile = (id, doc_id) => {
        setFetchingInProgress(true);
        $.ajax({
            url: `/files?id=${id}&doc_id=${doc_id}`, //TODO: update request URL
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
              alert(error.responseJSON.error)
              setFetchingInProgress(false);
              refresher();
              return;
            }
        })
    }

    const downloadFile = (url) => {
        return window.location.href=url;
    }

    return (
        <div className="file">
            <div onClick={()=>{deleteFile(file.id, file.doc_id)}} className="file__delete-buttone">
                <DeleteOutlineIcon />
            </div>
            <div className="file__content">
                <img src={icon_path[file.category]} alt="file thumbnail"/>
                <div onClick={()=>{downloadFile(file.download_link)}} className="btn btn__icon-btn btn__text-icon-btn">
                    <GetAppIcon className="icon"/>
                    <span>Download</span>
                </div>
            </div>
            <div className="file__title">
            {file.name}
            </div>
        </div>
    )
}

export default File
