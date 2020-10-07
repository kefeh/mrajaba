import React from 'react'
import '../Stylesheets/Assets.css'
import '../Stylesheets/Search.css'
import SearchIcon from '@material-ui/icons/Search';
import { useStateValue } from '../Data/StateProvider';

function Search() {
    const [,dispatch] = useStateValue();

    const handleChange = (event) => {
        console.log(event.target.value)
        dispatch({
            type: 'SET_SEARCHTERM',
            item:  event.target.value,
        })
    }

    return (
        <div className="search">
            <form  className="search__form" action="">
                <SearchIcon className="icon search__form-icon"/>
                <input onChange={handleChange} className="search__form-input" type="text"/>
            </form>
        </div>
    )
}

export default Search
