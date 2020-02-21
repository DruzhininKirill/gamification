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

Vue.config.productionTip = false;


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
    next()
    return
  }
  document.title =to.meta.title;
  next('/')
};

const ifAuthenticated = (to, from, next) => {
  if (store.getters.loggedIn) {
    next()
    return
  }
  next('/login')
};


const routes = [
  {path: '/', component: Main, beforeEnter: ifAuthenticated, meta: {title: "Главная"}},
  {path: '/shop', component: Shop, beforeEnter: ifAuthenticated, meta: {title: "Маркетплейс"}},
  {path: '/rating', component: Rating, beforeEnter: ifAuthenticated, meta: {title: "Рейтинг"}},
  {path: '/transactions', component: Transactions, beforeEnter: ifAuthenticated, meta: {title: "История операций"}},
  {path: '/feedback', component: Feedback, beforeEnter: ifAuthenticated, meta: {title: "Обратная связь"}},
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
  baseURL: 'http://localhost:8000/api/v1/'

});


new Vue({
  store: store,
  router: router,
  vuetify: new Vuetify(),
  render: h => h(App),
}).$mount('#app');
