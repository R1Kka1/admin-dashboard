import "./DelProductPop.css";
import { delObject } from "../api/api";
import { addLog } from "../untils/log";
import type { Product } from "../types/product";
import type { Dispatch, SetStateAction } from "react";

interface DelProductProps{
    product:Product;
    close:() => void;
    loadProducts:() => Promise<void>;
    setSelectProduct:React.Dispatch<React.SetStateAction<Product | null>>;
    showToast:(message:string) => void;
}
export function DelProductPop ({product,close,loadProducts,setSelectProduct,showToast}:DelProductProps) {


    async function handleDelete(){
        try{
            await delObject(`/products/${product.id}`);
            await addLog({
                action: "删除商品",
                target: product.name,
                detail: "删除商品"
            });
            showToast("✅️商品删除成功");
            await loadProducts();
            setSelectProduct(null);
            close(); 
        }catch{
            showToast("❌商品删除失败");
        }
    }    
    return (
        <div className="product-del-modal">
            <div className="delProduct">
                <h2>确定要删除商品吗?</h2>
                <div className="product-del-detail">
                    <div>商品ID:{product.id}</div>
                    <div>商品名称:{product.name}</div>
                </div>
                <div className="product-del-Btns">
                    <button onClick={handleDelete} className="del-product-btn">确定</button>
                    <button onClick={close}>取消</button>
                </div>
            </div>
            <div>
            </div>
        </div>
    );
}