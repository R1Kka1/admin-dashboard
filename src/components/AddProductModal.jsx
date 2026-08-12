import { addLog } from "../untils/log";
import { useState } from "react";
import "./AddProductModal.css";
import { ChangeMessage } from "./ChangeMessage";
import { postObject } from "../api/api";
import { formatCurrency } from "../untils/money";

export function AddProductModal({ close, loadProducts,showToast,user}) {
    const [newProductName, setNewProductName] = useState("");
    const [newProductPrice, setNewProductPrice] = useState(1);
    const [newProductStock, setNewProductStock] = useState(1);
    const [result, setResult] = useState("");
    const [showAddProductMessage, setShowAddProductMessage] = useState(false);
    

    async function handleAddProduct() {
        if (newProductName === "" || (newProductPrice <= 0 || newProductPrice > 9999) || newProductStock < 0) {
            setResult("fail");
            setShowAddProductMessage(true);
            return;
        }

        const product = {
            name: newProductName,
            priceCents: Math.round(Number(newProductPrice) * 100),
            image: "images/products/women-striped-beach-dress.jpg",
            rating: {
                stars: 0,
                count: 0
            },
            stock: Number(newProductStock),
            keywords: []
        };
        try {
            await postObject("/products",product);  
            await addLog({
                action: "新增商品",
                target: newProductName,
                detail: `新增商品，价格$${Number(newProductPrice).toFixed(2)}，库存${newProductStock}`
            });
            showToast("✅️商品添加成功");
            await loadProducts();
            close();
        }
        catch (error) {
            console.log(error);
        }
    }

    function handleReset() {
        setNewProductName("");
        setNewProductPrice(1);
        setNewProductStock(1);
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
                            value={newProductName}
                            onChange={(e) => {
                                setNewProductName(e.target.value);
                            }}
                        />
                    </div>


                    <div className="form-item">
                        <label>商品价格</label>
                        <input
                            placeholder="请输入商品价格"
                            type="number"
                            value={newProductPrice}
                            onChange={(e) => {
                                setNewProductPrice(e.target.value);
                            }}
                        />
                    </div>


                    <div className="form-item">
                        <label>商品库存</label>
                        <input
                            placeholder="请输入商品库存"
                            type="number"
                            value={newProductStock}
                            onChange={(e) => {
                                setNewProductStock(e.target.value);
                            }}
                        />
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