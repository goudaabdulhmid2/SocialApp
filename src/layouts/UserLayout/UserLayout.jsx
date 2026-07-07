import { Outlet } from "react-router-dom"
import Navbar from '../../components/layout/Navbar/Navbar'


export default function UserLayout() {
  return (
    <>
      <Navbar/>
      <div className="container mx-auto">

      <Outlet/>
      </div>
      
    </>
  )
}
