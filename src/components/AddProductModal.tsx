import { addLog } from "../untils/log";
import { useState } from "react";
import "./AddProductModal.css";
import { ChangeMessage } from "./ChangeMessage";
import { postObject } from "../api/api";
import { minNumber, required,validate,ValidationRule } from "../untils/validate";
interface AddProductProps {
    close:() => void;
    loadProducts:() => Promise<void>;
    showToast: (message: string) => void;
}

export function AddProductModal({ close, loadProducts,showToast}:AddProductProps) {
    const [result, setResult] = useState<"success" | "fail">("success");
    const [showAddProductMessage, setShowAddProductMessage] = useState(false);
    const [errors,setErrors] = useState<Record<string,string>>({});
    const [formData, setFormData] = useState({
        newProductName: "",
        newProductPrice: "",
        newProductStock: "",
    });

    type AddProductField =
    | "newProductName"
    | "newProductPrice"
    | "newProductStock";
    const rules :Record<AddProductField, ValidationRule[]> = {
        newProductName : [
            (value) => required(value,"商品名不能为空"),
        ],
        newProductPrice : [
            (value) => required(value,"价格不能为空"),
            (value) => minNumber(value,0,"价格不能小于 0")
        ],
        newProductStock : [
            (value) => required(value,"库存不能为空"),
            (value) => minNumber(value,0,"库存不能小于 0")
        ]
    };

    

    async function handleAddProduct() {

        const newErrors = validate(formData, rules);
        setErrors(newErrors);
        if (Object.keys(newErrors).length > 0) {
            return;
        }

        const product = {
            name: formData.newProductName,
            priceCents: Math.round(Number(formData.newProductPrice) * 100),
            image: "images/products/women-striped-beach-dress.jpg",
            rating: {
                stars: 0,
                count: 0
            },
            stock: Number(formData.newProductStock),
            keywords: []
        };
        try {
            await postObject("/products",product);  
            await addLog({
                action: "新增商品",
                target: formData.newProductName,
                detail: `新增商品，价格$${Number(formData.newProductPrice).toFixed(2)}，库存${formData.newProductStock}`
            });
            showToast("✅️商品添加成功");
            await loadProducts();
            close();
        }
        catch (error) {
            console.log(error);
            setResult("fail")
        }
    }

    function handleReset() {
        setFormData({
            newProductName: "",
            newProductPrice: "",
            newProductStock: "",
        });

        setErrors({});
    }



    return (
        <div className="product-add-modal">
            <div className="product-add-pop">
                <div className="product-add-header">
                    <div><h2>添加新商品</h2></div>
                    <div><button onClick={close}>X</button></div>
                </div>
                <div className="product-add-main">
                    <div className="form-item">

                        <label>商品名称</label>
                        <input
                            placeholder="请输入商品名称"
                            type="text"
                            value={formData.newProductName}
                            onChange={(e) => {
                                setFormData({
                                    ...formData,
                                    newProductName: e.target.value,
                                });
                            }}
                        />

                        {errors.newProductName && (
                            <span className="error">{errors.newProductName}</span>
                        )}
                    </div>


                    <div className="form-item">
                        <label>商品价格</label>
                        <input
                            placeholder="请输入商品价格"
                            type="number"
                            value={formData.newProductPrice}
                            onChange={(e) => {
                                setFormData({
                                    ...formData,
                                    newProductPrice: e.target.value,
                                });
                            }}
                        />

                        {errors.newProductPrice && (
                            <span className="error">{errors.newProductPrice}</span>
                        )}
                    </div>


                    <div className="form-item">
                        <label>商品库存</label>
                        <input
                            placeholder="请输入商品库存"
                            type="number"
                            value={formData.newProductStock}
                            onChange={(e) => {
                                setFormData({
                                    ...formData,
                                    newProductStock:e.target.value,
                                });
                            }}
                        />

                        {errors.newProductStock && (
                            <span className="error">{errors.newProductStock}</span>
                        )}
                    </div>
                </div>
                <div className="product-add-bottom">
                    <button className="primary" onClick={handleAddProduct}>添加</button>
                    <button onClick={handleReset}>重置</button>
                    <button onClick={close}>取消</button>
                </div>
            </div>
            {
                showAddProductMessage && <ChangeMessage
                    result={result}
                    close={() => { setShowAddProductMessage(false) }}
                />
            }

        </div>
    );
}