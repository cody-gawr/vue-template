export const state = () => ({
    menu: null
})

export const mutations = {
    setMenu(state: any, data: boolean | undefined) {
        if (typeof data === "undefined")
            state.menu = !state.menu;
        else
            state.menu = data;
    }

}
