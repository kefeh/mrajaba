import React from 'react'
import '../Stylesheets/ContentSection.css'
import FloatingButton from './FloatingButton'
import File from './File'

function ContentSection() {
    return (
        <div className="content-section">
            <div className="content-section__main">
                <File />
                <File />
                <File />
                <File />
                <File />
                <File />
                <File />
                <File />
                <File />
                <File />
            </div>
            <div className="content-section__floating-button">
                <FloatingButton />
            </div>
        </div>
    )
}

export default ContentSection
