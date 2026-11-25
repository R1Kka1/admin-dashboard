import { useEffect,useState } from "react";
import { getList } from "../api/api";
import  type {Product} from "../types/product";

export function useProducts() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    const loadProducts = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await getList<Product[]>("http://localhost:3002/api/products",{
                headers: { Authorization: `Bearer ${token}` }
            });
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