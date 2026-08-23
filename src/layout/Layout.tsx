import { SideBar } from "../components/Sidebar";
import {Outlet } from 'react-router-dom'
import './Layout.css'
import {Header} from '../components/Header'
import { useState } from "react";

export function Layout() { 
    const [collapsed, setCollapsed] = useState(false);

    return (
        <div className="layout">
            {/* 左边 */}
            <SideBar collapsed={collapsed}/>
            {/* 右边 */}
            <div className="main">
                <div className="header">
                    <Header 
                        collapsed={collapsed}
                        setCollapsed={setCollapsed}
                    />
                </div>
                <div className="content">  
                    <Outlet />
                </div>
            </div>
        </div>
    );
}