import React from 'react'
import Hero from '../components/Hero'
import FeturedSection from '../components/FeturedSection'
import Banner from '../components/Banner'
import Experience from '../components/Experience'
import Testimonial from '../components/Testimonial'
import Newsletter from '../components/NewsLetter'
import Footer from '../components/Footer'
const Home = () => {
  return (
    <>
      <Hero />
      <FeturedSection />
      <Banner />
      <Experience />
      <Testimonial />
      <Newsletter />
      <Footer />
    </>
  )
}

export default Home