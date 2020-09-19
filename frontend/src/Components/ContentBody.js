import React, { useState, useEffect, useCallback }  from 'react'
import '../Stylesheets/ContentBody.css';
import '../Stylesheets/Assets.css';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import PeopleIcon from '@material-ui/icons/People';
import Search from './Search';
import ContentSection from './ContentSection';
import { useStateValue } from '../Data/StateProvider';
import $ from 'jquery';


function ContentBody() {
    const [{active_user, active_class, active_nav, folder, showAddFile, showAddFolder}, dispatch] = useStateValue();
    
    const [documents, setDocuments] = useState([]);
    const [files, setFiles] = useState([]);
    const [fetchingInProgress, setFetchingInProgress] = useState(false);

    useEffect(() => {
        getFiles()
    }, [active_user, active_class, active_nav, folder, showAddFile, showAddFolder])

    useEffect(() => {
        getFolders()
    }, [active_user, active_class, active_nav, folder, showAddFile, showAddFolder])

    const getFiles = () => {
        setFetchingInProgress(true);
        $.ajax({
            url: `/files?class=${active_class}&category=${active_nav}&folder=${folder}&user=${active_user}`, //TODO: update request URL
            type: "GET",
            dataType: 'json',
            contentType: 'application/json',
            success: (result) => {
              console.log(result.files)
              setFiles(result.files);
              setFetchingInProgress(false);
              return;
            },
            error: (error) => {
              // console.log(error)
              // alert(error.responseJSON.message)
              setFetchingInProgress(false)
              return;
            }
        })
    }

    const getFolders = () => {
        setFetchingInProgress(true);
        if(folder){
            setDocuments([]);
            return
        }
        $.ajax({
            url: `/folders?class=${active_class}&category=${active_nav}&user=${active_user}`, //TODO: update request URL
            type: "GET",
            dataType: 'json',
            contentType: 'application/json',
            xhrFields: {
              withCredentials: true
            },
            crossDomain: true,
            success: (result) => {
              console.log(result.foldrs)
              setDocuments(result.folders);
              setFetchingInProgress(false);
              return;
            },
            error: (error) => {
              // console.log(error)
              // alert(error.responseJSON.message)
              setFetchingInProgress(false)
              return;
            }
        })
    }

    const activeClass = (class_name) => {
        dispatch({
            type: 'ADD_ACTIVE_CLASS',
            item: class_name,
        })
    }

    const activeNav = (class_name) => {
        dispatch({
            type: 'ADD_ACTIVE_NAV',
            item: class_name,
        })
    }

    // useCallback(
    //     getFiles,
    //     [active_user, active_class, active_nav, folder],
    // )

    // useCallback(
    //     getFolders,
    //     [active_user, active_class, active_nav],
    // )

    return (
        <div className="content-body">
            <div className="content-body__nav">
                <div className="content-body__nav-top">
                    <div className="nav-top__button">
                        <div onClick={() => {activeClass("Administrative")}} className={`btn ${active_class==="Administrative"?"btn__primary":""}`}>
                            <span>Administrative</span>
                        </div>
                        <div onClick={() => {activeClass("Training")}} className={`btn ${active_class==="Training"?"btn__primary":""}`}>
                            <span>Training</span>
                        </div>
                        <div onClick={() => {activeClass("Resources")}} className={`btn ${active_class==="Resources"?"btn__primary":""}`}>
                            <span>Resources</span>
                        </div>
                    </div>
                    <div className="nav-top__notification circular-icon-holder notifier">
                        <NotificationsNoneIcon className="icon"/>
                    </div>
                </div>
                <div className="content-body__nav-bottom">
                    <div className="nav-bottom__items">
                        <div onClick={() => {activeNav("Recently")}} className={`nav-bottom__item ${active_nav==="Recently"?"nav-bottom__item-active":""}`}> <span>Recently</span> </div>
                        <div onClick={() => {activeNav("Documents")}} className={`nav-bottom__item ${active_nav==="Documents"?"nav-bottom__item-active":""}`}> <span>Documents</span> </div>
                        <div onClick={() => {activeNav("Videos")}} className={`nav-bottom__item ${active_nav==="Videos"?"nav-bottom__item-active":""}`}> <span>Videos</span> </div>
                        <div onClick={() => {activeNav("Images")}} className={`nav-bottom__item ${active_nav==="Images"?"nav-bottom__item-active":""}`}> <span>Images</span> </div>
                    </div>
                    <div className="nav-bottom__inputs">
                        <Search />
                        <div className="nav-top__notification circular-icon-holder">
                            <PeopleIcon className="icon"/>
                        </div>
                    </div>
                </div>
            </div>
            {fetchingInProgress?(
                <div className="loader__holder">
                    <div className="loader__container">
                        <div className="loader">
                    </div>
                </div>
            </div>
            ):(
                <ContentSection folders={documents} files={files} getFiles={getFiles} getFolders={getFolders} />
            )}
        </div>
    )
}

export default ContentBody
