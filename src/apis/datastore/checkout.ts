import { dataURL} from "@/modules/request";
import Axios from "axios";

export function purchaseFoods(data : object) {
    return Axios.post('https://powerful-basin-30661.herokuapp.com/paystripe/', data)
}
