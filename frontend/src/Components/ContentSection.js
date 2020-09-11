import React from 'react'
import '../Stylesheets/ContentSection.css'
import FloatingButton from './FloatingButton'
import File from './File'
import { useStateValue } from '../Data/StateProvider';


function ContentSection() {
    const [{active_nav}] = useStateValue();
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
            {active_nav!== "Recently" && (
            <div className="content-section__floating-button">
                <FloatingButton />
            </div>
            )}
        </div>
    )
}

export default ContentSection
