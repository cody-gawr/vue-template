export const state = () => ({
    restaurantId: null,
    key: null,
    table: null,
    timestamp: null
});

export const mutations = {
    set(state: any, value: any) {
        Object.assign(state, value);
    },

    delete(state: any) {
        Object.assign(state, {
            restaurantId: null,
            key: null,
            table: null,
            timestamp: null
        });
    }
}
