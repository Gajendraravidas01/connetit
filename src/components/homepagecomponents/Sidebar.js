import React from 'react'
import Navebar from './Navebar'
import Searchbar from './Searchbar'
import Chats from './Chats'

const Sidebar = () => {
  return (
    <div className='sidebar'>
        <Navebar/>
        <Searchbar/>
        <Chats/>
    </div>
  )
}

export default Sidebar