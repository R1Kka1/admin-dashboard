

export function HomePage(){
    return (
        <div className="Homepage">
            <div className="homepage-sales-cards">
                <div className="homepage-sales-card">
                    <div className="title">总销售额</div>
                    <div className="number">{formatCurrency(totalSales)}</div>
                </div>
                <div className="homepage-sales-card">

                </div>
                <div className="homepage-sales-card">

                </div>
            </div>
        </div>
    );
}