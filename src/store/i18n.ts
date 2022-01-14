const def = {
    name: "English",
    icon: "en",
    locale: "en"
}
export const state = () => ({
    locales: [
        {
            name: "English",
            icon: "en",
            locale: "en"
        },
        // {
        //     name: "Chinese",
        //     icon: "cn",
        //     locale: "zh"
        // },
        {
            name: "Japanese",
            icon: "ja",
            locale: "ja"
        },
        // {
        //     name: "Korean",
        //     icon: "ko",
        //     locale: "ko"
        // },
        {
            name: "Italian",
            icon: "it",
            locale: "it"
        }
    ],
    locale: def
})

export const mutations = {
    SET_LANG(state, locale) {
        let l = state.locales.find(o => o.locale === locale);
        if (l !== null && l !== undefined)
            state.locale = l;
        else
            state.locale = def;
        //saveLanguage(lang);
    }
}

export const actions = {
    storeLanguage({ commit }, lang: any) {
        commit("SET_LANG", lang)
    },
}