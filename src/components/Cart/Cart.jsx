import React from 'react'
import CartItem from '../CartItem/CartItem'
import { useDispatch, useSelector } from 'react-redux'
import { removeAll, selectCart } from '../../store/slices/cart/cartSlice'

let h1Style={
    fontFamily:'Arial, Helvetica, sans-serif',
    color: '#090',
    padding:'16px',
    fontWeight:'lighter',
    boxShadow:'2px 2px 6px #888',
    textAlign:'center',
    display:'block',
    margin:'16px',
  }
  let btnStyle = {
    fontSize: '18px',
    fontFamily:'Arial, Helvetica, sans-serif',
    color: '#090',
    padding:'12px',
    fontWeight:'lighter',
    boxShadow:'2px 2px 6px #888',
    textAlign:'center',
    display:'block',
    margin:'12px',
  }
const Cart = ({setCart, userName}) => {
  const {cart} = useSelector(selectCart)
  let dispatch = useDispatch()
    let delAll = ()=>{
      dispatch(removeAll())
    }
  return (
    <div>
      <h1 style={h1Style}>Full price ${cart?.reduce((acc, el)=>{
       return acc + el.price;//el.price
      },0)}</h1>
      <button style={btnStyle} onClick={()=>delAll()}>Clear Cart</button>
        <div className='feed'>
            {(Array.isArray(cart) && cart.length)
            ?
            cart.map(el=><CartItem key={el.id} cart={cart} setCart={setCart} id={el.id} name={el.name} price={el.price} weight={el.weight} imgUrl={el.imgUrl} count={el.count}/>)
            :
            <h2 style={h1Style}>Cart is empty, why you didn't fill it yet -_-</h2>
            }
        </div>
    </div>
  )
}

export default Cart