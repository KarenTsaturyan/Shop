import React from 'react'
import { useNavigate} from 'react-router-dom'
import './Card.css'
type TypeCardProps = {
  price:number, id:string, name:string, description:string, imgUrl:string
}
const Card = ({price, id, name, description, imgUrl}:TypeCardProps) => {
 const navigate = useNavigate();
  return (

    <div className="container-card">
              <img
            src={imgUrl}
            alt="people"
            />
        <div className="container-card__profile">  
            <div className="container-card__profile__text">
                <h2 className='txtLink'>{name}</h2>
                <button className='btn-product' onClick={()=>navigate(id)}>More</button>
                <p>{description}</p>
                <h5>${price}</h5>       
            </div>
        </div>
     </div>
  )
}

export default Card