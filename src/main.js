import Vue from 'vue'
import App from './App.vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import 'vue-material-design-icons/styles.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import {store} from "./store/store";
import axios from 'axios'

//Components
import VueRouter from "vue-router";
import Feedback from "./components/Feedback";
import Main from "./components/Main";
import Shop from "./components/Shop";
import Login from "./components/Login";
import Transactions from "./components/Transactions";
import Rating from "./components/Rating";
import Users from "./components/Users";
import Special from "./components/Special";
import UserManagement from "./components/UserManagement";
import SpecialMenu from "./components/SpecialMenu";
import MarketManagement from "./components/MarketManagement";
import Inbox from "./components/Inbox";
import CategoryManagement from "./components/CategoryManagement";
import Product from "./components/Product";
import Orders from "./components/Orders";

Vue.config.productionTip = false;

import VueToastify from "vue-toastify";
Vue.use(VueToastify);

Vue.use(Vuetify);
export default new Vuetify({
  icons: {
    iconfont: 'md', // 'md' || 'mdiSvg' || 'md' || 'fa' || 'fa4'
  },
})

Vue.use(VueRouter);

//сторожевые хуки

const ifNotAuthenticated = (to, from, next) => {
  if (!store.getters.loggedIn) {
    next();
    return
  }
  document.title =to.meta.title;
  next('/')
};

const ifAuthenticated = (to, from, next) => {
  if (store.getters.loggedIn) {
    if(store.getters.users_list.length === 0){
      store.dispatch('getallusers').then(
          next()
      )
    }
    else next();

    return
  }
  next('/login')
};
const ifPermissioned = (to, from, next) => {
  if (store.getters.loggedIn) {
    if (store.getters.users_list.length === 0) {
      store.dispatch('getallusers').then(() => {
        if ((store.getters.logged_user.is_teamlead) || store.getters.logged_user.is_staff) {
          next();
        } else next('/')
      });
    } else {
      if (( store.getters.logged_user.is_teamlead) || store.getters.logged_user.is_staff) {
        next();
        return
      } else next('/')
    }
  }else
  next('/login')
};

const ifStaff = (to, from, next) => {
  if (store.getters.loggedIn) {
    if (store.getters.users_list.length === 0) {
      store.dispatch('getallusers').then(() => {
        if ( store.getters.logged_user.is_staff) {
          next();
        } else next('/special')
      });
    } else {
      if (store.getters.logged_user.is_staff) {
        next();
        return
      } else next('/special')
    }
  }else
    next('/login')
};





const routes = [
  {path: '/', component: Main, beforeEnter: ifAuthenticated, meta: {title: "Главная"}},
  {path: '/users', component: Users, beforeEnter: ifAuthenticated, meta: {title: "Коллеги"}},
  {path: '/shop', component: Shop, beforeEnter: ifAuthenticated,  meta: {title: "Маркетплейс"}},
  {path: '/shop/:id', component: Product, beforeEnter: ifAuthenticated, meta: {title: "lol"}},

  {path: '/rating', component: Rating, beforeEnter: ifAuthenticated, meta: {title: "Рейтинг"}},
  {path: '/transactions', component: Transactions, beforeEnter: ifAuthenticated, meta: {title: "История операций"}},
  {path: '/feedback', component: Feedback, beforeEnter: ifAuthenticated, meta: {title: "Обратная связь"}},



  {path: '/special', component: Special, beforeEnter: ifPermissioned, meta: {title: "Cпециальные возможности"},
    children: [
      {
        path: '',
        component: SpecialMenu,
        meta: {title:"Cпециальные возможности"}
      },
      {
        beforeEnter: ifStaff,
        path: 'usermanagement',
        component: UserManagement,
        meta: {title:"Управление пользователями"}
      },
      {
        beforeEnter: ifStaff,
        path: 'marketmanagement',
        component: MarketManagement,
        meta: {title:"Управление маркетплейсом"}
      },
      {
        beforeEnter: ifStaff,
        path: 'inbox',
        component: Inbox,
        meta: {title:"Почта"}
      },
      {
        beforeEnter: ifPermissioned,
        path: 'promotions',
        component: CategoryManagement,
        meta: {title:"Поощерения"}
      },
      {
        beforeEnter: ifStaff,
        path: 'orders',
        component: Orders,
        meta: {title:"Заказы"}
      },
    ]},



  {path: '/login', component: Login, beforeEnter: ifNotAuthenticated, meta: {title: "Необходима авторизация"}},
];

const router = new VueRouter(
    {
      routes,
      // mode: 'history',
    }
);

//Page Titles
router.beforeEach((to, from, next) => {
  document.title =to.meta.title;
  next()
});



export const HTTP = axios.create({
  baseURL: 'http://localhost:8000/api/v1/',


});


new Vue({
  store: store,
  router: router,
  vuetify: new Vuetify(),
  render: h => h(App),
}).$mount('#app');
