import {  useState } from "react";
import './Orders.css'
import { formatCurrency } from "../untils/money";
import dayjs from "dayjs";
import { OrderDetailModal } from "../components/OrderDetailModal";
import { Loading } from "../components/Loading";
import { Toast } from "../components/Toast";
import { getCurrentUser } from "../untils/auth";
import { useOrders } from "../hooks/useOrders";
import type { Order } from "../types/order";


export function Orders() {
    const user = getCurrentUser();
    const {orders,loading,loadOrders} = useOrders();
    const [showOrderDetailModal,setShowOrderDetailModal] = useState(false);
    const [selectOrder,setSelectOrder] = useState<Order | null>(null);

    const [toast,setToast] = useState("");

    

    function showToast(message:string){

        setToast(message);

        setTimeout(()=>{
            setToast("");
        },2000);

    }


    if(loading){
        return <Loading />;
    }

    return (
        <div className="ordersTotal">
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
                            <div><button 
                                onClick={() => {
                                setSelectOrder(order);
                                setShowOrderDetailModal(true)
                                }}>详情</button></div>
                        </div>
                    );
                })}
            </div>
            {
                showOrderDetailModal&& selectOrder && user &&(
                    <OrderDetailModal 
                    close={() => {setShowOrderDetailModal(false)}}
                    selectOrder={selectOrder}
                    loadOrders={loadOrders}
                    setSelectOrder={setSelectOrder}
                    showToast={showToast}
                    user={user}
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