import React from 'react'
import '../Stylesheets/Assets.css'
import GetAppIcon from '@material-ui/icons/GetApp';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';

function TestPage() {
    return (
        <div>
        <div className='circular-icon-holder'>
            <NotificationsNoneIcon />
        </div>

<div className='btn btn__outline'>
<span>Download</span>
</div>
<div className='btn btn__outline'>
<span>Administration</span>
</div>
</div>

    )
}

export default TestPage
