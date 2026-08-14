import './ChangeStockModal.css';
import { addLog } from '../untils/log';
import { useState } from 'react';
import { patchObject } from '../api/api';

export function ChangeStockModal({product,close,loadProducts,showToast}){
    const [newStock,setNewStock] = useState(1);
    const [errors,setErrors] = useState({});
    const oldStock = product.stock;

    const validate  = () => {
        const newErrors = {};

        if(newStock<0){
            newErrors.stock = "库存不能小于 0";
        }

        if(newStock > product.stock){
            newErrors.stock = "请输入正确的数量";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    async function handleAdd() {

        if(!validate()){
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
                action: "修改库存",
                target: product.name,
                detail: `库存：${oldStock} -> 库存：${oldStock+newStock}`
            });
            showToast("✅️库存修改成功");
            close();
            await loadProducts();
            
        } catch  {
          showToast("❌库存修改失败");
        }
    }
    async function handleReduce() {
        if(!validate()){
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
                action: "修改库存",
                target: product.name,
                detail: `库存：${oldStock} -> 库存：${oldStock-newStock}`
            });
            showToast("✅️库存修改成功");
            close();
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
                    {errors.stock && (
                        <span className="error">{errors.stock}</span>
                    )}
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