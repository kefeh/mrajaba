import React from 'react'
import '../Stylesheets/Assets.css'
import SearchIcon from '@material-ui/icons/Search';


function Search() {
    return (
        <div className="search">
            <form action="">
                <SearchIcon/>
                <input type="text"/>
            </form>
        </div>
    )
}

export default Search
