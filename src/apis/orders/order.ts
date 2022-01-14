import { orderURL } from "@/modules/request";
import Axios from "axios";

export function findOrder() {
    return Axios.get(`${orderURL}api/v1/order/findorder`);
}

export function sentToKitchen(orderId: string) {
    return Axios.post(`${orderURL}api/v1/order/sendtokitchen`, { orderId });
}

export function bill(orderId: string) {
    return Axios.post(`${orderURL}api/v1/order/bill`, { orderId });
}

export function closeAllOrders (orderId) {
    return Axios.post(`${orderURL}api/v1/Order/CloseAllOrders`, {orderId})
}