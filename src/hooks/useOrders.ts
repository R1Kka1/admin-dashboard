import { useEffect,useState } from "react";
import { getList } from "../api/api";
import type { Order } from "../types/order";

export function useOrders() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);

    const loadOrders = async () => {
        try {
            const response = await getList<Order[]>("/orders");
            setOrders(response.data);
        } catch (error) {
            console.error("获取订单失败", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadOrders();
    }, []);

    return {
        orders,
        loading,
        loadOrders
    };
}