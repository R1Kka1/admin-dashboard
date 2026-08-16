import type { Order } from "../types/order";

export function calculateTotalSales(orders: Order[]) {
    return orders.reduce((sum, order) => {
        return sum + order.totalCostCents;
    }, 0);
}

export function calculateTotalQuantity(orders: Order[]) {
    return orders.reduce((sum, order) => {
        return sum + order.products.reduce((total, product) => {
            return total + product.quantity;
        }, 0);
    }, 0);
}