import React from 'react'
import '../Stylesheets/ContentBody.css';
import '../Stylesheets/Assets.css';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import PeopleIcon from '@material-ui/icons/People';
import Search from './Search';
import ContentSection from './ContentSection';
import { useStateValue } from '../Data/StateProvider';

function ContentBody() {
    const [{active_user, user, active_class, active_nav}, dispatch] = useStateValue();

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
            <ContentSection />
        </div>
    )
}

export default ContentBody
