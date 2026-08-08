import { useEffect,useState } from "react";
import { getList } from "../api/api";

export function useProducts() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const loadProducts = async () => {
        try {
            const response = await getList("/products");
            setProducts(response.data);
        } catch (error) {
            console.error("获取商品失败", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadProducts();
    }, []);

    return {
        products,
        loading,
        loadProducts
    };
}