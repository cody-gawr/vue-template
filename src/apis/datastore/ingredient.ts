import { dataURL } from "@/modules/request";
import Axios from "axios";
export function getIngredient(lan: string, id: string) {
    return Axios.get(`${dataURL}api/ingredients/item/${lan}/${id}`);
}