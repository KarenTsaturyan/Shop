import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import "./ProductPage.css"
import Slider from 'react-slick';
import axios from 'axios';
import { findElem, selectProducts } from '../../store/slices/products/productSlice';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, selectCart } from '../../store/slices/cart/cartSlice';
const ProductPage = ({userName,}) => {
    const navigate = useNavigate()
    const {id} = useParams();
    let dispatch = useDispatch()
    const {currentProduct} = useSelector(selectProducts)
      useEffect(()=>{//componentDidMount
        dispatch(findElem(id))
      }, [])
  
    let addTo=()=>{
        dispatch(addToCart(currentProduct))
          navigate('/cart');
    }
    let settings = {
      infinite: true,
      speed: 700,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
    }
    return (
      <div>
         <div className="container-page">
         <Slider {...settings}>
         {currentProduct?.imgUrl?.map((txt,i) => 
         <img key={i}
              src={`${txt}`}
              alt="people"
              />
              )}
          </Slider>
          <div className="container__profile">  
              <div className="container__profile__text">
                  <h2>{ currentProduct?.name}</h2>
                  <p>{ currentProduct?.description}</p>
                  <h5>${ currentProduct?.price}</h5>
                  {/* {(userName)  */}
                  {/* ?  */}
                  <h5><button className='btn-product-page' onClick={()=>addTo()}>Add</button></h5>
                  {/* :
                  <>
                  <h5>Please <span style={{fontWeight:'bold',color:"#1ffa39"}}>Sign In</span> to buy something </h5>
                  <button className='btn-product-page' onClick={()=>navigate("/login")}>Login</button>
                  </> */}
                  {/* } */}
                  
              </div>
          </div>
    
       </div>
       </div>
    )
  }
  
  export default ProductPage