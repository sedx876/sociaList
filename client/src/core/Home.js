import React from 'react'
import soc from '../images/soc.png'
import Posts from "../post/Posts";

const Home = () => {
  return (
    <div className='jumbotron jumbotron-fluid'>
      <h1 className=' font-weight-bold text-center text-primary'>
          Welcome to sociaList
          <br/>
          <img className='soc' src={soc} alt='socialist'/>
      </h1>
      <div className="container">
      <Posts />
    </div>
    </div>
  )
}

export default Home
