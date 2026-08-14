import { Loading } from "../components/Loading";
import { useUsers } from "../hooks/useUsers";
import { calculateTotalSales, calculateTotalQuantity } from "../untils/statistics";
import { formatCurrency } from "../untils/money";
import { useOrders } from "../hooks/useOrders";
import { useProducts } from '../hooks/useProducts';
import { useLogs } from "../hooks/useLogs";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip, ResponsiveContainer
} from "recharts";
import dayjs from "dayjs";
import "./HomePage.css";
import { AddUser } from "../components/AddUser";
import { useState } from "react";
import { Toast } from "../components/Toast.jsx";
import { getCurrentUser } from "../untils/auth.js";

export function HomePage() {
    const user = getCurrentUser();
    const [toast,setToast] = useState("");
    const [showAddUserModal,setShowAddUserModal] = useState(false);
    const { users, loading: usersLoading,loadUsers } = useUsers();
    const { orders, loading: ordersLoading } = useOrders();
    const { logs, loading: logsLoading } = useLogs();
    const totalSales = calculateTotalSales(orders);
    const totalQuantity = calculateTotalQuantity(orders);
    const { products, loading: productsLoading } = useProducts();

    function showToast(message){

        setToast(message);

        setTimeout(()=>{
            setToast("");
        },2000);

    }


    if (ordersLoading || usersLoading || productsLoading || logsLoading) {
        return <Loading />
    }

    const salesMap = {};
    orders.forEach((order) => {
        const day = dayjs(order.createdAt).format("MM-DD");
        if (!salesMap[day]) {
            salesMap[day] = 0;
        }
        salesMap[day] += order.totalCostCents;
    })
    const sevenSales = Object.entries(salesMap).map(([day, sales]) => ({
        day,
        sales
    }));
    const warningProducts = products.filter((product) => {
        return product.stock < 10;
    });
    const recentLogs = [...logs]
        .sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt);
        }).slice(0, 10);



    return (
        <div className="Homepage">
            <div className="homepage-sales-cards">
                <div className="homepage-sales-card">
                    <div className="title">总销售额</div>
                    <div className="number">{formatCurrency(totalSales)}</div>
                </div>
                <div className="homepage-sales-card">
                    <div className="title">总订单</div>
                    <div className="number">{orders.length}单</div>
                </div>
                <div className="homepage-sales-card">
                    <div className="title">用户总数</div>
                    <div className="number">{users.length}人</div>
                </div>
                <div className="homepage-sales-card">
                    <div className="title">商品数量</div>
                    <div className="number">{totalQuantity}件</div>
                </div>
            </div>

            <div className="homepage-bottom">
                <div className="homepage-sales-chartCard">
                    <div className='homepage-sales-chartCard-sevenSales'>
                        <h2>最近7天销售额</h2>
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={sevenSales}>
                                <XAxis dataKey="day" />
                                <YAxis
                                    tickFormatter={(value) => {
                                        return `¥${value / 100}`;
                                    }}
                                />

                                <Tooltip
                                    formatter={(value) => {
                                        return formatCurrency(value);
                                    }}
                                />
                                <CartesianGrid />
                                <Line type="monotone" dataKey="sales" />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="homepage-warningcards">
                        <div className="homepage-warning-card">
                            <div className="title">库存偏低</div>
                            <div className="number">{warningProducts.length}</div>
                        </div>
                        <div className="homepage-warning-card">
                            <div className="title">缺货商品</div>
                            <div className="number">{products.filter(product => product.stock === 0).length}</div>
                        </div>
                    </div>
                </div>
                <div className="homepage-logsCardAndBtns">
                    <div className="homepage-10logs-card">
                        <div className="homepage-10logs-card-title"><h2>最近操作</h2></div>
                        <div className="homepage-10logs-card-info">
                            {recentLogs.length === 0 ? (
                                    <div className="empty">
                                        暂无操作记录
                                    </div>
                                ) :recentLogs.map((log) => {
                                return (
                                    <div className="homepage-eachLog-info" key={log.id}>
                                        <div className="homepage-eachLog-details">
                                            <div className="homepage-eacgLog-user">
                                                {log.operator}
                                            </div>

                                            <div className="homepage-eachLog-action">
                                                {log.action}
                                            </div>
                                             <div className="homepage-eachLog-time">     
                                            {dayjs(log.createdAt).format("MM-DD HH:mm")}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                    </div>

                    <div className="homepage-addUser-btn">
                        {
                            user.role === "超级管理员"&&
                            <button onClick={ () => setShowAddUserModal(true)}>
                                添加新用户
                            </button>
                        }
                        
                        </div>
                </div>
            </div>
            {
                showAddUserModal&&<AddUser 
                close={() => {setShowAddUserModal(false)}}
                users={users}
                loadUsers={loadUsers}
                showToast={showToast}
                />
            }
            {
                toast &&
                <Toast message={toast}/>
            }
        </div>
    );
}