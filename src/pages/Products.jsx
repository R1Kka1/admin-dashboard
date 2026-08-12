import './Products.css';
import { useState } from 'react';
import { formatCurrency } from '../untils/money';
import { ProductDetails } from '../components/ProductDetails';
import { AddProductModal } from '../components/AddProductModal';
import { Loading } from '../components/Loading';
import { Toast } from '../components/Toast';
import { getCurrentUser } from '../untils/auth';
import { useProducts } from '../hooks/useProducts';

export function Products() {
    const user = getCurrentUser();
    const [toast,setToast] = useState("");
    const {products,loading,loadProducts} = useProducts();
    const [keyword, setKeyword] = useState("");
    const [selectProduct,setSelectProduct] = useState(null);
    const [showDetail,setShowDetail] = useState(false);
    const [showAddNewProductPop,setShowAddNewProductPop] = useState(false);


    function showToast(message){

        setToast(message);

        setTimeout(()=>{
            setToast("");
        },2000);

    }
    //id计数
    let idCount = 1;

    const filteredProducts = products.filter((product) => {
        return product.name.toLowerCase().includes(keyword.toLowerCase());
    });
    const warningProducts = products.filter((product) => {
        return product.stock < 10;
    });
   
    if(loading){
        return <Loading />
    }

    return (
        <>
            <div className="">
                <div className='pageTitle'>
                    
                    <div className='searchProduct'>
                        <input className="searchInput" placeholder="搜索商品" value={keyword} onChange={(e) => {
                            setKeyword(e.target.value);
                        }}/>

                        
                    </div>
                    

                    <div className='warningProducts'>
                        <p>库存预警：{warningProducts.length} 件</p>
                    </div>
                    <div className='addNewProductBtn'>
                        {
                            ["管理员","超级管理员"].includes(user.role) && 
                            <button onClick={() => {setShowAddNewProductPop(true)}}>添加商品</button>
                        }
                    </div>
                </div>
                
                <div className="productsTitles">
                    <span className="productsTitle">id</span>     
                    <span className="productsTitle">商品名称</span>     
                    <span className="productsTitle">价格</span>     
                    <span className="productsTitle">库存</span>     
                    <span className="productsTitle">状态</span>     
                    <span className="productsTitle">操作</span>     
                </div>

                <div className="productsDetails">
                    
                    {filteredProducts.map((product) => {
                        
                        return (
                            <div key={product.id} className="productRow">
                                <div>{idCount++}</div>
                                <div>{product.name}</div>
                                <div>{formatCurrency(product.priceCents)}</div>
                                <div>{product.stock}</div>
                                <div>
                                    {product.stock === 0 ? (
                                        <span className="out">🔴 缺货</span>
                                    ) : product.stock < 10 ? (
                                        <span className="warning">🟡 库存偏低</span>
                                    ) : (
                                        <span className="normal">🟢 正常</span>
                                    )}
                                </div>
                                <div>
                                    <button onClick={() => {
                                        setSelectProduct(product);
                                        setShowDetail(true);
                                    }}>详情
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                            
                </div>
            </div>
            {
            showDetail &&
            <ProductDetails
                product={selectProduct}
                close={()=>setShowDetail(false)}
                loadProducts={loadProducts}
                setSelectProduct={setSelectProduct}
                showToast={showToast}
                user={user}
            />
            }
            {
                showAddNewProductPop&& <AddProductModal 
                close={() => {setShowAddNewProductPop(false)}}
                loadProducts={loadProducts}
                showToast={showToast}
                user={user}
                />
            }
            {
                toast &&
                <Toast message={toast}/>
            }
        </>
    );
}