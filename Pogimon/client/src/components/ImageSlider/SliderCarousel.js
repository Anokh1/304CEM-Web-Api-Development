import './SliderCarousel.css'; 
import React from 'react'
import ImageSlider from './ImageSlider'
import { SliderData } from '../SliderData'

export default function SliderCarousel() {
  return (
    <ImageSlider slides={SliderData}/>
  )
}
