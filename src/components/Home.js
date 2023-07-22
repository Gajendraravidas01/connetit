import React from 'react'
import Sidebar from './homepagecomponents/Sidebar'
import Chat from './homepagecomponents/Chat'

const Home = () => {
  return (
    <div className='home'>
        <div className="container">
            <Sidebar/>
            <Chat/>
        </div>
    </div>
  )
}

export default Home