import { orderURL } from "@/modules/request";
import Axios from "axios";

export function addUser(restaurantId: string, tableId: string) {
    return Axios.post(`${orderURL}api/v1/user/adduser`, {
        restaurantId,
        tableId
    });
}

export function removeUser(orderId: string, userId: string) {
    return Axios.post(`${orderURL}api/v1/user/removeUser`, {
        orderId,
        userId
    });
}

export function listUsers(orderId: string) {
    return Axios.post(`${orderURL}api/v1/user/listusers`, {
        orderId,
        details: 0
    });
}

export function detailUser(orderId: string, userId: string) {
    return Axios.post(`${orderURL}api/v1/user/detailuser`, {
        orderId,
        userId
    });
}

export function AcceptUser(orderId: string, userId: string) {
    return Axios.post(`${orderURL}api/v1/user/acceptuser`, {
        orderId,
        userId
    });
}