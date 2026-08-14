import { useState } from "react";
import { formatCurrency } from "../untils/money";
import './ChangeProductPriceModal.css';
import { patchObject } from "../api/api";
import { addLog } from "../untils/log";

export function ChangeProductPriceModal({product,close,loadProducts,showToast}) {
    const [newPrice,setNewPrice] = useState(1);
    const oldPrice = product.priceCents;
    const [errors,setErrors] = useState({});

    const validate  = () => {
        const newErrors = {};
        const price = Number(newPrice);

        if(Number.isNaN(price)){
            newErrors.price = "请输入有效的价格";
        }

        if(price <= 0 ){
            newErrors.price = "价格必须大于 0";
        }

        if(newPrice === ""){
            newErrors.price = "价格不能为空";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    async function handleChangePrice() {
        const price = Number(newPrice);

        if(!validate()){
            return ;
        }
    
        try {
            await patchObject(`/products/${product.id}`,{
                priceCents: Math.round(price*100)
            });
            await addLog({
                action: "修改价格",
                target: product.name,
                detail: `${formatCurrency(oldPrice)} -> $${Number(newPrice).toFixed(2)}`
            });
            showToast("✅️价格修改成功");   
            loadProducts();

        } catch  {
            showToast("❌价格修改失败");
        }
    }

    return (
        <div className="product-edit-price-modal">
            <div className="product-edit-price-pop">
                <div className="product-edit-price-popHeader">
                    <h2>修改价格</h2>
                </div>
                <div className="product-edit-price-popDetails">
                    <div>商品名称:{product.name}</div>
                    <div>商品价格:{formatCurrency(product.priceCents)}</div>
                    <input type="number" className="product-edit-price-Input" placeholder="输入价格"
                        value={newPrice}
                        onChange={(e) => {setNewPrice(e.target.value)}}
                    />

                    {errors.price && (
                        <span className="error">{errors.price}</span>
                    )}
                </div>
                <div className="product-edit-price-Btns">
                    <button onClick={handleChangePrice}>修改</button>
                    <button onClick={close}>取消</button>
                </div>
            </div>
            <div>

            </div>
        </div>
    );
}