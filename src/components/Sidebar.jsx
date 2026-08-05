import { Link } from "react-router-dom";
import './Sidebar.css';

export function SideBar() {
    return (
        <div className="sidebar">
            <Link to="products">商品管理</Link>
            
            <br />

            <Link to="orders">订单管理</Link>
            
            <br />
             <Link to="users">用户管理</Link>
            
            <br />
             <Link to="data">数据统计</Link>

            <br />
             <Link to="log">操作日志</Link>
        </div>
    );
}