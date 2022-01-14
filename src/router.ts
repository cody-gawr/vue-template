import Vue from 'vue';
import Router from 'vue-router';

import NotFound from "@/views/404.vue";

import Login from "@/views/account/login.vue";
import Register from "@/views/account/register.vue";
import Forgot from "@/views/account/forgot-password.vue"
import EditProfile from "@/views/account/editprofile.vue";

import Home from "@/views/home.vue";
import ResturantList from "@/views/menu/resturant-list.vue";
import ResturantDetail from "@/views/menu/resturantdetail.vue";
import Menu from "@/views/menu/menu.vue"
import DishdetailDetail from "@/views/menu/dishdetail.vue";
import IngredientDetail from "@/views/menu/ingredient.vue";

import Cart from "@/views/orders/cart.vue";
import Checkout from "@/views/orders/checkout.vue";
import QR from "@/views/orders/qr.vue";
import Payment from '@/views/orders/payment.vue';
import AddPayment from '@/views/orders/add-payment.vue';
import PaymentResult from '@/views/orders/payment-result.vue'
import CloseOrder from '@/views/orders/close-order.vue'

import PaymentCash from '@/views/orders/payment-cash.vue'
import PaymentCashResult from '@/views/orders/payment-cash-result.vue'

import About from '@/views/about/about.vue'
import Privacy from '@/views/about/privacy.vue'
import Help from '@/views/about/help.vue'

Vue.use(Router);

export function createRouter() {
    var router = new Router({
        mode: 'history',
        scrollBehavior: () => ({ x: 0, y: 0 }),
        base: process.env.BASE_URL,
        routes: [
            { name: "404", path: '/:lang([a-z]{2})?/404', component: NotFound },
            { name: "login", path: '/:lang([a-z]{2})?/login', component: Login },
            { name: "register", path: '/:lang([a-z]{2})?/register', component: Register },
            { name: "forgot", path: '/:lang([a-z]{2})?/forgot', component: Forgot },
            { name: "restaurants", path: '/restaurants', component: ResturantList },
            { name: "restaurant", path: '/:lang([a-z]{2})?/restaurant/:id', component: ResturantDetail },
            { name: "menu", path: '/:lang([a-z]{2})?/menu/:id', component: Menu },
            { name: "dish", path: '/:lang([a-z]{2})?/dish/:id/:a?', component: DishdetailDetail },
            { name: "ingredient", path: '/:lang([a-z]{2})?/ingredient/:id', component: IngredientDetail },
            { name: "cart", path: '/:lang([a-z]{2})?/cart', component: Cart },
            { name: "checkout", path: '/:lang([a-z]{2})?/checkout', component: Checkout },
            { name: "editprofile", path: '/:lang([a-z]{2})?/editprofile', component: EditProfile },
            { name: "about", path: '/:lang([a-z]{2})?/about', component: About },
            { name: "privacy", path: '/:lang([a-z]{2})?/privacy', component: Privacy },
            { name: "help", path: '/:lang([a-z]{2})?/help', component: Help },
            { name: "home", path: '/:lang([a-z]{2})?/', component: Home },
            { name: "qr", path: '/qr/:id/:key/:tid?', component: QR },
            { name : "payment" , path : '/:lang([a-z]{2})?/payment', component : Payment},
            { name : "add-payment" , path : '/:lang([a-z]{2})?/add-payment' , component : AddPayment},
            { name : "payment-result" , path : '/:lang([a-z]{2})?/payment-result' , component : PaymentResult},
            { name : 'close-order', path : '/:lang([a-z]{2})?/close-order', component : CloseOrder },
            { name : "payment-cash" , path : '/:lang([a-z]{2})?/payment-cash', component : PaymentCash},
            { name : "payment-cash-result", path: '/:lang([a-z]{2})?/payment-cash-result' , component :PaymentCashResult},
            { path: '*', redirect: '404' },
        ]
    });
    return router;
}