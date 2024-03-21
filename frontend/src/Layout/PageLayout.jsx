import React from 'react'
import { useLocation } from 'react-router'
import Sidebar from '../components/sidebar/Sidebar'
import Loading from '../components/loading/Loading'
import Navbar from '../components/navbar/Navbar'
import Footer from '../components/Footer'

const PageLayout = ({children}) => {
    const {pathname} = useLocation()
    // const [user, loading] = useAuthState(auth)
    const canRedenderSidebar = pathname!== "/" && pathname !== "/autentificare"

    // if(!user && loading){
    //     return <PageLayoutSpiner/>
    // }

    return (
        <div className="outside-container">
            {canRedenderSidebar && <Sidebar/>}
            {/* {canRenderNavbar && <Navbar/>} */}

            <section className={`inner-container ${pathname !== "/" &&"margin-for-navbar" }`}>
                <Navbar/>
                {children}
                <Footer/>
            </section>



        </div>
    )
}

export default PageLayout

const PageLayoutSpiner = () => {
    return (
        <div>
            <Loading/>
        </div>
    )
}
