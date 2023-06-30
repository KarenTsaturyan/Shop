import React from 'react'
import './CartItem.css'
import { useDispatch } from 'react-redux'
import { decrementCount, incrementCount, removeItem } from '../../store/slices/cart/cartSlice'
const CartItem = ({cart,id,setCart, ...props}) => {
   let dispatch = useDispatch()
  
    let plus=()=>{
      dispatch(incrementCount(id))
    }
    
    let minus=()=>{
      dispatch(decrementCount(id))
    }
    let delItem = () =>{
      dispatch(removeItem(id))
      
    }
    return (
        <div className='cart-feed'>
              <div className='cart-container-card' key={props.id}>
                      <img
                  src={props.imgUrl[0]}
                  alt="people"
                  />
              <div className="cart-container__profile">  
                  <div className="cart-container__profile__text">
                      <h2 className='cart-txtLink'>{props.name}</h2>
                      <h5>${props.price}|<span className='count'>{props.count}</span>|</h5>       
              <button className='cart-btn' onClick={()=>plus()}>+1</button> 
              <button className='cart-btn' onClick={()=>minus()} disabled={(props.count<=1)? true : false}>-1</button>
                  </div>
                  <button className='cart-btn delete' onClick={()=>delItem()}>Delete</button> 
              </div>
              </div>
        </div>
        )
}

export default CartItem