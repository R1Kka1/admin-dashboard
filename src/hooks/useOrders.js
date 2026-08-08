import { useEffect,useState } from "react";
import { getList } from "../api/api";

export function useOrders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    const loadOrders = async () => {
        try {
            const response = await getList("/orders");
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