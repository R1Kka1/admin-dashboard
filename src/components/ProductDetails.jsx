import { formatCurrency } from "../untils/money.js";
import "./ProductDetails.css"
import { useState } from 'react';
import { ChangeStockModal } from "./ChangeStockModal.jsx";
import { DelProductPop } from "./DelProductPop.jsx";
import { ChangeProductPriceModal } from "./ChangeProductPriceModal.jsx";


export function ProductDetails({ product, close, loadProducts, setSelectProduct, showToast, user }) {

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

            <div className="productDetails">
                <div className="popHeader">
                    <h2>商品详情</h2>

                    <button className="closeBtn" onClick={close}>
                        X
                    </button>

                </div>

                <div className="contentDetails">

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
                <div className="cudrBtnsOnDetail">
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
                                    className="delBtnOnDetail"
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