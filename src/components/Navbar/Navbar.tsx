import { useEffect, useState } from 'react'
import './Navbar.css'
import { Link, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { selectUsers, setUserCart, setUserName } from '../../store/slices/users/usersSlice'
import { delCart, selectCart } from '../../store/slices/cart/cartSlice'


const Navbar = () => {
    const {userCart, userName} = useSelector(selectUsers)
    // console.log(userName);
    const {cart} = useSelector(selectCart)
    const dispatch = useDispatch()
    const LogOut = () =>{
      dispatch(setUserCart([
        ...userCart.filter((value, index, self) =>//saves the current cart in userCart
        index === self.findLastIndex((t) => (
          t.nr === value.nr
        ))),
        {
          nr: userName,
          user: [
            ...cart,
          ]
        },
    ]))
    console.log(userCart);
 
      dispatch(delCart())
      dispatch(setUserName(null))
    }
    useEffect(() => {
        console.log('userCart`');
        console.log(userName);
          // console.log(userCart.findLast(el=>el)?.user)//.find

    }, [])

    const [expandNavbar, setExpandNavbar ] = useState(false)
    
    const location = useLocation()

    useEffect(()=>{
        setExpandNavbar(false)//close navbar evey time loc chnages
    }, [location])
    

    return (
      <div className='navbar' id={expandNavbar ? "open" : "close"}>
      <div className='toggleButton'>
          <button onClick={()=>{
              setExpandNavbar((prev)=>!prev)
              }}
              >
                <h2>☰</h2>
          </button>
      </div>
      <div className='links'>
          <Link to="/">HOME</Link>{/* Home */}
          <Link to="/products">Products</Link>
          <Link to="/cart">Cart</Link>
        {!userName ?  
        <Link to="/login">Login</Link>
        :
        <Link to="/login" onClick={()=>LogOut()}>{userName}-OUT</Link>
        // <button onClick={()=>LogOut()}>{userName}</button>
        }

      </div>
  </div>
  )
}


export default Navbar