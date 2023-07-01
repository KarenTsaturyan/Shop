import CartItem from '../CartItem/CartItem'
import { useDispatch, useSelector } from 'react-redux'
import { removeAll, selectCart } from '../../store/slices/cart/cartSlice'

const h1Style:React.CSSProperties={
    fontFamily:'Arial, Helvetica, sans-serif',
    color: '#090',
    padding:'16px',
    fontWeight:'lighter',
    boxShadow:'2px 2px 6px #888',
    textAlign:'center',
    display:'block',
    margin:'16px',
  }
  const btnStyle:React.CSSProperties = {
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
const Cart = () => {
  const {cart} = useSelector(selectCart)
  const dispatch = useDispatch()
    const delAll = ()=>{
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
            cart.map(el=><CartItem key={el.id} id={el.id} name={el.name} price={el.price} imgUrl={el.imgUrl} count={el.count}/>)
            :
            <h2 style={h1Style}>Cart is empty, why you didn't fill it yet -_-</h2>
            }
        </div>
    </div>
  )
}

export default Cart