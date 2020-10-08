import React, { useState, useEffect } from 'react'
import $ from 'jquery';
import '../Stylesheets/News.css'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { useStateValue } from '../Data/StateProvider'

function News() {

    const [,dispatch] = useStateValue();

    const toggleShowAddNews = () => {
        dispatch({
            type: 'SHOW_ADD_NEWS',
            item: true
        })
    }

    const [newsItems, setNewsItems] = useState([]);
    const [newsCurrentIndex, setNewsCurrentIndex] = useState(0);

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

    const changeIndex = (value) => {
        var index = 0
        if(value === 'add'){
            index = (newsCurrentIndex + 1) % newsItems.length
        }else{
            index = newsCurrentIndex === 0?newsItems.length - 1 : newsCurrentIndex - 1;
        }
        setNewsCurrentIndex(index)
    }

    return (
        <div className="news">
            <div onClick={toggleShowAddNews} className='btn btn__primary news__btn'>
                <span>new</span>
            </div>
            <div className="news__content">
                <div className="news__content-title">
                    News
                </div>
                {newsItems.length > 0 && (
                    <div className="news__content-body">
                        <div onClick={()=>{changeIndex(``)}}>
                            <ArrowBackIosIcon />
                        </div>
                        <span className="news__content-body-text">
                        {newsItems[newsCurrentIndex].news}
                        </span>

                        <div onClick={()=>{changeIndex(`add`)}}>
                            <ArrowForwardIosIcon />
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default News
