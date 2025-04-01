import React from 'react'
import NavBar from '../components/NavBar'
import HomePosterCards from '../components/HomePosterCards'

const Home = () => {
  return (
    <div className='w-full h-full flex lg:flex-row flex-col '>
      <NavBar/>
      
      <HomePosterCards/>
    </div>
  )
}

export default Home