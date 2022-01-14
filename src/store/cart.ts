import * as dishApi from '@/apis/orders/dish'
import * as orderApi from '@/apis/orders/order'
import * as dishStoreApi from '@/apis/datastore/dish'
import * as userStoreApi from '@/apis/datastore/user'
import * as restaurantApi from '@/apis/datastore/restaurant'

export interface OrderItem extends CartItem {
  orderId: string;
}

export interface CartItem {
  id: string;
  dish: string,
  picture: string;
  amount: number;
  status: number;
  price: number;
  note: string;
  loading: boolean;
  paid: boolean;
  number: number;
  currency: string;
}

export interface CartUser {
  id: string;
  admin: boolean;
  blocked: boolean;
  invited: boolean;
  arrived: boolean;
  checkIn: boolean;
  name: string;
  cart: CartItem[];
  picture: string;
}

export interface Cart {
  orderId: string | null;
  restaurantId: string | null;
  tableId: string | null;
  currency: string | null;
  users: CartUser[];
}

export const state: () => Cart = () => ({
  orderId: null,
  restaurantId: null,
  tableId: null,
  currency: null,
  accountId : null,
  users: []
})

export const mutations = {
  addUser(state: Cart, user: CartUser) {
    let _user = state.users.find(o => o.id == user.id);
    if (_user === undefined)
      state.users.push(user);
    else
      Object.assign(_user, user);
  },

  setLoading(state: Cart, data: { userId: string, id: string, loading: boolean }) {
    let user = state.users.find(o => o.id == data.userId);
    if (user !== undefined) {
      let item = <CartItem>user.cart.find(o => o.id == data.id);
      if (item !== undefined)
        Object.assign(item, { loading: data.loading });
    }
  },

  add(state: Cart, data: { userId: string, item: CartItem }) {
    let user = state.users.find(o => o.id == data.userId);
    if (user !== undefined) {
      let _item = user.cart.find(o => o.id == data.item.id);
      if (typeof _item === "undefined") {
        user.cart.push(data.item);
        Object.assign(state, { currency: data.item.currency });
      }
      else {
        let q = data.item.amount + 1;
        Object.assign(data.item, { amount: q });
      }
    }
  },

  remove(state: Cart, data: { userId: string, id: string }) {
    let user = state.users.find(o => o.id == data.userId);
    if (user !== undefined) {
      let index = user.cart.findIndex(o => o.id == data.id);
      user.cart.splice(index, 1);
    }
  },

  setAmount(state: Cart, data: { userId: string, id: string, amount: number }) {
    let user = state.users.find(o => o.id == data.userId);
    if (user !== undefined) {
      let item = <CartItem>user.cart.find(o => o.id == data.id);
      Object.assign(item, { amount: data.amount });
    }
  },

  increment(state: Cart, data: { userId: string, id: string }) {
    let user = state.users.find(o => o.id == data.userId);
    if (user !== undefined) {
      let item = <CartItem>user.cart.find(o => o.id == data.id);
      let q = item.amount + 1;
      Object.assign(item, { amount: q });
    }
  },

  decrement(state: Cart, data: { userId: string, id: string }) {
    let user = state.users.find(o => o.id == data.userId);
    if (user !== undefined) {
      let item = <CartItem>user.cart.find(o => o.id == data.id);
      if (item.amount > 1) {
        let q = item.amount - 1;
        Object.assign(item, { amount: q });
      }
    }
  },

  setStatus(state: Cart, data: { userId: string, id: string, value: number }) {
    let user = state.users.find(o => o.id == data.userId);
    if (user !== undefined) {
      let item = <CartItem>user.cart.find(o => o.id == data.id);
      Object.assign(item, { status: data.value });
    }
  },

  editNote(state: Cart, data: { userId: string, id: string, note: string }) {
    let user = state.users.find(o => o.id == data.userId);
    if (user !== undefined) {
      let item = <CartItem>user.cart.find(o => o.id == data.id);
      Object.assign(item, { note: data.note });
    }
  },

  setCurrency(state: Cart, currency: string) {
    Object.assign(state, { currency })
  },

  setOrderId(state: Cart, orderId: string) {
    Object.assign(state, { orderId });
  },

  setRestaurantId(state: Cart, restaurantId: string) {
    Object.assign(state, { restaurantId });
  },

  setStripeId(state:Cart, accountId:string) {
    Object.assign(state, {accountId})
  },
  setTableId(state: Cart, tableId: string) {
    Object.assign(state, { tableId });
  }
}
export const actions = {

  addDish({ commit, state, rootState }, item: OrderItem) {
    dishApi.addDish(state.orderId, item.id).then((o) => {
      delete item.orderId;
      if (o.data <= 1)
        commit("add", { userId: rootState.login.userId, item });
      else {
        let u = state.users.find(o => o.id === rootState.login.userId);
        if (u !== undefined) {
          if (u.cart.find(o => o.id == item.id) === undefined)
            commit("add", { userId: rootState.login.userId, item });
          commit("setAmount", { id: item.id, amount: o.data });
        }
      }

    }).catch((e) => {
      console.error(e);
    });
  },

  removeDish({ commit, state, rootState }, id) {
    commit('setLoading', { userId: rootState.login.userId, id, loading: true });
    dishApi.deleteDish(state.orderId, id).then(() => {
      commit("remove", { userId: rootState.login.userId, id });
      commit('setLoading', { userId: rootState.login.userId, id, loading: false });
    }).catch((e) => {
      commit('setLoading', { userId: rootState.login.userId, id, loading: false });
      console.error(e);
    });
  },

  incrementDish({ commit, state, rootState }, id) {
    commit('setLoading', { userId: rootState.login.userId, id, loading: true });
    dishApi.incrementDish(state.orderId, id).then((o) => {
      commit("setAmount", { userId: rootState.login.userId, id, amount: o.data });
      commit('setLoading', { userId: rootState.login.userId, id, loading: false });
    }).catch((e) => {
      commit('setLoading', { userId: rootState.login.userId, id, loading: false });
      console.error(e);
    });
  },

  decrementDish({ commit, state, rootState }, id) {
    commit('setLoading', { userId: rootState.login.userId, id, loading: true });
    dishApi.decrementDish(state.orderId, id).then((o) => {
      commit("setAmount", { userId: rootState.login.userId, id, amount: o.data });
      commit('setLoading', { userId: rootState.login.userId, id, loading: false });
    }).catch((e) => {
      commit('setLoading', { userId: rootState.login.userId, id, loading: false });
      console.error(e);
    });
  },

  confirmDish({ commit, state, rootState }, id) {
    commit('setLoading', { userId: rootState.login.userId, id, loading: true });
    dishApi.confirmDish(state.orderId, id).then((o) => {
      commit("setStatus", { userId: rootState.login.userId, id, value: o.data });
      commit('setLoading', { userId: rootState.login.userId, id, loading: false });
    }).catch((e) => {
      commit('setLoading', { userId: rootState.login.userId, id, loading: false });
      console.error(e);
    });
  },

  unconfirmDish({ commit, state, rootState }, id) {
    commit('setLoading', { userId: rootState.login.userId, id, loading: true });
    dishApi.unconfirmDish(state.orderId, id).then((o) => {
      commit("setStatus", { userId: rootState.login.userId, id, value: o.data });
      commit('setLoading', { userId: rootState.login.userId, id, loading: false });
    }).catch((e) => {
      commit('setLoading', { userId: rootState.login.userId, id, loading: false });
      console.error(e);
    });
  },

  editNoteDish({ commit, state, rootState }, id) {
    commit('setLoading', { userId: rootState.login.userId, id, loading: true });
    dishApi.editDishNote(state.orderId, id, "").then(() => {
      commit("editNote", { userId: rootState.login.userId, id });
      commit('setLoading', { userId: rootState.login.userId, id, loading: false });
    }).catch((e) => {
      commit('setLoading', { userId: rootState.login.userId, id, loading: false });
      console.error(e);
    });
  },

  async findOrder({ commit, state, rootState }) {
    try {
      
      let order = (await orderApi.findOrder()).data;
      commit('setOrderId', order.id);
      commit('setRestaurantId', order.restaurantId);
      commit('setTableId', order.tableId);
      
      let restaurant = (await restaurantApi.getRestaurant('en', order.restaurantId)).data;
      commit('setStripeId' , restaurant.stripeId)

      for (let user of order.users || []) {
        let _user = (await userStoreApi.getDocument(rootState.i18n.locale.locale, user.userId)).data;
        let u: CartUser = {
          id: user.userId,
          admin: user.admin,
          arrived: user.arrived,
          blocked: user.blocked,
          checkIn: user.checkIn,
          invited: user.invited,
          picture: "https://avatars0.githubusercontent.com/u/9064066",
          name: `${_user.profile.name} ${_user.profile.lastname}`,
          cart: [],
        };
        for (let dish of user.dishes || []) {
          let _dish = (await dishStoreApi.getMenuItem(rootState.i18n.locale.locale, dish.dishId)).data;
          commit('setCurrency', _dish.arch.price.currency);
          let d: CartItem = {
            amount: dish.amount,
            id: dish.dishId,
            loading: false,
            paid: dish.paid,
            status: dish.status,
            note: dish.note,
            number: dish.number,

            currency: _dish.arch.price.currency,
            dish: _dish.name[0].value,
            picture: _dish.images[0],
            price: _dish.arch.price.value
          }
          u.cart.push(d);
        }
        commit("addUser", u);
      }
    }
    catch (e) {
      console.log("userStoreApi.getDocument" + JSON.stringify(e))
    }
  }

  // remove user => delete order
}