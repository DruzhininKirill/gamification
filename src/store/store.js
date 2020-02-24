import Vue from 'vue'
import Vuex from "vuex"
import axios from "axios";
export const HTTP = axios.create({
    baseURL: 'http://localhost:8000/api/v1/'});

Vue.use(Vuex);

export const store = new Vuex.Store({
    state:{
        users_list:[],
        token_r: localStorage.getItem('auth_token_refresh') || "0",
        token_a: localStorage.getItem('auth_token_access') || "0",
        shop_items:[],
        transactions:[],
        categories:[]



    },
    getters:{
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


        logged_user(state){
            return state.users_list.find(user=> user.id === store.getters.get_id_from_token)
        },
        token_a(state){
            return state.token_a
        },

        loggedIn(state){
            console.log(state.token_a.toString());
            // console.log(state.token == null);
            return state.token_a !== "0";

        },
        get_id_from_token(state){
            const base64url = state.token_a.split('.')[1]
            const base64 = base64url.replace('-','+').replace('-','/');
            return JSON.parse(window.atob(base64)).user_id
        }
    },
    mutations: {

        //adding smth new to lists

        adduser(state, newuser){
            state.users_list.push(newuser)
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
        set_transactions(state, transactions){
            state.transactions = transactions;
        },
        set_categories(state, cats){
            state.categories = cats;
        },
        set_logged_user_id(state, user_id) {
            state.logged_user_id = user_id;
        },
        set_logged_user(state, data) {
            let index = data.findIndex(user => user.id === state.logged_user_id);
            console.log(index);
            state.logged_user = state.users_list[index];
        },
        //changers
        changeuser(state, data){
            let index = state.users_list.findIndex(user => user.id == data.id);
            console.log(index);
            state.users_list.splice(index,1,data)
        },
        from_to_user(state, data){
            let index1 = state.users_list.findIndex(user => user.id == data.from_user);
            let index2 = state.users_list.findIndex(user => user.id == data.to_user);
            console.log(data);
            state.users_list[index1].share_points = Number.parseInt(state.users_list[index1].share_points) - data.amount;
            state.users_list[index2].personal_points = Number.parseInt(state.users_list[index2].personal_points) + data.amount;
        },

        //delete
        deleteuser(state, id){
            const  index = state.users_list.findIndex(user => user.id == id);
            state.users_list.splice(index,1)
        },
        destroyToken(state){
            state.token = "0";
        }

    },
    actions:{

        refreshToken(context){
            return new Promise((resolve, reject)=>
            {
                HTTP.post('auth/token/refresh/', {
                    "refresh" : context.state.token_r

                })
                    .then(response => {
                        console.log(response.data);
                        const token_a = response.data.access;
                        const token_r = response.data.refresh;
                        const base64url = token_a.split('.')[1]
                        const base64 = base64url.replace('-','+').replace('-','/');
                        const user_id = JSON.parse(window.atob(base64)).user_id;
                        context.commit('set_logged_user_id', user_id);
                        localStorage.setItem("auth_token_access", token_a);
                        localStorage.setItem("auth_token_refresh", token_r);
                        context.commit('retrieveToken_r', token_r);
                        context.commit('retrieveToken_a', token_a);

                        resolve(response)
                        // console.log("token!: " + token);

                    })
                    .catch(error =>{
                        console.log(error);
                        // localStorage.setItem("auth_token_access", 0);
                        // localStorage.setItem("auth_token_refresh", 0);
                        //
                        // window.location.reload(true)
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
                        console.log(response)
                        const token_r = response.data.refresh;
                        const token_a = response.data.access;
                        const base64url = token_a.split('.')[1]
                        const base64 = base64url.replace('-','+').replace('-','/');
                        const user_id = JSON.parse(window.atob(base64)).user_id
                        context.commit('set_logged_user_id', user_id);
                        localStorage.setItem("auth_token_refresh", token_r);
                        localStorage.setItem("auth_token_access", token_a);
                        context.commit('retrieveToken_r', token_r);
                        context.commit('retrieveToken_a', token_a);
                        // const loggedUser = credentials.username;



                        resolve(response)
                        // console.log("token!: " + token);

                    })
                    .catch(error =>{
                        console.log(error);
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
                HTTP.get('/transaction/')
                    .then(response => {
                        let data_transactions = Array.from(response.data);
                        context.commit("set_transactions", data_transactions);
                        resolve(response)

                    })
                    .catch(error =>{
                        console.log(error);
                        if (error.response.status === 401) {
                            // context.dispatch('refreshToken');
                            localStorage.setItem("auth_token_access", 0);
                            window.location.reload(true)
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
                        if (error.response.status === 401) {

                            localStorage.setItem("auth_token_access", 0);

                            window.location.reload(true)
                        }

                        console.log(error);
                        reject(error)
                    })
            })

        },



        addpoints: async (context, data) =>{
            HTTP.defaults.headers.common['Authorization'] = "Bearer " + context.state.token_a;
            return new Promise((resolve, reject)=>
            {
                HTTP.post('/transaction/', data)
                    .then(response => {
                        console.log("KIKIKI");
                        console.log(response.data);
                        context.commit("from_to_user", data);
                        resolve(response)

                    })
                    .catch(error =>{
                        console.log(error);
                        if (error.response.status === 401) {
                            localStorage.setItem("auth_token_access", 0);

                            window.location.reload(true)
                        }

                        console.log(error);
                        reject(error)
                    })
            })

        },



        changeuser: async (context, user)=>{
            HTTP.defaults.headers.common['Authorization'] = "Token " + context.state.token;
            let url = '/users/partly/'+user.id+'/';
            console.log(JSON.stringify(user));
            let {status, data} = await HTTP.put(url,user);
            console.log(data);
            if (status == 200){
                context.commit('changeuser', data);
            }else
                console.log("Произашла ошибка: " + JSON.stringify(status));
        },
        deleteuser: async (context, id)=>{
            let url = '/users/'+id+'/';
            let {status} = await HTTP.delete(url);
            if (status == 204){
                context.commit('deleteuser', id);
            }else
                console.log("Произашла ошибка: " + JSON.stringify(status));
        },

        adduser: async (context, user)=>{
            HTTP.defaults.headers.common['Authorization'] = "Token " + context.state.token;
            let {status, data} = await HTTP.post("auth/users/", user);
            console.log(JSON.stringify(data));
            if (status == 201){
                context.commit('adduser', data);
            }else
                console.log("Произашла ошибка: " + JSON.stringify(status));


        },




        watermarker:async (context, fd)=>{
            HTTP.defaults.headers.common['Authorization'] = "Token " + context.state.token;
            return new Promise((resolve, reject)=>
            {
                HTTP.post('watermark/', fd )
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