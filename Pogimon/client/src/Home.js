import React from 'react'
import Navbar from './Navbar'
import SliderCarousel from './SliderCarousel';
import Footer from './Footer'; 

export default function Home() {

    return (
        <>
            {/* Navigation bar for users to change pages easily */}
            <Navbar />
            {/* Image slider that works like a carousel but does not automatically changes the image */}
            <SliderCarousel />
            
            <Footer />
        </>
    )
}
