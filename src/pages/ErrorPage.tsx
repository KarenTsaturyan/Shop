import { Link } from 'react-router-dom'

const ErrorPage = () => {
  return (
    <div>
      <h1>Error 404</h1>
      <Link className='link' to='/'>Home</Link>
    </div>
  )
}

export default ErrorPage