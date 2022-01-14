import { orderURL } from "@/modules/request";
import Axios from "axios";

export function addDish(orderId: string, dishId: string) {
    return Axios.post(`${orderURL}api/v1/dish/adddish`, {
        orderId,
        dishId
    });
}

export function deleteDish(orderId: string, dishId: string) {
    return Axios.post(`${orderURL}api/v1/dish/deletedish`, {
        orderId,
        dishId
    });
}

export function listDishes(orderId: string) {
    return Axios.post(`${orderURL}api/v1/dish/listdishes`, {
        orderId,
        details: 0
    });
}

export function detailDish(orderId: string, dishId: string) {
    return Axios.post(`${orderURL}api/v1/dish/detaildish`, {
        orderId,
        dishId,
    });
}

export function editDishNote(orderId: string, dishId: string, note: string) {
    return Axios.post(`${orderURL}api/v1/dish/editdishnote`, {
        note,
        dishId,
        orderId,
    });
}

export function confirmDish(orderId: string, dishId: string) {
    return Axios.post(`${orderURL}api/v1/dish/confirmdish`, {
        orderId,
        dishId
    });
}

export function unconfirmDish(orderId: string, dishId: string) {
    return Axios.post(`${orderURL}api/v1/dish/unconfirmdish`, {
        orderId,
        dishId
    });
}

export function incrementDish(orderId: string, dishId: string) {
    return Axios.post(`${orderURL}api/v1/dish/increment`, {
        orderId,
        dishId
    });
}

export function decrementDish(orderId: string, dishId: string) {
    return Axios.post(`${orderURL}api/v1/dish/decrement`, {
        orderId,
        dishId
    });
}   