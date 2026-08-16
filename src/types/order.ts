export interface Order{
    id:string;
    userId:string;
    createdAt:string
    status:string;
    totalCostCents:number;
    products: {
        productId: string;
        quantity: number;
        estimatedDeliveryTimeMs: number;
    }[];
}