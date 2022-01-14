export const actions = {
    async nuxtServerInit({ dispatch }, o) {
        console.log("nuxtServerInit")
        await dispatch("login/nuxtServerInit", o)
    }
}
