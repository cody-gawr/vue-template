export interface AddPaymentModel {
    customerId: string
    card: Card
}

export interface EditPaymentModel {
    paymentId: string
    card: PaymentMethodCardUpdateOptions
    billing: BillingDetailsOptions
}

export interface PayRegisteredCardModel {
    amount: number
    currency: string
    customer: string
    paymentMethod: string
    destination: string
}

export interface PayUnregisteredCardModel {
    Card: Card
    OrderInfo: OrderInfo
    Amount: number
    Currency: string
    Destination: string
    Customer: string
    Register: boolean
}

export interface Card {
    Number: string
    ExpYear: number
    ExpMonth: number
    Cvc: string
}

export interface OrderInfo {
    OrderId: string
    UserId: string
    DishIds: string[]
}

export interface PaymentMethodCardUpdateOptions {
    exp_month: number
    exp_year: number
}

export interface BillingDetailsOptions {
    address?: AddressOptions
    email?: string
    name?: string
    phone?: string
}

export interface AddressOptions {
    city: string
    country: string
    line1: string
    line2: string
    postal_code: string
    state: string
}
export interface BillRequestModel {
    orderId: string
    print: boolean
    send: boolean
}