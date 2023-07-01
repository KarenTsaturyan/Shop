import  { useEffect, useState } from 'react'
import SliderBlock, { ISlide } from '../SliderBlock/SliderBlock'
import "./Home.css"
import { selectProducts } from '../../store/slices/products/productSlice'
import { useAppDispatch } from '../../store/hooks'
import { useSelector } from 'react-redux'
import { fetchProducts } from '../../store/slices/products/productsAPI'


const Home = () => {
  const dispatch = useAppDispatch()
  const [_, setIsLoading] = useState(true)
  const {selectedCategory} = useSelector(selectProducts)
  useEffect(() => {
      dispatch(fetchProducts({selectedCategory, setIsLoading}))
  }, [selectedCategory])
    const [slides, setSlides] = useState<ISlide[]>([])
  return(
      <>
    <h1 className='skills'>Best Sales</h1>
      <SliderBlock slides={slides} setSlides={setSlides}/>
  <div className='home'>
  <div className='about'> 
      <h2>Best Collections</h2>
  </div>
</div>
</>


  )
}

export default Home