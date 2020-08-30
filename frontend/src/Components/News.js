import React from 'react'
import '../Stylesheets/News.css'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

function News() {
    return (
        <div className="news">
            <div className='btn btn__primary news__btn'>
                <span>new</span>
            </div>
            <div className="news__content">
                <div className="news__content-title">
                    News
                </div>
                <div className="news__content-body">
                    <ArrowBackIosIcon />
                    <span className="news__content-body-text">
                    Content inserted in this way isn’t really in the DOM, so it has some limitations. For instance, you can’t 
                    attach an event directly (only) to a pseudo-elements. It is also inconsistent whether or not text inserted 
                    `in this way is read by screen readers (it usually is these days) or if you can select it (it usually isn’t these days). 
                    This is literally an image on the page like would be. It could also be a gradient. Note that you cannot change the dimensions
                     of the image when inserted this way. You could also insert an image by using an empty string for the content, making it display: 
                     block in some way, sizing it, and using background-image. That way you could re-size it with background-size.
                    </span>
                    <ArrowForwardIosIcon />
                </div>
            </div>
        </div>
    )
}

export default News
