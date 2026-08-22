import './ChangeStockModal.css';
import { addLog } from '../untils/log';
import { useState } from 'react';
import { patchObject } from '../api/api';
import { minNumber, validate ,maxNumber, required} from '../untils/validate';
import type {ValidationRule} from '../untils/validate';
import "../styles/modal.css";
import type { Product } from "../types/product";
interface ChangeStockModalProps{
    product : Product;
    close:() => void;
    loadProducts:() => Promise<void>;
    showToast:(message: string) => void;
}
export function ChangeStockModal({product,close,loadProducts,showToast}:ChangeStockModalProps){
    const [errors,setErrors] = useState<Record<string,string>>({});
    const oldStock = product.stock;
    
    const [formData,setFormData] = useState({
        newStock:"",
    });

    type ChangeStockModalField =| "newStock";
    const addRules:Record<ChangeStockModalField,ValidationRule[]> = {
        newStock: [
            (value) => required(value, "此项不能为空"),
            (value) => minNumber(value, 0, "库存不能小于 0"),
        ],
    };
    const reduceRules:Record<ChangeStockModalField,ValidationRule[]> = {
        newStock: [
            (value) => required(value, "此项不能为空"),
            (value) => minNumber(value, 0, "库存不能小于 0"),
            (value) => maxNumber(value, product.stock, "减少数量不能超过当前库存"),
        ],
    };

    async function handleAdd() {

        const newErrors = validate(formData, addRules);
        setErrors(newErrors);
        if (Object.keys(newErrors).length > 0) {
            return;
        }

        const amount = Number(formData.newStock);

        try {
            await patchObject(
                `/products/${product.id}`,
                {   
                    stock: oldStock + amount,
                }
            );
            addLog({
                action: "修改库存",
                target: product.name,
                detail: `库存：${oldStock} -> 库存：${oldStock + amount}`
            });
            showToast("✅️库存修改成功");
            close();
            await loadProducts();
            
        } catch  {
          showToast("❌库存修改失败");
        }
    }
    async function handleReduce() {

        const newErrors = validate(formData, reduceRules);
        setErrors(newErrors);
        if (Object.keys(newErrors).length > 0) {
            return;
        }

        const amount = Number(formData.newStock);

        try {
            await patchObject(
                `/products/${product.id}`,
                {
                    stock: oldStock - amount,
                }
            );
            await addLog({
                action: "修改库存",
                target: product.name,
                detail: `库存：${oldStock} -> 库存：${oldStock - amount}`
            });
            showToast("✅️库存修改成功");
            close();
            await loadProducts();

        } catch  {
            showToast("❌库存修改失败");
        }
    }

    return (
        <div className="modal">
            <div className="modal-pop">
                <div className="modal-header">
                    <h2>修改库存</h2>
                    <button className="modal-closeBtn" onClick={close}>
                        X
                    </button>
                </div>
                <div className="modal-content change-stock-content">
                    <div>商品名称:{product.name}</div>
                    <div>商品库存:{product.stock}</div>
                    <div className="modal-form-item">
                        <input type="number" placeholder="输入数量"
                            value={formData.newStock}
                            onChange={(e) => {setFormData({
                                ...formData,
                                newStock:e.target.value,
                            })}}
                        />
                    </div>
                    {errors.newStock && (
                        <span className="error">{errors.newStock}</span>
                    )}
                </div>
                <div className="modal-footer">
                    <button className="modal-addBtn" onClick={handleAdd}>添加</button>
                    <button className="modal-reduceBtn" onClick={handleReduce}>减少</button>
                    <button className="modal-cancelBtn" onClick={close}>取消</button>
                </div>
            </div>
            <div>
            </div>
        </div>
    );
}