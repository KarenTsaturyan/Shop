import { useEffect, useState } from 'react'
import Card from '../Card/Card'
import './Products.css'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts } from '../../store/slices/products/productsAPI'
import { selectProducts, setSelectedCategory } from '../../store/slices/products/productSlice'
import { fetchCategories } from '../../store/slices/categories/categoriesAPI'
import { selectCategories } from '../../store/slices/categories/categoriesSlice'
import { useAppDispatch } from '../../store/hooks'

const Products = () => {
  const [isLoading, setIsLoading] = useState(true)

  const dispatch = useAppDispatch()
  const {allProducts, selectedCategory} = useSelector(selectProducts)
  const {categories} = useSelector(selectCategories)

useEffect(() => { 
  // console.log(categories);
    if(categories){
      dispatch(fetchCategories())
    }
}, [])
///nerqeviny comment anel mi hat limitner dnel pagereov, category heto
useEffect(() => {
    dispatch(fetchProducts({selectedCategory, setIsLoading}))
}, [selectedCategory])

  return (
    <div>
    <button className="category-btn" onClick={()=>dispatch(setSelectedCategory('all'))}>all</button>
     {categories.map((el,i)=>(
        <button className="category-btn" key={i} onClick={()=>dispatch(setSelectedCategory(el))}>{el}</button>
     ))}
    
    <div className='feed'>
     {/* <SideBar selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} categories={categories} /> */}
     
      {
        isLoading ? <div className="lds-circle"><h1>Loading...</h1><div></div></div> :
        // errMessage ? <h1>{errMessage}</h1> :
        <>
        {allProducts.map(el=>(
            <Card 
                key={el.id} 
                price={el.price} 
                id={el.id}
                name={el.name}
                description={el.description}
                imgUrl={el.imgUrl[0]} 
            />
        ))}
      </>
      }
    </div>
    </div>
  )
}

export default Products