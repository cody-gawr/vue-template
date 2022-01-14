import { dataURL } from "@/modules/request";
import Axios from "axios";
export function getRestaurant(lan: string, id: string) {
    return Axios.get(`${dataURL}api/restaurants/item/${lan}/${id}`);
}

export function getMenu(lan: string, id: string) {
    return Axios.get(`${dataURL}api/restaurants/menu/${lan}/${id}`);
}