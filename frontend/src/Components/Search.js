import React from 'react'
import '../Stylesheets/Assets.css'
import '../Stylesheets/Search.css'
import SearchIcon from '@material-ui/icons/Search';


function Search() {
    return (
        <div className="search">
            <form  className="search__form" action="">
                <SearchIcon className="icon search__form-icon"/>
                <input className="search__form-input" type="text"/>
            </form>
        </div>
    )
}

export default Search
