import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar/Navbar'

const HomeWrapper = () => {
  return (
    <>
        <Navbar />
        <Outlet/>
        {/* <Footer/> */}
    </>
  )
}

export default HomeWrapper