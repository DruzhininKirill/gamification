<template>
<!--    <div class="dashboard">-->

<!--        <v-container class="my-5">-->
            <v-layout row wrap align-content-center >
                <v-flex xs12 sm12 md6 >

                    <v-card class="ma-3 "   >
                        <v-toolbar  color="primary" dark>
                            <v-toolbar-title>Личные данные</v-toolbar-title>
                        </v-toolbar>
                        <v-tabs centered mobile-break-point="300px">
                            <v-tab>
                                <v-icon left>person</v-icon>
                                Профиль
                            </v-tab>
                            <v-tab>
                                <v-icon left>book</v-icon>
                                Статистика
                            </v-tab>
                            <v-tab>
                                <v-icon left>edit</v-icon>
                                Изменить
                            </v-tab>

                            <v-tab-item>
                                <v-card flat >
                                    <v-layout column wrap >
                                        <v-flex class="mx-auto d-inline-flex flex-column ">
                                            <v-avatar size="150" class="grey lighten-5 ma-3 align-self-center">
                                                <img src="https://randomuser.me/api/portraits/men/78.jpg">
                                            </v-avatar>
                                            <div class="text-center">
                                            <div class="title black--text " >{{ user.first_name}} {{ user.last_name}}</div>
                                            <div class="subtitle-2">{{user.position}}</div>
                                            <div class="subtitle-2">{{user.email}}</div>
                                            </div>
                                        </v-flex>
                                        <v-flex >
                                            <v-card-text >

                                                <div class="subtitle-2"> О себе:
                                                    <v-card-text>
                                                        {{user.profile}}
                                                    </v-card-text>
                                                </div>

                                            </v-card-text>
                                        </v-flex>
                                    </v-layout>
                                    <v-divider></v-divider>

                                </v-card>
                            </v-tab-item>
                            <v-tab-item>
                                <v-card flat>
                                    <v-card-text>
                                        <v-row align="center" justify="space-around">
                                            <v-card flat class="ma-3" >

                                                <v-card-title>Копилка</v-card-title>
                                                <div style="border-radius: 100%" class="circle-text">
                                                    <span class="stat_data">{{user.personal_points}}</span>
                                                </div >

                                            </v-card>

                                            <v-card flat class="ma-3">
                                                <v-card-title>Спасибо</v-card-title>
                                                <div style="border-radius: 100%" class="circle-text">
                                                    <span class="stat_data">{{user.share_points}}</span>
                                                </div>
                                            </v-card>
                                        </v-row>

                                        <v-row align="center" justify="space-around">
                                            <v-card flat class="ma-3" >

                                                <v-card-title>Рейтинг</v-card-title>
                                                <div style="border-radius: 100%" class="circle-text">
                                                    <span class="stat_data">{{users_list.findIndex(ex=> user ===ex)+1}}</span>
                                                </div >

                                            </v-card>

<!--                                            <v-card flat class="ma-3">-->
<!--                                                <v-card-title>Спасибо</v-card-title>-->
<!--                                                <div style="border-radius: 100%" class="circle-text">-->
<!--                                                    <span class="stat_data">{{user.share_points}}</span>-->
<!--                                                </div>-->
<!--                                            </v-card>-->
                                        </v-row>

                                    </v-card-text>
                                </v-card>
                            </v-tab-item>
                            <v-tab-item>
                                <v-card flat>
                                    <v-card-text>
                                        <EditUser @reload="reload" :user="user"></EditUser>

                                    </v-card-text>
                                </v-card>
                            </v-tab-item>
                        </v-tabs>
                    </v-card>

