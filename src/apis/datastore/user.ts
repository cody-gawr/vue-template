import { dataURL,uploadURL ,orderURL} from "@/modules/request";
import Axios from "axios";
import { BillRequestModel } from '@/apis/orders/interfaces'

export function updateUser(data: object) {
    return Axios.post(`${dataURL}api/users/update/en`, data);
}

export function getUser(id: string) {
    return Axios.get(`${dataURL}api/users/item/en/${id}`);
}

export function getDocument(lan: string, id: string) {
    return Axios.get(`${dataURL}api/users/doc/${lan}/${id}`);
}

export function uploadAvatar (image_data, auth) {
    return Axios.post(`${uploadURL}api/Content/UploadImage`, image_data , {
        headers: {
            ContentType: 'multipart/form-data',
            Authorization: `Bearer ${auth}`
        }    
    })
}
export function BillRequestAsync(model: BillRequestModel , auth : string) {
    return Axios.post(`${orderURL}api/v1/user/BillRequestAsync`, model, );
}
