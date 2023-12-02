import { Outlet } from "react-router-dom"
import Sidebar from "./Sidebar.jsx"

function Home() {
    return (
        <div style={{display: 'flex', height:'100vh', width:'100%' }}>
            <Sidebar />
            <Outlet />
        </div>

    )
}

export default Home