<!--                    {{user}}-->
                </v-flex >
                <v-flex xs12 md6>
                    <v-card

                            class="ma-3"
                    >
                        <v-toolbar
                                color="purple"
                                dark
                        >
                            <v-icon class="mr-3">publish</v-icon>

                            <v-toolbar-title>Мои переводы</v-toolbar-title>




                        </v-toolbar>
                        <v-list max-height="300" class="overflow-y-auto" >
                            <v-list-item
                                    v-for="item in transactions_from_me"
                                    :key="item.id"



                            >
                                <v-list-item-avatar>
                                    <!--                                    <v-img :src="item.avatar"></v-img>-->
                                    <v-avatar class="grey lighten-5 ma-3 align-self-center">
                                        <img src="https://randomuser.me/api/portraits/men/78.jpg">
                                    </v-avatar>

                                </v-list-item-avatar>

                                <v-list-item-content>
                                    <v-list-item-title v-text="get_user_by_id(item.to_user)  "> </v-list-item-title>
                                </v-list-item-content>

                                <v-list-item-content>
                                    <v-list-item-title v-text="get_cat_by_id(item.category) "> </v-list-item-title>
                                </v-list-item-content
                                >

                                <v-list-item-icon>
                                    <v-list-item-title class="red--text" >
                                        <span v-if="get_cat_by_id(item.category)=='Спасибо'">- </span>
                                        {{item.amount}}
                                    </v-list-item-title>
                                </v-list-item-icon>



<!--                                <v-list-item-avatar>-->
<!--                                    <v-img :src="item.avatar"></v-img>-->
<!--                                </v-list-item-avatar>-->
                            </v-list-item>
                        </v-list>
                    </v-card>

                    <v-card
                            max-height="360"
                            class="ma-3"
                    >
                        <v-toolbar
                                color="purple"
                                dark
                        >
                            <v-icon class="mr-3">get_app</v-icon>

                            <v-toolbar-title>Мои зачисления</v-toolbar-title>

                            <v-spacer></v-spacer>

                        </v-toolbar>
                        <v-list max-height="300" class="overflow-y-auto" >
                            <v-list-item
                                    v-for="item in transactions_to_me"
                                    :key="item.id"

                            >
                                <v-list-item-avatar>
<!--                                    <v-img :src="item.avatar"></v-img>-->
                                    <v-avatar class="grey lighten-5 ma-3 align-self-center">
                                        <img src="https://randomuser.me/api/portraits/men/78.jpg">
                                    </v-avatar>

                                </v-list-item-avatar>

                                <v-list-item-content>
                                    <v-list-item-title v-text="get_user_by_id(item.from_user) "></v-list-item-title>
                                </v-list-item-content>

                                <v-list-item-content>
                                    <v-list-item-title v-text="get_cat_by_id(item.category)"> </v-list-item-title>
                                </v-list-item-content>

                                <v-list-item-icon>
                                    <v-list-item-title class="green--text" >+ {{item.amount}} </v-list-item-title>
                                </v-list-item-icon>


                            </v-list-item>
                        </v-list>
                    </v-card>
                </v-flex>
            </v-layout>

</template>

<script>

    import EditUser from "./EditUser";
    export default {
        name: "Main",
        components: {EditUser},
        data:()=>({
            dialog:false,
        }),
        beforeCreate() {
            this.$store.dispatch("getallusers");
            this.$store.dispatch("get_all_categories");
            this.$store.dispatch("get_transactions");
        },


        computed: {
            users_list(){
                return this.$store.getters.users_list
            },
            categories(){
                return this.$store.getters.categories
            },
            user(){
                return this.$store.getters.logged_user
            },
            transactions_from_me(){
                return this.$store.getters.transactions_from_me
            },
            transactions_to_me(){
                return this.$store.getters.transactions_to_me
            },


        },

        methods:{
            refresh() {
                this.$store.dispatch("refreshToken").then(response => {
                        console.log(response)
                    }
                )
            },
            get_user_by_id(id){
                let user = this.users_list.find(user=> user.id === id);
                return user.first_name + " " + user.last_name
            },
            get_cat_by_id(id){
                let cat = this.categories.find(cat=> cat.id === id);
                return cat.name
            },
            reload(){
                this.user = this.$store.getters.logged_user()
            },

        }
    }





</script>


<style scoped>
    .circle-text{
        /*background: #3F51B5;*/
        text-align: center;
        border-radius: 100%;
        border: solid;
        height: 80px;
        width: 80px;
        margin: 0 auto;

    }
    .stat_data{
        font-size: 30px;
        display: inline-block;
        height: 80px;
        margin-top: 25px;


    }

</style>