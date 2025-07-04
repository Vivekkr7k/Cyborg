import React from 'react'
import Navbar from '../Components/Navbar'
import Intro from '../Components/About/Intro'
import Mission from '../Components/About/Mission'
import Why from '../Components/About/Why'
import Aboutdropdown from '../Components/About/Aboutdropdown'
import Footer from '../Components/Foooter'

const About = () => {
  return (
   <>
   <Navbar/>
   <Intro/>
   <Mission/>
   <Why/>
   <Aboutdropdown/>
   <Footer/>
   </>
  )
}

export default About
