import { useState } from "react";
import { formatCurrency } from "../untils/money";
import './ChangeProductPriceModal.css';
import { patchObject } from "../api/api";
import { addLog } from "../untils/log";
import { isNumber, minNumber, required,validate } from "../untils/validate";
import type {ValidationRule} from '../untils/validate';
import type { Product } from "../types/product";
import "../styles/modal.css";

interface ChangeProductPriceModalProps{
    product:Product;
    close:() => void;
    loadProducts:() => Promise<void>;
    showToast:(message:string) => void;
}

export function ChangeProductPriceModal({product,close,loadProducts,showToast}:ChangeProductPriceModalProps) {

    const oldPrice = product.priceCents;
    const [errors,setErrors] = useState<Record<string,string>>({});
    const [formData,setFormData] = useState({
        newPrice:"",
    });

    type ChangeProductPriceField = "newPrice";
    const rules:Record<ChangeProductPriceField,ValidationRule[]> = {
        newPrice: [
            (value) => required(value,"价格不能为空"),
            (value) => minNumber(value,0,"价格不能小于 0"),
            (value) => isNumber(value,"请输入有效的价格"),
        ]
    };

   

    async function handleChangePrice() {
        const newErrors = validate(formData, rules);
        setErrors(newErrors);
        if (Object.keys(newErrors).length > 0) {
            return;
        }

    
        try {
            await patchObject(`/products/${product.id}`,{
                priceCents: Math.round(Number(formData.newPrice)*100)
            });
            await addLog({
                action: "修改价格",
                target: product.name,
                detail: `${formatCurrency(oldPrice)} -> $${Number(formData.newPrice).toFixed(2)}`
            });
            showToast("✅️价格修改成功");   
            await loadProducts();

        } catch  {
            showToast("❌价格修改失败");
        }
    }

    return (
        <div className="modal">
            <div className="modal-pop">
                <div className="modal-header">
                    <h2>修改价格</h2>
                    <button className="modal-closeBtn" onClick={close}>
                        X
                    </button>
                </div>
                <div className="modal-content">
                    <div>商品名称:{product.name}</div>
                    <div>商品价格:{formatCurrency(product.priceCents)}</div>
                    <div className="modal-form-item">
                        <input type="number" placeholder="输入价格"
                        value={formData.newPrice}
                        onChange={(e) => {setFormData({
                            ...formData,
                            newPrice:e.target.value,
                        })}}
                    />
                    </div>
                    {errors.newPrice && (
                        <span className="error">{errors.newPrice}</span>
                    )}
                </div>
                <div className="modal-footer">
                    <button className="modal-saveBtn" onClick={handleChangePrice}>修改</button>
                    <button className="modal-cancelBtn" onClick={close}>取消</button>
                </div>
            </div>
        </div>
    );
}