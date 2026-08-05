import dayjs from "dayjs";
import { formatCurrency } from "../untils/money";
import { useState,useEffect } from "react";
import { getList,patchObject,delObject} from "../api/api";
import "./OrderDetailModal.css";
import { addLog } from "../untils/log";

export function OrderDetailModal({close,selectOrder,loadOrders,setSelectOrder,showToast}) {

    const [products, setProducts] = useState([]);
    const [newStatus,setNewStatus] = useState(selectOrder.status);
    async function loadProducts(){
        try{
            const response = await getList("/products")
            setProducts(response.data);
            
        }catch(error){
            console.log(error);
        }
        
    }
    useEffect(() => {

        loadProducts();
  
    },[]);

    async function handleOrderStatus() {
        try{
            await patchObject(`/orders/${selectOrder.id}`,
                {
                     status: newStatus
                }
            )
            setSelectOrder({
                ...selectOrder,
                status: newStatus
            });
            await addLog({
                operator: "admin",
                action: "新增用户",
                target: selectOrder.id,
                detail: "修改了订单信息"
            });
            showToast("✅️保存成功");
            loadOrders();
            close();
        }
        catch(error){
            showToast("❌保存失败");
            console.log(error);
        }

    }

    async function handleOrderDelete(){
        try{
            await delObject(`/orders/${selectOrder.id}`)
            await addLog({
                operator: "admin",
                action: "新增用户",
                target: selectOrder.id,
                detail: "删除了订单"
            });
            showToast("✅️删除成功");
            loadOrders();
            close();
        }
        catch(error){
            showToast("❌删除失败");
            console.log(error);
        }
    }

    return (
        <div className="order-detail-modal">
            <div className="order-detail-pop">
                <div className="order-detail-header">
                    <div>订单详情</div>
                    <button onClick={close}>X</button>
                </div>
                <div className="order-detail-main">
                    <div className="order-detail-infoList">
                        <div className="order-detail-info">
                            <div>OrderId: {selectOrder.id}</div>
                        </div>
                        <div className="order-detail-info">
                            <div>下单时间：{dayjs(selectOrder.createdAt).format("YYYY-MM-DD HH:mm:ss")}</div>
                        </div>
                        <div className="order-detail-info">
                            <div>商品数量：{selectOrder.products.length}</div>
                        </div>
                        <div className="order-detail-info">
                            <div>总价格：{formatCurrency(selectOrder.totalCostCents)}</div>
                        </div>
                        <div className="order-detail-info">
                            <div>订单状态：{selectOrder.status}</div>
                        </div>
                    </div>
                    <h2>商品列表</h2>  
                    <div className="order-detail-productsList">

                        {
                            selectOrder.products.map((item) => {
                                const product = products.find(
                                    (product) => product.id === item.productId
                                )
                                return (
                                    <div className="order-detail-product" key={item.productId}>
                                        <div className="leftPhoto">
                                            <img src={`/${product?.image || 'loading'}`} />
                                        </div>
                                        <div className="rightInfo">
                                            <div>商品名称: {product?.name || "加载中..."}</div>
                                            <div>商品数量: {item.quantity}</div>
                                            <div>商品价格: {product ? formatCurrency(product.priceCents) : "-"}</div>

                                             <div className="product-actions">
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        }

                        
                    </div>
                </div>
                <div className="order-detail-bottom">
                        <div className="statusOptions">
                            <select value={newStatus} onChange={(e) => {
                                setNewStatus(e.target.value)
                            }}>
                                <option value="待付款">待付款</option>
                                <option value="待发货">待发货</option>
                                <option value="配送中">配送中</option>
                                <option value="已完成">已完成</option>
                                <option value="已取消">已取消</option>
                            </select>
                        </div>

                        <div><button onClick={handleOrderStatus}>保存订单</button></div>
                        <div><button onClick={handleOrderDelete}>删除订单</button></div>
                </div>
            </div>
        </div>
    );
}