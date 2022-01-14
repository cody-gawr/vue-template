import { orderURL } from "@/modules/request";
import Axios from "axios";
import { AddPaymentModel, EditPaymentModel, PayRegisteredCardModel, PayUnregisteredCardModel } from "./interfaces";


export function addPayment(model: AddPaymentModel , auth: string) {
    return Axios.post(`${orderURL}api/v1/payment/AddPayment`, model , {
        headers: {
            ContentType: 'application/json',
            Authorization: `Bearer ${auth}`
        }    
    })
}

export function editPayment(model: EditPaymentModel) {
    return Axios.post(`${orderURL}v1/payment/EditPayment`, model)
}

export function getPaymentMethodList(customerId: string) {
    return Axios.get(`${orderURL}api/v1/payment/GetPaymentMethodList/${customerId}`)
}

export function removePayments(paymentMethodId: string) {
    return Axios.post(`${orderURL}api/v1/payment/RemovePayments`, {
        paymentMethodId
    })
}

export function payRegisteredCard(model:PayRegisteredCardModel, auth : string) {
    return Axios.post(`${orderURL}api/v1/payment/PayRegisteredCard`, model , {
        headers: {
            ContentType: 'application/json',
            Authorization: `Bearer ${auth}`
        }    
    })
}

export function payUnregisteredCard(model:PayUnregisteredCardModel , auth : string) {
    return Axios.post(`${orderURL}api/v1/payment/PayUnregisteredCard`, model , {
        headers: {
            ContentType: 'application/json',
            Authorization: `Bearer ${auth}`
        }  
    })
}

export function getPaymentList(customerId: string, limit: number) {
    return Axios.get(`${orderURL}v1/payment/GetPaymentList${customerId}`, {
        params: {
            limit
        }
    })
}