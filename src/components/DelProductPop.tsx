import "./DelProductPop.css";
import { delObject } from "../api/api";
import { addLog } from "../untils/log";
import type { Product } from "../types/product";
import type { Dispatch, SetStateAction } from "react";
import "../styles/modal.css";

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
        <div className="modal">
            <div className="modal-pop">
                <div className="modal-header">
                    <h2>确定要删除商品吗?</h2>
                </div>
                <div className="modal-content">
                    <div>商品ID:{product.id}</div>
                    <div>商品名称:{product.name}</div>
                </div>
                <div className="modal-footer">
                    <button className="modal-deleteBtn" onClick={handleDelete}>确定</button>
                    <button className="modal-cancelBtn" onClick={close}>取消</button>
                </div>
            </div>
            <div>
            </div>
        </div>
    );
}