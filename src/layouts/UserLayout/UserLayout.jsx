import { Outlet } from "react-router-dom"
import Navbar from '../../components/layout/Navbar/Navbar'
import Footer from '../../components/layout/Footer/Footer'


export default function UserLayout() {
  return (
    <>
      <Navbar/>
      <div className="container mx-auto">

      <Outlet/>
      </div>
      <Footer/>
    </>
  )
}
