import { authURL } from "@/modules/request";
import Axios from "axios";


export function login(email: string, password: string) {
    return Axios.post(`${authURL}Account/Login`, {
        email,
        password,
    })
}

export function forgot(email: string) {
    return Axios.post(`${authURL}Account/ForgotPassword`, {
        email
    });
}

export function register(email: string, password: string, username: string) {
    return Axios.post(`${authURL}Account/Register`, {
        email,
        password,
        username
    });
}

export function changePassword(username: string, oldpwd: string, newpwd: string) {
    // return request({
    //     url: `${baseURL}api/changePassword`,
    //     method: 'POST',
    //     data: {
    //         username,
    //         oldpwd,
    //         newpwd
    //     },
    // });
}

export function sendMessage(data: { [k: string]: string }) {
    return Axios.post(`${authURL}mail/send`, data);
}