const cookieparser = process.server ? require('cookieparser') : undefined
const Cookie = process.client ? require("js-cookie") : undefined;
import { parseJwt } from '@/utils/parse-jwt'
import Axios from "axios";
import { authURL } from '../modules/request';
export const state = () => {
    return {
        auth: null,
        userId: null
    }
}
export const mutations = {
    setAuth(state, auth) {
        Object.assign(state, { auth: auth });
        if (auth === null)
            Object.assign(state, { userId: null });
        else
            Object.assign(state, { userId: parseJwt(auth).id });
    }
}

export const actions = {
    async nuxtServerInit({ commit, dispatch }, { req, res }) {
        if (req.headers.cookie) {
            const jwt = cookieparser.parse(req.headers.cookie).auth;
            if (typeof jwt === "string" && jwt !== "")
                commit('setAuth', jwt);
            else
                commit('setAuth', null);
            var newJwt = "";
            try {
                let o = await Axios.get(`${authURL}Account/Refresh`, {
                    headers: {
                        "_auth": jwt
                    }
                });
                newJwt = o.data;
                commit('setAuth', newJwt);
                res.setHeader('Set-Cookie', `auth=${newJwt};path=/;max-age=86400`);
                await dispatch('cart/findOrder', null, { root: true });
            }
            catch (e) {
                console.log("refresh/findorder" + JSON.stringify(e))
            }
        }
    }
}