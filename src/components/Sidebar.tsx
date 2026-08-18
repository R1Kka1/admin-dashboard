import './Sidebar.css';
import { getCurrentUser } from "../untils/auth";
import { NavLink } from "react-router-dom";

export function SideBar() {
    const user = getCurrentUser();

    if (!user) {
        return null;
    }
    
    return (
        <div className="sidebar">
            <NavLink to="/homepage" end>主  页</NavLink>
            

            <NavLink to="products">商品管理</NavLink>
            

            <NavLink to="orders">订单管理</NavLink>
            

             {user.role === "超级管理员" && (
                <NavLink to="users">用户管理</NavLink>
            )}


            {(user.role === "管理员" || user.role === "超级管理员") && (
                <NavLink to="data">数据统计</NavLink>
            )}
             

            {user.role === "超级管理员" && (
               <NavLink to="log">操作日志</NavLink>
            )}
             
        </div>
    );
}