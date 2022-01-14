import Axios, { AxiosRequestConfig } from "axios";

export default function ({ $axios, redirect, store }) {

    Axios.interceptors.request.use((config: AxiosRequestConfig) => {
        console.log(config.url)
        if (typeof config.headers['_auth'] === "string" && config.headers['_auth'] !== "") {
            config.headers['Authorization'] = `Bearer ${config.headers['_auth']}`
        } else if (typeof store.state.login.auth === "string" && store.state.login.auth !== "") {
            config.headers['Authorization'] = `Bearer ${store.state.login.auth}`;
        }
        return config;
    },
        (error: Error) => {
            Promise.reject(error);
        },
    );
}