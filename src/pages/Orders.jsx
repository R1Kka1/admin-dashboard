import { getList } from "../api/api";
import { useEffect, useState } from "react";
import './Orders.css'
import { formatCurrency } from "../untils/money";
import dayjs from "dayjs";
import { OrderDetailModal } from "../components/OrderDetailModal";
import { Loading } from "../components/Loading";
import { Toast } from "../components/Toast";

export function Orders() {
    const [orders,setOrders] = useState([]);
    const [showOrderDetailModal,setShowOrderDetailModal] = useState(false);
    const [selectOrder,setSelectOrder] = useState(null);
    const [loading,setLoading] = useState(true);
    const [toast,setToast] = useState("");

    async function loadOrders() {
        setLoading(true);
        try{
            const response = await getList("/orders")
            setOrders(response.data);
        }
        catch(error){
            console.log(error);
        }
        finally{
            setLoading(false);
        }
    }

    useEffect(() => {
        loadOrders();
    },[]);

    function showToast(message){

        setToast(message);

        setTimeout(()=>{
            setToast("");
        },2000);

    }


    if(loading){
        return <Loading />;
    }

    return (
        <div className="">
            <div className="ordersTitles">
                <div className="ordersTitle">订单id</div>
                <div className="ordersTitle">下单时间</div>
                <div className="ordersTitle">商品数量</div>
                <div className="ordersTitle">总价格</div>
                <div className="ordersTitle">操作</div>
            </div>

            <div className="ordersDetails">
                {orders.map((order) => {
                    return (
                        <div key={order.id} className="orderRow">
                            <div>{order.id}</div>
                            <div>{dayjs(order.createdAt).format("YYYY-MM-DD HH:mm:ss")}</div>
                            <div>{order.products.length}</div>
                            <div>{formatCurrency(order.totalCostCents)}</div>
                            <div><button onClick={() => {
                                setSelectOrder(order);
                                setShowOrderDetailModal(true)
                                }}>详情</button></div>
                        </div>
                    );
                })}
            </div>
            {
                showOrderDetailModal&&(
                    <OrderDetailModal 
                    close={() => {setShowOrderDetailModal(false)}}
                    selectOrder={selectOrder}
                    loadOrders={loadOrders}
                    setSelectOrder={setSelectOrder}
                    showToast={showToast}
                    />
                )
            }
            {
                toast &&
                <Toast message={toast}/>
            }
        </div>
    );
}