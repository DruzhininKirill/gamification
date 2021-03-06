import Vue from 'vue'
import Vuex from "vuex"
import axios from "axios";
export const HTTP = axios.create({
    baseURL: 'http://localhost:8000/api/v1/'});
    // baseURL: 'https://murano-gamification.herokuapp.com/api/v1/'});


HTTP.interceptors.request.use(function (config) {
    // Do something before request is sent
    return config;
}, function (error) {

    return Promise.reject(error);
});


let refreshTokenPromise;
HTTP.interceptors.response.use(function (response) {
    return response;
}, async (error) => {
    if (error.response.data.detail == 'Given token not valid for any token type') {
        if (!refreshTokenPromise) {
            refreshTokenPromise = store.dispatch('refreshToken');
        }
        await refreshTokenPromise;
        refreshTokenPromise = null;
        error.config.headers.Authorization = "Bearer " + store.getters.token_a;
        return HTTP(error.config);

    }
    if (error.response.data.detail == 'Token is invalid or expired') {
      localStorage.setItem("auth_token_access", 0);
      localStorage.setItem("auth_token_refresh", 0);
      window.location.reload();
    }

     return Promise.reject(error);

});


Vue.use(Vuex);

export const store = new Vuex.Store({
    state:{
        users_list:[],
        token_r: localStorage.getItem('auth_token_refresh') || "0",
        token_a: localStorage.getItem('auth_token_access') || "0",
        shop_items:[],
        transactions:[],
        categories:[],
        logged_user:{},
        feedback_messages:[],
        products:[],
        orders:[],
        cart: JSON.parse(localStorage.getItem('cart')) || {'products':[], 'numbers':[]}


    },
    getters:{

        cart(state){
            return state.cart;
        },
        orders(state){
            return state.orders;
        },

        users_list(state){
            return state.users_list.sort(function(a, b){  return b.personal_points-a.personal_points});
        },
        transactions(state){
            return state.transactions.sort(function(a, b){  return a.created_at-b.created_at});
        },

        transactions_from_me(state){
            return state.transactions.filter(tr => tr.from_user === store.getters.get_id_from_token);
        },
        transactions_to_me(state){
            return state.transactions.filter(tr => tr.to_user === store.getters.get_id_from_token);
        },

        categories(state){
            return state.categories;
        },
        feedback_messages(state){
            return state.feedback_messages;
        },
        products(state){
            return state.products;
        },


        logged_user(state){
            return state.logged_user
        },
        token_a(state){
            return state.token_a
        },

        loggedIn(state){
            return state.token_a !== "0";
        },
        permissioned(state){
            return (state.logged_user.is_staff || state.logged_user.is_teamlead);
        },
        get_id_from_token(state){
            const base64url = state.token_a.split('.')[1]
            const base64 = base64url.replace('-','+').replace('-','/');
            return JSON.parse(window.atob(base64)).user_id
        }
    },
    mutations: {


        clear_cart(state){
            state.cart = {'products':[], 'numbers':[]};
            localStorage.removeItem('cart')
        },

        ten_points_update(state){
            state.users_list.forEach(user => user.share_points = 10 );
        },


        add_to_cart(state, item){
            let index = state.cart.products.findIndex(prod => prod.id === item.id);
            if (index === -1){
                state.cart.products.push(item);
                state.cart.numbers.push(1);
            }
            else state.cart.numbers.splice(index,1, state.cart.numbers[index]+=1);
            localStorage.setItem('cart', JSON.stringify(state.cart))
        },
        remove_from_cart(state, item){
            let index = state.cart.products.findIndex(prod => prod.id === item.id);
            if (state.cart.numbers[index] === 1){
                state.cart.products.splice(index,1);
                state.cart.numbers.splice(index,1);
            }
            else state.cart.numbers.splice(index,1, state.cart.numbers[index]-=1);
            localStorage.setItem('cart', JSON.stringify(state.cart))
        },

        add_user(state, user){
            state.users_list.push(user)
        },
        add_cat(state, cat){
            state.categories.push(cat)
        },
        add_product(state, prod){
            state.categories.push(prod)
        },
        //setters
        retrieveToken_r(state, token){
            state.token_r = token;
        },
        retrieveToken_a(state, token){
            state.token_a = token;
        },

        set_users_list(state, list){
            state.users_list = list;
        },
        set_products(state, list){
            state.products = list;
        },
        set_orders(state, list){
            state.orders = list;
        },
        set_transactions(state, transactions){
            state.transactions = transactions;
        },
        set_categories(state, cats){
            // alert(JSON.stringify(cats));
            cats.forEach(cat => cat.values= cat.values.split(','));
            // alert(JSON.stringify(cats));

            state.categories = cats;
        },
        set_feedback_messages(state, feedback){
            state.feedback_messages = feedback;
        },

        set_logged_user_id(state, user_id) {
            state.logged_user_id = user_id;
        },
        set_logged_user(state, data) {
            let index = data.findIndex(user => user.id === store.getters.get_id_from_token);
            // console.log(index);
            state.logged_user = state.users_list[index];
        },
        //changers
        edit_user(state, data){
            let index = state.users_list.findIndex(user => user.id === data.id);
            // console.log(index);
            state.users_list.splice(index,1,data);
            state.logged_user = data;
        },
        admin_edit_user(state, data){
            let index = state.users_list.findIndex(user => user.id === data.id);
            // console.log(index);
            state.users_list.splice(index,1,data);
        },

        edit_product(state, data){
            let index = state.products.findIndex(prod => prod.id === data.id);
            // console.log(index);
            state.products.splice(index,1,data);
        },
        change_order_status(state, data){
            let index = state.orders.findIndex(order => order.id === data.id);
            state.orders[index].delivered_at = data.delivered_at;
            let updated = state.orders[index].active = data.active;
            state.products.splice(index,1,updated);
        },
        restock_prod(state, data){
            let index = state.products.findIndex(prod => prod.id === data.id);
            state.products[index].in_stock = data.in_stock;
            // state.products.splice(index,1,updated);
        },


        from_to_user(state, data){
            let index1 = state.users_list.findIndex(user => user.id === data.from_user);
            let index2 = state.users_list.findIndex(user => user.id === data.to_user);
            // console.log(data);
            state.users_list[index1].share_points = Number.parseInt(state.users_list[index1].share_points) - data.amount;
            state.users_list[index2].personal_points = Number.parseInt(state.users_list[index2].personal_points) + data.amount;
        },

        //delete
        deleteuser(state, duser){
            const  index = state.users_list.findIndex(user => user===duser);
            state.users_list.splice(index,1)
        },
        delete_product(state, dprod){
            const  index = state.products.findIndex(prod => prod===dprod);
            state.products.splice(index,1)
        },
        destroyToken(state){
            state.token = "0";
        }

    },
    actions:{

        add_to_cart(context, item){
            context.commit('add_to_cart', item)
        },
        remove_from_cart(context, item){
            context.commit('remove_from_cart', item)
        },

        refreshToken(context){
            return new Promise((resolve, reject)=>
            {
                HTTP.post('auth/token/refresh/', {
                    "refresh" : context.state.token_r

                })
                    .then(response => {
                        const token_a = response.data.access;
                        const token_r = response.data.refresh;
                        const base64url = token_a.split('.')[1];
                        const base64 = base64url.replace('-','+').replace('-','/');
                        const user_id = JSON.parse(window.atob(base64)).user_id;
                        context.commit('set_logged_user_id', user_id);
                        localStorage.setItem("auth_token_access", token_a);
                        localStorage.setItem("auth_token_refresh", token_r);
                        context.commit('retrieveToken_r', token_r);
                        context.commit('retrieveToken_a', token_a);
                        resolve(response)

                    })
                    .catch(error =>{
                        reject(error)
                    }
            )
            })
        },


        //Working with TOKEN
        destroyToken(context){
            context.commit('destroyToken');
            window.location.reload(true);
            localStorage.setItem("auth_token_refresh", "0");
            localStorage.setItem("auth_token_access", "0");
            localStorage.removeItem("c_user");

        },

        retrieveToken(context, credentials){
            return new Promise((resolve, reject)=>
            {
                HTTP.post('auth/token/', {
                    email: credentials.email,
                    password: credentials.password
                })
                    .then(response => {
                        // console.log(response)
                        const token_r = response.data.refresh;
                        const token_a = response.data.access;
                        const base64url = token_a.split('.')[1]
                        const base64 = base64url.replace('-','+').replace('-','/');
                        const user_id = JSON.parse(window.atob(base64)).user_id;
                        context.commit('set_logged_user_id', user_id);
                        localStorage.setItem("auth_token_refresh", token_r);
                        localStorage.setItem("auth_token_access", token_a);
                        context.commit('retrieveToken_r', token_r);
                        context.commit('retrieveToken_a', token_a);

                        resolve(response)
                        // console.log("token!: " + token);

                    })
                    .catch(error =>{
                        if (error.response.status >=400 && error.response.status <500 ){
                            Vue.prototype.$vToastify.error({
                                title: "Ошибка доступа",
                                body: "Проверьте правильность введённых данных",
                                theme: 'light'
                            });
                        }
                        else {
                            Vue.prototype.$vToastify.error({
                                title: "Что-то пошло не так...",
                                body: error,
                                theme: 'light'
                            });
                        }
                        reject(error)
                    })
            })
        },
        //USER ACTIONS
        getallusers: async (context) =>{
            HTTP.defaults.headers.common['Authorization'] = "Bearer " + context.state.token_a;
            return new Promise((resolve, reject)=>
            {
                HTTP.get('/users/')
                    .then(response => {
                        let data_users = Array.from(response.data);
                        let c_user = data_users.find(user => user.id === store.getters.get_id_from_token);
                        localStorage.setItem("c_user", c_user.first_name + " " + c_user.last_name);
                        context.commit("set_users_list", data_users);
                        context.commit("set_logged_user", data_users);
                        resolve(response)

                    })
                    .catch(error =>{
                        console.log(error);
                        if (error.response.status === 401) {


                            // window.location.reload(true)
                        }

                        console.log(error);
                        reject(error)
                    })
            })

        },

        get_transactions: async (context) =>{
            HTTP.defaults.headers.common['Authorization'] = "Bearer " + context.state.token_a;
            return new Promise((resolve, reject)=>
            {
                HTTP.get('/transactions/')
                    .then(response => {
                        let data_transactions = Array.from(response.data);
                        context.commit("set_transactions", data_transactions);
                        resolve(response)

                    })
                    .catch(error =>{
                        console.log(error);
                        if (error.response.status === 401) {
                            // localStorage.setItem("auth_token_access", 0);
                            // window.location.reload(true)
                        }

                        console.log(error);
                        reject(error)
                    })
            })

        },
        get_all_categories: async (context) =>{
            HTTP.defaults.headers.common['Authorization'] = "Bearer " + context.state.token_a;
            return new Promise((resolve, reject)=>
            {
                HTTP.get('/categories/')
                    .then(response => {
                        let data_cat = Array.from(response.data);
                        context.commit("set_categories", data_cat);
                        resolve(response)

                    })
                    .catch(error =>{
                        console.log(error);

                        reject(error)
                    })
            })

        },

        sharepoints: async (context) =>{
            HTTP.defaults.headers.common['Authorization'] = "Bearer " + context.state.token_a;
            return new Promise((resolve, reject)=>
            {
                HTTP.post('/sharepoints/')
                    .then(response => {
                        Vue.prototype.$vToastify.success({
                            title: "Баллы успешно зачислены",
                            body: "Все пользователи получили 10Б спасибо",
                            theme: 'light'
                        });
                        console.log(response)
                        // let data_cat = Array.from(response.data);
                        context.commit("ten_points_update");
                        resolve(response)

                    })
                    .catch(error =>{
                        console.log(error);

                        reject(error)
                    })
            })

        },


        addpoints: async (context, data) =>{
            HTTP.defaults.headers.common['Authorization'] = "Bearer " + context.state.token_a;
            return new Promise((resolve, reject)=>
            {
                HTTP.post('/transactions/', data)
                    .then(response => {
                        Vue.prototype.$vToastify.success({
                            title: "Баллы успешно переведены",
                            body: "Перевели с Вашего счета "+ response.data.amount +"Б",
                            theme: 'light'
                        });
                        context.commit("from_to_user", response.data);
                        resolve(response)

                    })
                    .catch(error =>{
                        Vue.prototype.$vToastify.error({
                            title: "Что-то пошло не так...",
                            body: error,
                            theme: 'light'
                        });
                        console.log(error);
                        reject(error)
                    })
            })

        },


        add_super_transaction: async (context, data) =>{
            HTTP.defaults.headers.common['Authorization'] = "Bearer " + context.state.token_a;
            return new Promise((resolve, reject)=>
            {
                HTTP.post('/supertransactions/', data)
                    .then(response => {

                        Vue.prototype.$vToastify.success({
                            title: "Баллы успешно зачислены",
                            body: "Вы великолепны!",

                        });
                        resolve(response)

                    })
                    .catch(error =>{
                        console.log(JSON.stringify(error));
                        Vue.prototype.$vToastify.error({
                            title: "Что-то пошло не так...",
                            body: error,

                        });
                        reject(error)
                    })
            })

        },


        edit_user: async (context, edit) =>{
            HTTP.defaults.headers.common['Authorization'] = "Bearer " + context.state.token_a;
            return new Promise((resolve, reject)=>
            {
                let id = store.getters.get_id_from_token;
                HTTP.patch('/users/'+id+'/', edit)
                    .then(response => {
                        Vue.prototype.$vToastify.success({
                            title: "Изменения сохранены",
                            theme: 'light'
                        });
                        let user = response.data;
                        context.commit("edit_user", user);
                        resolve(response)

                    })
                    .catch(error =>{
                        Vue.prototype.$vToastify.error({
                            title: "Что-то пошло не так...",
                            body: error,
                            theme: 'light'
                        });

                        console.log(error);
                        reject(error)
                    })
            })

        },
        admin_edit_user: async (context, user) =>{

            let edit = {
                'id' : user.id,
                'email':user.email,
                'is_staff': user.is_staff,
                'is_teamlead': user.is_teamlead,
            };

            HTTP.defaults.headers.common['Authorization'] = "Bearer " + context.state.token_a;
            return new Promise((resolve, reject)=>
            {
                HTTP.patch('/users/'+edit.id+'/', edit)
                    .then(response => {
                        Vue.prototype.$vToastify.success({
                            title: "Уровень доступа пользователя успешно изменен",
                            theme: 'light'
                        });
                        context.commit("admin_edit_user", user);
                        resolve(response)

                    })
                    .catch(error =>{
                        Vue.prototype.$vToastify.error({
                            title: "Что-то пошло не так...",
                            body: error,
                            theme: 'light'
                        });

                        console.log(error);
                        reject(error)
                    })
            })

        },




        delete_user: async (context, user)=>{
            HTTP.defaults.headers.common['Authorization'] = "Bearer " + context.state.token_a;
            return new Promise((resolve, reject)=>
            {
                HTTP.delete('/users/'+user.id+'/')
                    .then(response => {
                        Vue.prototype.$vToastify.success({
                            title: "Пользователь удален",
                            body: "Оно и к лучшему",
                            theme: 'light'
                        });
                        context.commit("delete_user", user);
                        resolve(response)

                    })
                    .catch(error =>{
                        Vue.prototype.$vToastify.error({
                            title: "Что-то пошло не так...",
                            body: error,
                            theme: 'light'
                        });
                        console.log(error);
                        reject(error)
                    })
            })

        },

        add_new_user: async (context, user)=>{
            HTTP.defaults.headers.common['Authorization'] = "Bearer " + context.state.token_a;
            return new Promise((resolve, reject)=>
            {
                HTTP.post('/users/', user)
                    .then(response => {
                        Vue.prototype.$vToastify.success({
                            title: "Пользователь "+user.first_name + " "+user.last_name+" успешно добавлен в систему",
                            theme: 'light'
                        });
                        let newuser = response.data;
                        context.commit("add_user", newuser);
                        resolve(response)

                    })
                    .catch(error =>{
                        Vue.prototype.$vToastify.error({
                            title: "Что-то пошло не так...",
                            body: error,
                            theme: 'light'
                        });
                        console.log(error);
                        reject(error)
                    })
            })

        },

        add_new_cat: async (context, cat)=>{
            HTTP.defaults.headers.common['Authorization'] = "Bearer " + context.state.token_a;
            return new Promise((resolve, reject)=>
            {
                HTTP.post('/categories/', cat)
                    .then(response => {
                        Vue.prototype.$vToastify.success({
                            title: "Новая категория "+ cat.name + " добавлена",
                            theme: 'light'
                        });
                        let newcat = response.data;
                        newcat.values= newcat.values.split(',');
                        context.commit("add_cat", newcat);
                        resolve(response)

                    })
                    .catch(error =>{
                        Vue.prototype.$vToastify.error({
                            title: "Что-то пошло не так...",
                            body: error,
                            theme: 'light'
                        });
                        console.log(error);
                        reject(error)
                    })
            })

        },



        send_feedback: async (context, message) =>{
            HTTP.defaults.headers.common['Authorization'] = "Bearer " + context.state.token_a;
            return new Promise((resolve, reject)=>
            {
                HTTP.post('/feedbackmessages/', message)
                    .then(response => {
                        Vue.prototype.$vToastify.success({
                            title: "Сообщение обрабатывается",
                            body: "ожидайте уведомление на почту",
                            theme: 'light'
                        });
                        resolve(response)

                    })
                    .catch(error =>{
                        console.log(error);
                        Vue.prototype.$vToastify.error({
                            title: "Что-то пошло не так...",
                            body: error,
                            theme: 'light'
                        });

                        reject(error)
                    })
            })

        },

        get_feedback: async (context) =>{
            HTTP.defaults.headers.common['Authorization'] = "Bearer " + context.state.token_a;
            return new Promise((resolve, reject)=>
            {
                HTTP.get('/feedbackmessages/')
                    .then(response => {
                        console.log(response.data);
                        let feedback = response.data;
                        context.commit("set_feedback_messages", feedback );
                        resolve(response)

                    })
                    .catch(error =>{
                        console.log(error);

                        reject(error)
                    })
            })

        },


        get_products: async (context) =>{
            HTTP.defaults.headers.common['Authorization'] = "Bearer " + context.state.token_a;
            return new Promise((resolve, reject)=>
            {
                HTTP.get('/products/')
                    .then(response => {
                        console.log(response.data);
                        let products = response.data;
                        context.commit("set_products", products );
                        resolve(response)

                    })
                    .catch(error =>{
                        console.log(error);

                        reject(error)
                    })
            })

        },


        get_excel:async (context, data)=>{
            HTTP.defaults.headers.common['Authorization'] = "Bearer " + context.state.token;
            return new Promise((resolve, reject)=>
            {
                HTTP.post('/excel/', data )
                    .then(response => {
                        Vue.prototype.$vToastify.success({
                            title: "Идёт сбор данных",
                            body: "ожидайте уведомление на почту",
                            theme: 'light'
                        });
                        resolve(response)

                    })
                    .catch(error =>{
                        Vue.prototype.$vToastify.error({
                            title: "Что-то пошло не так...",
                            body: "на почту ничего не пришлём :(",
                            theme: 'light'
                        });
                        console.log(error);
                        reject(error)
                    })
            })
        },

        add_new_product: async (context, message) =>{
            HTTP.defaults.headers.common['Authorization'] = "Bearer " + context.state.token_a;
            return new Promise((resolve, reject)=>
            {
                HTTP.post('/products/', message)
                    .then(response => {
                        Vue.prototype.$vToastify.success({
                            title: "Товар добален",
                            body: "Посетите Murano Market",
                            theme: 'light'
                        });

                        resolve(response)

                    })
                    .catch(error =>{
                        console.log(error);
                        Vue.prototype.$vToastify.error({
                            title: "Что-то пошло не так...",
                            body: error,
                            theme: 'light'
                        });
                        reject(error)
                    })
            })

        },

        edit_product: async (context, edit) =>{
            HTTP.defaults.headers.common['Authorization'] = "Bearer " + context.state.token_a;
            return new Promise((resolve, reject)=>
            {
                HTTP.patch('/products/'+edit.id+'/', edit.data)
                    .then(response => {
                        Vue.prototype.$vToastify.success({
                            title: "Изменения сохранены",
                            theme: 'light'
                        });
                        let prod = response.data;
                        context.commit("edit_product", prod);
                        resolve(response)

                    })
                    .catch(error =>{
                        Vue.prototype.$vToastify.error({
                            title: "Что-то пошло не так...",
                            body: error,
                            theme: 'light'
                        });
                        console.log(error);
                        reject(error)
                    })
            })

        },


        restock_product: async (context, edit) =>{
            HTTP.defaults.headers.common['Authorization'] = "Bearer " + context.state.token_a;
            return new Promise((resolve, reject)=>
            {
                HTTP.patch('/products/'+edit.id+'/', edit)
                    .then(response => {
                        let ans= ''
                        if (edit.in_stock)
                         ans = "Данный товар теперь "+  'доступен'+" в маркете"
                        else  ans = "Данный товар теперь недоступен" + " в маркете"
                        Vue.prototype.$vToastify.success({
                            title: "OK",
                            body: ans,
                            theme: 'light'
                        });
                        // let prod = response.data;
                        context.commit("restock_prod", edit);
                        resolve(response)

                    })
                    .catch(error =>{

                        Vue.prototype.$vToastify.error({
                            title: "Что-то пошло не так... но вероятнее, проблема ток с респонсом",
                            body: error,
                            theme: 'light'
                        });
                        reject(error)
                    })
            })

        },


        delete_product: async (context, product)=>{
            HTTP.defaults.headers.common['Authorization'] = "Bearer " + context.state.token_a;
            return new Promise((resolve, reject)=>
            {
                HTTP.delete('/products/'+product.id+'/')
                    .then(response => {
                        Vue.prototype.$vToastify.success({
                            title: "Товар удален",
                            theme: 'light'
                        });
                        context.commit("delete_prod", product);
                        resolve(response)

                    })
                    .catch(error =>{
                        console.log(error);
                        Vue.prototype.$vToastify.error({
                            title: "Что-то пошло не так...",
                            body: error,
                            theme: 'light'
                        });

                        reject(error)
                    })
            })

        },

        new_order: async (context, message) =>{
            HTTP.defaults.headers.common['Authorization'] = "Bearer " + context.state.token_a;
            return new Promise((resolve, reject)=>
            {
                HTTP.post('/orders/', message)
                    .then(response => {
                        Vue.prototype.$vToastify.success({
                            title: "Ваш заказ успешно оформлен",
                            body: "Администратор свяжется с Вами при необходимости уточнить данные или время доставки",
                            theme: 'light'
                        });
                        context.commit("clear_cart" );
                        resolve(response)

                    })
                    .catch(error =>{
                        Vue.prototype.$vToastify.error({
                            title: "Что-то пошло не так...",
                            body: error.response.data,
                            theme: 'light'
                        });
                        reject(error)
                    })
            })

        },

        get_orders: async (context) =>{
            HTTP.defaults.headers.common['Authorization'] = "Bearer " + context.state.token_a;
            return new Promise((resolve, reject)=>
            {
                HTTP.get('/orders/')
                    .then(response => {
                        console.log(response.data);
                        let orders = response.data;
                        context.commit("set_orders", orders );
                        resolve(response)

                    })
                    .catch(error =>{
                        console.log(error);

                        reject(error)
                    })
            })

        },
        change_order_status: async (context, order) =>{
            HTTP.defaults.headers.common['Authorization'] = "Bearer " + context.state.token_a;
            return new Promise((resolve, reject)=>
            {
                HTTP.patch('/orders/'+order.id+'/', order)
                    .then(response => {
                        Vue.prototype.$vToastify.success({
                            title: "Статус заказа изменен",
                            theme: 'light'
                        });
                        let upd = response.data;
                        context.commit("change_order_status", upd);
                        resolve(response)

                    })
                    .catch(error =>{
                        Vue.prototype.$vToastify.error({
                            title: "Что-то пошло не так...",
                            body: error,
                            theme: 'light'
                        });
                        reject(error)
                    })
            })

        },




        watermarker:async (context, fd)=>{
            HTTP.defaults.headers.common['Authorization'] = "Token " + context.state.token;
            return new Promise((resolve, reject)=>
            {
                HTTP.post('watermark/', fd,
                    { headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    })
                    .then(response => {
                        console.log(response.data);
                        resolve(response)

                    })
                    .catch(error =>{
                        console.log(error);
                        reject(error)
                    })
            })
        },

    }

});