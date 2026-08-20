import { formatCurrency } from "../untils/money";
import "./ProductDetails.css"
import { useState } from 'react';
import { ChangeStockModal } from "./ChangeStockModal";
import { DelProductPop } from "./DelProductPop";
import { ChangeProductPriceModal } from "./ChangeProductPriceModal";
import type { Product } from "../types/product";
import type { User } from "../types/user";
interface ProductDetailsProps {
    product:Product | null;
    close:() => void;
    loadProducts:() => Promise<void>;
    setSelectProduct:React.Dispatch<React.SetStateAction<Product | null>>;
    showToast: (message: string) => void;
    user: User;
}

export function ProductDetails({ 
    product, 
    close,
    loadProducts, 
    setSelectProduct, 
    showToast, 
    user 
}:ProductDetailsProps) {

    const [showChangeStock, setShowChangeStock] = useState(false);
    const [showDelProduct, setShowDelProduct] = useState(false);
    const [showChangePricePop, setShowChangePricePop] = useState(false);
    const canManageProduct = [
        "管理员",
        "超级管理员"
    ].includes(user.role);

    if (!product) {
        return null;
    }
    

    return (
        <div className="modal">

            <div className="modal-pop product-detail-pop">
                <div className="modal-header">
                    <h2>商品详情</h2>

                    <button className="modal-closeBtn" onClick={close}>
                        X
                    </button>

                </div>

                <div className="modal-content">
                    <div className="product-details">
                        <div className="leftPhoto">
                            <img src={`/${product.image}`} />
                        </div>
                        <div className="rightInfo">
                            <div>商品ID:{product.id}</div>
                            <div>商品名称:{product.name}</div>
                            <div>商品价格:{formatCurrency(product.priceCents)}</div>
                            <div>商品库存:{product.stock}</div>
                        </div>
                    </div>
                </div>
                <div className="modal-footer">
                    {
                        canManageProduct && (
                            <>
                                <button
                                    className="changeBtnOnDetail"
                                    onClick={() => setShowChangeStock(true)}
                                >
                                    修改库存
                                </button>

                                <button
                                    className="changeBtnOnDetail"
                                    onClick={() => setShowChangePricePop(true)}
                                >
                                    修改价格
                                </button>

                                <button
                                    className="modal-deleteBtn"
                                    onClick={() => setShowDelProduct(true)}
                                >
                                    删除商品
                                </button>
                            </>
                        )
                    }
                </div>
            </div>

            {
                showChangeStock && (
                    <ChangeStockModal
                        product={product}
                        close={() => setShowChangeStock(false)}
                        loadProducts={loadProducts}
                        showToast={showToast}
                    />
                )
            }

            {
                showDelProduct && (
                    <DelProductPop
                        product={product}
                        close={() => { setShowDelProduct(false) }}
                        loadProducts={loadProducts}
                        setSelectProduct={setSelectProduct}
                        showToast={showToast}
                    />
                )
            }
            {
                showChangePricePop && (
                    <ChangeProductPriceModal
                        product={product}
                        close={() => { setShowChangePricePop(false) }}
                        loadProducts={loadProducts}
                        showToast={showToast}
                    />
                )
            }
        </div>
    );
}