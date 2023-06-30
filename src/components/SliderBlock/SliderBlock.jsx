import React, {useEffect, useState} from 'react'
import axios from "axios"
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import './SliderBlock.css'
import { Link } from 'react-router-dom';


function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array
}

const SliderBlock = ({slides, setSlides}) => {
  let randNum1 = Math.floor((Math.random() * 25) + 1)
  // let randNum2 = Math.floor(Math.random() * (7) + 4)
  console.log(randNum1 );
  const [isLoading, setIsLoading] = useState(true)
    const [errMessage, setErrMessage] = useState("") 
  useEffect(() => {
    axios.get('https://dummyjson.com/products')///'https://dummyjson.com/products/'
      .then((response)=>{
        const currentData = shuffle(response.data.products).slice(randNum1,randNum1+4).map(el=>({
          id: el.id.toString(),
          name: el.title,
          category: el.category,
          price: Math.round(el.price),
          description:el.description,
          imgUrl: el.images,
        }))
        setSlides([
          ...currentData
        ])
        
      })
      .catch((err)=>{
        console.log(err.message);
        setErrMessage(err.message)
        // setIsLoading(false)
      })
      .finally(()=>{
        setIsLoading(false)
      })
    }, [])
    let settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        appendDots: (dots) => (
          <ul style={{ margin: "0px" }}> {dots} </ul>
      ),
      }
      return (
        <div className='slider'>
          {
        isLoading ? <div className="lds-circle"><div></div></div>:///css-> product.css
        errMessage ? <h1>{errMessage}</h1> :
          <Slider {...settings}>
              {slides.map(el=>(
              <div key={el.id} className='slide-item'>
                <h2>{el.name}</h2>
                <img src={el.imgUrl[0]} alt="product"/>
                <p>{el.description}</p>
                <Link to={`/products/${el.id}`}><button className='sl-btn'>BUY NOW <h4>${el.price}</h4></button></Link>
              </div>
              ))}
          </Slider>
}
          </div>
  )
}

export default SliderBlock