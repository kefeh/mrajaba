import React, { useState, useEffect } from 'react'
import '../Stylesheets/Assets.css'
import '../Stylesheets/Notification.css'
import { useStateValue } from '../Data/StateProvider'
import $ from 'jquery'
import client from '../services/Client'

function Notification() {
    const [{refresh}, dispatch] = useStateValue();
    const [notifications, setNotifications] = useState([]);
    useEffect(() => {
        getNotifications();
        return refresher;
    }, [])

    const refresher = () => {
        dispatch({
            type: 'SET_REFRESH',
            item: !(refresh),
        })
    }
    const hideNotification = () => {
        dispatch({
            type: 'HIDE_NOTIFICATION',
        })
    }

    const getNotifications = () => {
        $.ajax({
            url: `/notifications?user=${client.getUserData()}`, //TODO: update request URL
            type: "GET",
            dataType: 'json',
            contentType: 'application/json',
            xhrFields: {
              withCredentials: true
            },
            crossDomain: true,
            success: (result) => {
              console.log(result.notifications)
              setNotifications(result.notifications)
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

    return (
        <div className="notifs">
            <div onClick={hideNotification} className="notifs_back"></div>
            <ol className="notif__body">
                <span>NOTIFICATIONS</span>
                {notifications.length > 0 && notifications.map((item, ind) => (
                    <li key={ind} className="notif__item">{item.message}</li>
                ))}
            </ol>
        </div>
    )
}

export default Notification