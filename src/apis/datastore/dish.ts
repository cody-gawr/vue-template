import { dataURL } from "@/modules/request";
import Axios from "axios";
export function getDish(lan: string, id: string, arch: string) {
    if (arch === null || arch === undefined || arch === "")
        return Axios.get(`${dataURL}api/dish/item/${lan}/${id}`);
    else
        return Axios.get(`${dataURL}api/dish/item/${lan}/${id}/${arch}`);
}

export function getMenuItem(lan: string, archId: string) {
    return Axios.get(`${dataURL}api/dish/menuitem/${lan}/${archId}`);
}

export function getDocument(lan: string, id: string) {
    return Axios.get(`${dataURL}api/dish/doc/${lan}/${id}`);
}