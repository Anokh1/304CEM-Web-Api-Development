import React from 'react'
import Navbar from '../components/Navbar/Navbar';
import SliderCarousel from '../components/ImageSlider/SliderCarousel';
import Footer from '../components/Footer/Footer'; 

export default function Home() {
    
    // things that you can see
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
