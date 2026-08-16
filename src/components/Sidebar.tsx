import { Link } from "react-router-dom";
import './Sidebar.css';
import { getCurrentUser } from "../untils/auth";

export function SideBar() {
    const user = getCurrentUser();

    if (!user) {
        return null;
    }
    
    return (
        <div className="sidebar">
            <Link to="/homepage">主  页</Link>
            
            <br />

            <Link to="products">商品管理</Link>
            
            <br />

            <Link to="orders">订单管理</Link>
            
            <br />

             {user.role === "超级管理员" && (
                <Link to="users">用户管理</Link>
            )}
            
            <br />

            {(user.role === "管理员" || user.role === "超级管理员") && (
                <Link to="data">数据统计</Link>
            )}
             
            <br />

            {user.role === "超级管理员" && (
               <Link to="log">操作日志</Link>
            )}
             
        </div>
    );
}