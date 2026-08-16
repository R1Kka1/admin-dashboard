import { useEffect,useState } from "react";
import { getList } from "../api/api";
import  type {Product} from "../types/product";

export function useProducts() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    const loadProducts = async () => {
        try {
            const response = await getList<Product[]>("/products");
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