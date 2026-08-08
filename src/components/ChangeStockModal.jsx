import './ChangeStockModal.css';
import { addLog } from '../untils/log';
import { useState } from 'react';
import { patchObject } from '../api/api';

export function ChangeStockModal({product,close,loadProducts,showToast}){
    const [newStock,setNewStock] = useState(1);

    const oldStock = product.stock;

    async function handleAdd() {

        if(newStock<=0 || newStock > 9999){
            showToast("❌库存修改失败");
            return;
        }
        try {
            await patchObject(
                `/products/${product.id}`,
                {   
                    stock: product.stock+ Number(newStock)
                }
            );
            addLog({
                operator: "admin",
                action: "修改库存",
                target: product.name,
                detail: `库存：${oldStock} -> 库存：${oldStock+newStock}`
            });
            showToast("✅️库存修改成功");
            await loadProducts();
            
        } catch  {
          showToast("❌库存修改失败");
        }
    }
    async function handleReduce() {
        if(newStock<=0 || newStock > product.stock){
            showToast("❌库存修改失败");
            return;
        }
        try {
            await patchObject(
                `/products/${product.id}`,
                {
                    stock: product.stock - Number(newStock)
                }
            );
            await addLog({
                operator: "admin",
                action: "修改库存",
                target: product.name,
                detail: `库存：${oldStock} -> 库存：${oldStock-newStock}`
            });
            showToast("✅️库存修改成功");
            await loadProducts();

        } catch  {
            showToast("❌库存修改失败");
        }
    }

    return (
        <div className="product-edit-modal">
            <div className="editProductStock">
                <div className="product-edit-popHeader">
                    <h2>修改库存</h2>
                    <button className="product-edit-closeBtn" onClick={close}>
                            X
                    </button>
                </div>
                <div className="product-edit-contentDetails">
                    <div>商品名称:{product.name}</div>
                    <div>商品库存:{product.stock}</div>
                    <input type="number"className="product-edit-Input" placeholder="输入数量"
                        value={newStock}
                        onChange={(e) => setNewStock(Number(e.target.value))}
                    />
                </div>
                <div className="product-edit-Btns">
                    <button onClick={handleAdd}>添加</button>
                    <button onClick={handleReduce}>减少</button>
                    <button onClick={close}>取消</button>
                </div>
            </div>
            <div>
            </div>
        </div>
    );
}