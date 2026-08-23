import './Sidebar.css';
import { getCurrentUser } from "../untils/auth";
import { NavLink } from "react-router-dom";
interface SideBarProps {
    collapsed: boolean;
}

export function SideBar({collapsed}:SideBarProps) {
    const user = getCurrentUser();

    if (!user) {
        return null;
    }
    
    return (
        <div className={`sidebar ${collapsed ? "collapsed" : ""}`}>
            <NavLink to="/homepage" end>
                <span className='sidebar-icon'>🏠</span>
                <span className='sidebar-text'>主  页</span>
            </NavLink>
            

            <NavLink to="products">
                <span className='sidebar-icon'>📦</span>
                <span className='sidebar-text'>商品管理</span>
            </NavLink>
            

            <NavLink to="orders">
                <span className='sidebar-icon'>🛒</span>
                <span className='sidebar-text'>订单管理</span>
            </NavLink>
            

             {user.role === "超级管理员" && (
                <NavLink to="users">
                    <span className='sidebar-icon'>👤</span>
                    <span className='sidebar-text'>用户管理</span>
                </NavLink>
            )}


            {(user.role === "管理员" || user.role === "超级管理员") && (
                <NavLink to="data">
                    <span className='sidebar-icon'>📊</span>
                    <span className='sidebar-text'>数据统计</span>
                </NavLink>
            )}
             

            {user.role === "超级管理员" && (
               <NavLink to="log">
                    <span className='sidebar-icon'>📝</span>
                    <span className='sidebar-text'>操作日志</span>
                </NavLink>
            )}
             
        </div>
    );
}