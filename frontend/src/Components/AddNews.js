import React, { useState, useEffect } from 'react'
import $ from 'jquery';
import '../Stylesheets/Assets.css'
import '../Stylesheets/AddNews.css'
import '../Stylesheets/Auth.css'

import { useStateValue } from '../Data/StateProvider'
import client from '../services/Client'


import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';

function ViewNewsItems() {
  const [newsItems, setNewsItems] = useState([]);

  useEffect(() => {
    getNewsItems()
  }, [])

  const getNewsItems = () => {
    $.ajax({
        url: `/news`, //TODO: update request URL
        type: "GET",
        dataType: 'json',
        contentType: 'application/json',
        xhrFields: {
          withCredentials: true
        },
        crossDomain: true,
        success: (result) => {
          console.log(result.news)
          setNewsItems(result.news)
          return;
        },
        error: (error) => {
          // console.log(error)
          alert(error.responseJSON.error)
        //   this.setState({
        //     fetchingInProgress: false,
        //   })
          return;
        }
      })
    }
    const deleteNews = (id) => {
      $.ajax({
          url: `/news?id=${id}&user=${client.getUserData()}`, //TODO: update request URL
          type: "DELETE",
          dataType: 'json',
          contentType: 'application/json',
          xhrFields: {
            withCredentials: true
          },
          crossDomain: true,
          success: (result) => {
            console.log(result)
            getNewsItems()
            return;
          },
          error: (error) => {
            // console.log(error)
            alert(error.responseJSON.error)
            return;
          }
      })
  }

  return (
      <>
        <div className="news_view-list-item first-child">
          <span>Created at</span>
          <span>Title</span>
          <span></span>
        </div>
        {newsItems.length > 0 && newsItems.map((item, ind) => (<div key={ind} className="news_view-list-item">
          <span>{item.created_at}</span>
          <span>{item.title}</span>
          <span>
            <div onClick={()=>{deleteNews(item.id)}} className="news_view__delete-button">
              <DeleteOutlineIcon />
            </div>
          </span>
        </div>)) }
      </>
  );
}

function AddNews() {
    const [,dispatch] = useStateValue();

    // creating the states
    const [news, setNews] = useState(null);
    const [title, setTitle] = useState(null);
    const [emptyNews, setEmptyNews] = useState(false);
    const [emptyTitle, setEmptyTitle] = useState(false);
    const [showNewsItems, setShowNewsItems] = useState(false);
    const [isloading, setIsloading] = useState(false);

    const toggleShowAddNews = () => {
        dispatch({
            type: 'HIDE_ADD_NEWS',
            item: false
        })
    }

    const saveNews = () => {
        if(!news){
          setEmptyNews(true)
          return;
        }
        if(!title){
            setEmptyTitle(true)
            return;
        }
        setIsloading(true) 
        $.ajax({
          url: `/news`,
          type: "POST",
          dataType: 'json',
          contentType: 'application/json',
          data: JSON.stringify({
            user: client.getUserData(),
            news: news,
            title: title,
          }),
          success: (result) => {
            setIsloading(false)
            toggleShowAddNews()
            return;
          },
          error: (error) => {
            console.log(error)
            alert(error.responseJSON.error)
            setIsloading(false)
            return;
          }
        })
      }

    const handleNewsChange = (event) => {
        setNews(event.target.value)
        setEmptyNews(false)
    }

    const handleTitleChange = (event) => {
        setTitle(event.target.value)
        setEmptyTitle(false)
    }

    return (
        <div className="addNews">
            <div onClick={toggleShowAddNews} className="news_back"></div>
            {!showNewsItems && (
              <>
            <form action="" className="addNews__form">
                <div onClick={()=>{setShowNewsItems(true)}} className="news_view__expand-button">
                  <ExpandMoreIcon />
                </div>
                <div className="form-item auth__form-email-news">
                    <label>Title</label>{emptyTitle&& <strong style={{color:"red"}}> news title is empty</strong>}
                    <input type="text" name="title" onChange={handleTitleChange} required/>
                    <label>News body</label>{emptyNews&& <strong style={{color:"red"}}> news content is empty</strong>}
                    <textarea name="news" onChange={handleNewsChange} required> </textarea>
                </div>
                <div className="addNews__buttons">
                    <div onClick={toggleShowAddNews} className='btn btn__outline'>
                        <span>Cancel</span>
                    </div>
                    {
                      isloading?(
                        <div className='btn btn__primary loading'>
                            <span>loading...</span>
                        </div>    
                      ):(
                        <div type="submit" onClick={saveNews} className='btn btn__primary'>
                            <span>save</span>
                        </div> 
                      )
                    }
                    
                </div>
            </form>
            </>)}
            {showNewsItems && (
              <>
              <div className="news_view">
                <div className="news_view-list">
                  <div onClick={()=>{setShowNewsItems(false)}} className="news_view__expand-button">
                    <ExpandLessIcon />
                  </div>
                  <ViewNewsItems/>
                </div>
              </div>
              </>
            )}
        </div>
    )
}


export default AddNews
