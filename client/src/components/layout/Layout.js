import React, {useContext} from 'react'
import { Outlet, useLocation, Navigate } from 'react-router-dom'
import Navbar from '../navbar/Navbar'
import { SocialContext } from '../context/Context'

const Layout = () => {
    const {state} = useContext(SocialContext)
    const location = useLocation()
    const path = location?.pathname?.split("/")[1]
    
    if(!path || path==="register") {
        if (state?.user?.email) {
            return <Navigate to="/home" />
        }
    } else {
        if (!state?.user?.email) {
            return <Navigate to="/" />
        }
    }
    return (
            <div>
                <Navbar />
                <Outlet />
            </div>
        )
}
export default Layout