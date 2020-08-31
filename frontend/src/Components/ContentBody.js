import React from 'react'
import '../Stylesheets/ContentBody.css';
import '../Stylesheets/Assets.css';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import PeopleIcon from '@material-ui/icons/People';
import Search from './Search';
import ContentSection from './ContentSection';

function ContentBody() {
    return (
        <div className="content-body">
            <div className="content-body__nav">
                <div className="content-body__nav-top">
                    <div className="nav-top__button">
                        <div className='btn btn__primary'>
                            <span>Administrative</span>
                        </div>
                        <div className='btn'>
                            <span>Training</span>
                        </div>
                        <div className='btn'>
                            <span>Resources</span>
                        </div>
                    </div>
                    <div className="nav-top__notification circular-icon-holder notifier">
                        <NotificationsNoneIcon className="icon"/>
                    </div>
                </div>
                <div className="content-body__nav-bottom">
                    <div className="nav-bottom__items">
                        <div className="nav-bottom__item"> <span>Recently</span> </div>
                        <div className="nav-bottom__item nav-bottom__item-active"> <span>Documents</span> </div>
                        <div className="nav-bottom__item"> <span>Videos</span> </div>
                        <div className="nav-bottom__item"> <span>Images</span> </div>
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
