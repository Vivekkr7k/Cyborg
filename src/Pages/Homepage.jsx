import React from 'react'
import Navbar from '../Components/Navbar'
import Banner from '../Components/Banner'
import OurServices from '../Components/Our Services'
import How from '../Components/How'
import Testimonial from '../Components/Testimonial'
import Footer from '../Components/Foooter'

const Homepage = () => {
  return (
    <div>
      <Navbar/>
      <Banner/>
      <OurServices/>
      <How/>
      <Testimonial/>
      <Footer/>
    </div>
  )
}

export default Homepage
