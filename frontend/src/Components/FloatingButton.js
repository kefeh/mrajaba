import React from 'react'
import '../Stylesheets/FloatingButton.css';
import AddIcon from '@material-ui/icons/Add';
import { useStateValue } from '../Data/StateProvider'

function FloatingButton() {
    const [{folder}, dispatch] = useStateValue();

    const toggleShowAddFolder = () => {
        dispatch({
            type: 'SHOW_ADD_FOLDER',
            item: true
        })
    }

    const toggleShowAddFile = () => {
        dispatch({
            type: 'SHOW_ADD_FILE',
            item: true
        })
    }

    return (
        <div className="floating-action" >
            <div className="floating-action__side" >
                {folder === '' && <div onClick={toggleShowAddFolder} className='btn btn__outline'>
                    <span>Folder</span>
                </div>}
                <div onClick={toggleShowAddFile} className='btn btn__outline'>
                    <span>File</span>
                </div>
            </div>
            <div className="btn__primary btn__floating-icon-btn ">
                <AddIcon className="icon"/>
            </div>
        </div>
    )
}

export default FloatingButton
