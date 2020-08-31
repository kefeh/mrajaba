import React from 'react'
import '../Stylesheets/SideBar.css'
import AddIcon from '@material-ui/icons/Add';
import GroupIcon from '@material-ui/icons/Group';

function SideBar() {
    return (
        <div className="sidebar">
            <div className="sidebar__title">
                TEAMS
            </div>
            <div className="sidebar__list">
               <div className="sidebar__list-item sidebar__active">
                    <div className="sidebar__list-item-icon">
                        <GroupIcon />
                    </div>
                    <div className="sidebar__list-item-text">
                        Central
                    </div>
               </div>
               <div className="sidebar__list-item">
                    <div className="sidebar__list-item-icon">
                        <GroupIcon />
                    </div>
                    <div className="sidebar__list-item-text">
                    Centre
                    </div>
               </div>
               <div className="sidebar__list-item">
                    <div className="sidebar__list-item-icon">
                        <GroupIcon />
                    </div>
                    <div className="sidebar__list-item-text">
                    South West
                    </div>
               </div>
               <div className="sidebar__list-item">
                    <div className="sidebar__list-item-icon">
                        <GroupIcon />
                    </div>
                    <div className="sidebar__list-item-text">
                    West
                    </div>
               </div>
               <div className="sidebar__list-item">
                    <div className="sidebar__list-item-icon">
                        <GroupIcon />
                    </div>
                    <div className="sidebar__list-item-text">
                    East
                    </div>
               </div>
               <div className="sidebar__list-item">
                    <div className="sidebar__list-item-icon">
                        <GroupIcon />
                    </div>
                    <div className="sidebar__list-item-text">
                    Far North
                    </div>
               </div>
            </div>
            <div className="btn btn__icon-btn sidebar__btn">
                    <AddIcon className="icon"/>
                </div>
        </div>
    )
}

export default SideBar
