import { useState } from "react";
import { formatCurrency } from "../untils/money";
import './ChangeProductPriceModal.css';
import { patchObject } from "../api/api";

export function ChangeProductPriceModal({product,close,loadProducts,showToast}) {
    const [newPrice,setNewPrice] = useState(1);


    async function handleChangePrice() {
        const price = Number(newPrice);

        if( Number.isNaN(price) ||
            price <= 0 ||
            price > 9999){
            showToast("❌价格修改失败");
            return;
        }
        try {
            await patchObject(`/products/${product.id}`,{
                priceCents: Math.round(price*100)
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