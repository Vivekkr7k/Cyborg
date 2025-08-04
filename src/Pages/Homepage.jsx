import React from 'react'
import Navbar from '../Components/Navbar'
import Banner from '../Components/Banner'
import OurServices from '../Components/Our Services'
import How from '../Components/How'
import Testimonial from '../Components/Testimonial'
import Footer from '../Components/Foooter'
import OtpVerification from '../utils/otpverification'
import PremiumInfluencer from '../Components/Influencer/PremiumInfluencer'

const Homepage = () => {
  return (
    <div>
      <Navbar/>
      <Banner/>
      <PremiumInfluencer/>
      <OurServices/>
      <How/>
      <Testimonial/>
      <Footer/>
       <OtpVerification/>
       
    </div>
  )
}

export default Homepage
