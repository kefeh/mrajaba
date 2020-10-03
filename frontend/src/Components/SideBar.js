import React, { useState, useEffect }  from 'react'
import $ from 'jquery';
import '../Stylesheets/SideBar.css'
import AddIcon from '@material-ui/icons/Add';
import GroupIcon from '@material-ui/icons/Group';
import { useStateValue } from '../Data/StateProvider';

import client from '../services/Client'

function SideBar() {
    const [{active_user, refresh}, dispatch] = useStateValue();

    const [users, setUsers] = useState([])

    useEffect(() => {
        getUsers()
    }, [refresh])
    
    const getUsers = () => {
        $.ajax({
            url: `/users?user=${client.getUserData()}`, //TODO: update request URL
            type: "GET",
            dataType: 'json',
            contentType: 'application/json',
            xhrFields: {
              withCredentials: true
            },
            crossDomain: true,
            success: (result) => {
              console.log(result.users)
              setUsers(result.users)
              if(result.users.length > 0) {
                  if (active_user === '') {
                    setActive(result.users[0].email)
                  }
                  for(var i=0; i<result.users.length; i++) {
                      if(result.users[i].email === client.getUserData()) {
                          addUser(result.users[i]);
                          break;
                      }
                  }
              }
              return;
            },
            error: (error) => {
              // console.log(error)
              // alert(error.responseJSON.message)
            //   this.setState({
            //     fetchingInProgress: false,
            //   })
              return;
            }
          })
    }

    const addUser = (user) => {
        dispatch({
            type: 'SET_USER',
            item: user
        })
    }

    const setActive = (email) => {
        dispatch({
            type: 'ADD_ACTIVE_USER',
            item: email,
        })
    } 

    const toggleShowRegister = () => {
        dispatch({
            type: 'SHOW_REGISTER',
            item: true
        })
    }

    return (
        <div className="sidebar">
            <div className="sidebar__title">
                TEAMS
            </div>
            <div className="sidebar__list">
        {users.length > 0 && users.map((item, ind) => (
            
               <div key={ind} onClick={() => setActive(item.email)} className={`sidebar__list-item ${active_user === item.email ? 'sidebar__active': ''}`}>
                    <div className="sidebar__list-item-icon">
                        <GroupIcon />
                    </div>
                    <div className="sidebar__list-item-text">
                        {item.name}
                    </div>
               </div>
               
        )) }
            </div>
            <div onClick={toggleShowRegister} className="btn btn__icon-btn sidebar__btn">
                <AddIcon className="icon"/>
            </div>
        </div>
    )
}

export default SideBar
