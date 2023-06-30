import React, { useState } from 'react'
import SliderBlock from '../SliderBlock/SliderBlock'
import "./Home.css"


const Home = () => {
    let [slides, setSlides] = useState([])
  return(
      <>
    <h1 className='skills'>Best Sales</h1>
      <SliderBlock slides={slides} setSlides={setSlides}/>
  <div className='home'>
  <div className='about'> 
      <h2>Best Collections</h2>
  </div>
</div>
</>


  )
}

export default Home