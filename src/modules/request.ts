import axios, { AxiosResponse } from 'axios';

export const authURL: string = "https://auth.addubby.com/";
export const dataURL: string = "https://storage.addubby.com/";
export const orderURL: string = "https://order.addubby.com/";
export const paymentURL : string = "https://secret-dawn-25618.herokuapp.com/";
export const uploadURL = "https://static.addubby.com/";
//export const authURL: string = "http://localhost:5000/";
//export const dataURL: string = "http://localhost:5002/";
//export const orderURL: string = "http://localhost:5001/"

const service = axios.create({
    withCredentials: false,
    timeout: 15000
});


export default service;