import './SliderCarousel.css'; 
import React from 'react'
import ImageSlider from './components/ImageSlider'
import { SliderData } from './components/SliderData'

export default function SliderCarousel() {
  return (
    <ImageSlider slides={SliderData}/>
  )
}
