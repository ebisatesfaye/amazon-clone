import React from 'react'
import {Carousel} from 'react-responsive-carousel'
import { imgs } from './images/data';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import classes from './Carousel.module.css'
function CarouselEffect() {
  return (
    <div>
      <Carousel
      autoplay={true}
      interval={1000}
      infiniteLoop={true}
      showIndicators={false}
      showThumbs={false}>

{
    imgs.map((imageItemLink,id)=>{
        return <img  src={imageItemLink} key={id}/> 
    })
}
      </Carousel>
      <div className={classes.hero_img}></div>
    </div>
  )
}

export default CarouselEffect;
