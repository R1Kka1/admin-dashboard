import { SideBar } from "../components/Sidebar";
import {Outlet } from 'react-router-dom'
import './Layout.css'
import {Header} from '../components/Header'


export function Layout() { 
    

    return (
        <div className="layout">
            {/* 左边 */}
            <SideBar />
            {/* 右边 */}
            <div className="main">
                <div className="header">
                    <Header />
                </div>
                <div className="content">
                    
                    <Outlet />
                </div>
            </div>
        </div>
    );
}