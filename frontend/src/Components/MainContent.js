import React from 'react'
import '../Stylesheets/MainContent.css'
import SideBar from './SideBar'
import ContentBody from './ContentBody'

function MainContent() {
    return (
        <div className="main-content">
            <SideBar />
            <ContentBody />
        </div>
    )
}

export default MainContent
