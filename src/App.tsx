import './App.css';
import { Route, Routes } from 'react-router-dom';
import HomeWrapper from './pages/HomeWrapper';
import ErrorPage from './pages/ErrorPage';
import Home from './components/Home/Home';
import { useEffect, useState,  } from 'react';
import Products from './components/Products/Products';
import ProductPage from './components/ProductPage/ProductPage';
import Cart from './components/Cart/Cart';
import Login from './components/Login/Login';
import Registration from './components/Registration/Registration';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from './store/slices/users/usersAPI';
import { selectUsers } from './store/slices/users/usersSlice';
import { useAppDispatch } from './store/hooks';

function App() {
  const dispatch = useAppDispatch()
  const {usersData} = useSelector(selectUsers)

  
  // console.log(usersData);//users for login

  useEffect(() => {
    dispatch(fetchUsers())
  }, [])

  return (
    <>
    <Routes>
    <Route path='/' element={<HomeWrapper />}>
      <Route index element={<Home/>}/>
      <Route path='products'>
        <Route index element={<Products />}/>
        <Route path=':id' element={<ProductPage />}/>
        
      </Route>
      <Route path='cart' element={<Cart  />}/>
      {/* <Route path='contact' element={<Contact/>}/> */}
      
    </Route>
      <Route path='*' element={<ErrorPage/>}/>
      <Route path='login' element={<Login />}/>
      <Route path='registration' element={<Registration />}/>
    </Routes>
    </>
  );
}

export default App;


            