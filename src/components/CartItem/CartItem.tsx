import './CartItem.css'
import { useDispatch } from 'react-redux'
import { decrementCount, incrementCount, removeItem } from '../../store/slices/cart/cartSlice'

type TypeCartItemProps = {
  id:string,
  name:string,
  price:number,
  imgUrl:string[],
  count:number
}

const CartItem = ({id, ...props}:TypeCartItemProps) => {
   const dispatch = useDispatch()
  
    const plus=()=>{
      dispatch(incrementCount(id))
    }
    
    const minus=()=>{
      dispatch(decrementCount(id))
    }
    const delItem = () =>{
      dispatch(removeItem(id))
      
    }
    return (
        <div className='cart-feed'>
              <div className='cart-container-card' key={id}>
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
                  <button className='cart-btn delete' onClick={()=>delItem()}>Delete</button> 
                  </div>
              </div>
              </div>
        </div>
        )
}

export default CartItem