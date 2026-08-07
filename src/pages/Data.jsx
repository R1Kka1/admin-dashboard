import './Data.css'
import {
    LineChart,BarChart,Bar,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,ResponsiveContainer 
} from "recharts";
import { Loading } from '../components/Loading';
import { useEffect,useState } from 'react';
import { getList } from '../api/api';
import { formatCurrency } from '../untils/money';

export function Data() {
    const [loading,setLoading] = useState(true);
    const [sevenSales,setSevenSales] = useState ([]);
    const [salesTop,setSalesTop] = useState([]);
    const [orders,setOrders] = useState([]);
    const [users,setUsers] = useState([]);

    async function loadData(){

        setLoading(true);

        try{
            const [
            orderRes,
            salesRes,
            topRes,
            userRes
        ] = await Promise.all([
            getList("/orders"),
            getList("/salesData"),
            getList("/productSales"),
            getList("/users")
        ]);

        setOrders(orderRes.data);
        setSevenSales(salesRes.data);
        setSalesTop(topRes.data);
        setUsers(userRes.data);

        }
        catch(error){
            console.log(error);
        }
        finally{
            setLoading(false);
        }
        
    }

    useEffect(() => { 
        loadData();
    },[]);

    if(loading){
        return <Loading />;
    }
    
    const totalSales = orders.reduce((sum,order) => {
        return sum+order.totalCostCents;
    },0)

    const totalQuantity = orders.flatMap(order => order.products).reduce((sum,product) => {
        return sum+product.quantity;
    },0)


    return (
        <>
            <h1>数据统计页面</h1>
            <div className="todaysData">
                <div className="card">
                    <div className="title">总销售额</div>
                    <div className="number">{formatCurrency(totalSales)}</div>
                </div>

                <div className="card">
                    <div className="title">总订单</div>
                    <div className="number">{orders.length}单</div>
                </div>

                <div className="card">
                    <div className="title">用户总数</div>
                    <div className="number">{users.length}人</div>
                </div>

                <div className="card">
                    <div className="title">商品数量</div>
                    <div className="number">{totalQuantity}件</div>
                </div>
            </div>
            <div className='chartCard'>
    
                <div className='salesCard'>
                    <h2>最近7天销售额</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={sevenSales}>
                            <XAxis dataKey="day"/>
                            <YAxis />

                            <Tooltip />
                            <CartesianGrid />
                            <Line type="monotone" dataKey="sales"/>
                        </LineChart>
                    </ResponsiveContainer>
                    
                </div>

                <div className='salesTopCard'>
                    <h2>商品销量TOP5</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={salesTop}>
                            <XAxis dataKey="name"/>
                            <YAxis />
                            <Tooltip />
                            <CartesianGrid />
                            <Bar dataKey="sales"/>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </>
    );
}