<template>
<!--    <div class="dashboard">-->

<!--        <v-container class="my-5">-->
            <v-layout row wrap align-content-center >
                <v-flex xs12 sm12 md6 >

                    <v-card class="mx-3 ma-3 " max-width="600" min-width="300" >
                        <v-toolbar  color="primary" dark>
                            <v-toolbar-title>User Profile</v-toolbar-title>
                        </v-toolbar>
                        <v-tabs centered >
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
                                    <v-layout row wrap>
                                        <v-flex class="mx-auto">
                                            <v-avatar size="150" class="grey lighten-5 ma-3">
                                                <img src="https://randomuser.me/api/portraits/men/78.jpg">
                                            </v-avatar>
                                        </v-flex>
                                        <v-flex >
                                            <v-card-text>
                                                <div class="title black--text " >{{ user.first_name}} {{ user.last_name}}</div>
                                                <div class="subtitle-2">{{user.position}}</div>
                                                <div class="subtitle-2">{{user.email}}</div>
                                                <div class="subtitle-2"> О себе:
                                                    <v-card-text>
                                                        {{user.profile}}
                                                    </v-card-text>
                                                </div>

                                            </v-card-text>
                                        </v-flex>
                                    </v-layout>
                                    <v-spacer></v-spacer>
                                    <v-divider></v-divider>
                                    <div class="subtitle-2">{{user.personal_points}}</div>
                                    <div class="subtitle-2">{{user.share_points}}</div>
                                </v-card>
                            </v-tab-item>
                            <v-tab-item>
                                <v-card flat>
                                    <v-card-text>
                                        <p>
                                            Fusce a quam. Phasellus nec sem in justo pellentesque facilisis. Nam eget dui. Proin viverra, ligula sit amet ultrices semper, ligula arcu tristique sapien, a accumsan nisi mauris ac eros. In dui magna, posuere eget, vestibulum et, tempor auctor, justo.
                                        </p>

                                        <p class="mb-0">
                                            Cras sagittis. Phasellus nec sem in justo pellentesque facilisis. Proin sapien ipsum, porta a, auctor quis, euismod ut, mi. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nam at tortor in tellus interdum sagittis.
                                        </p>
                                    </v-card-text>
                                </v-card>
                            </v-tab-item>
                            <v-tab-item>
                                <v-card flat>
                                    <v-card-text>
                                        <EditUser :user="user"></EditUser>

                                    </v-card-text>
                                </v-card>
                            </v-tab-item>
                        </v-tabs>
                    </v-card>

<!--                    {{user}}-->
                </v-flex>
                <v-flex xs12 md6>
                    <v-card
                            max-width="500"
                            class="mx-auto ma-3"
                    >
                        <v-toolbar
                                color="primary"
                                dark
                        >
                            <v-icon>send</v-icon>

                            <v-toolbar-title>Мои переводы</v-toolbar-title>

                            <v-spacer></v-spacer>
                            <span>новый</span>


                            <template >
                                <SharePointsMultitalk :item=user ></SharePointsMultitalk>
<!--                                должен быть не юзер, а рандомный кто-то-->
                            </template>




                        </v-toolbar>
                        <v-list max-height="300" class="overflow-y-auto" >
                            <v-list-item
                                    v-for="item in transactions_from_me"
                                    :key="item.id"


                            >
                                <v-list-item-icon>
                                    <v-icon> star</v-icon>
                                </v-list-item-icon>

                                <v-list-item-content>
                                    <v-list-item-title v-text="get_user_by_id(item.to_user)  "> </v-list-item-title>
                                </v-list-item-content>

                                <v-list-item-content>
                                    <v-list-item-title v-text="get_cat_by_id(item.category) "> </v-list-item-title>
                                </v-list-item-content
                                >
                                <v-list-item-content>
                                    <v-list-item-title v-text="item.amount"> </v-list-item-title>
                                </v-list-item-content>

<!--                                <v-list-item-avatar>-->
<!--                                    <v-img :src="item.avatar"></v-img>-->
<!--                                </v-list-item-avatar>-->
                            </v-list-item>
                        </v-list>
                    </v-card>

                    <v-card
                            max-width="500"
                            max-height="360"
                            class="mx-auto ma-3"
                    >
                        <v-toolbar
                                color="primary"
                                dark
                        >
                            <v-icon>send</v-icon>

                            <v-toolbar-title>Мои зачисления</v-toolbar-title>

                            <v-spacer></v-spacer>

                        </v-toolbar>
                        <v-list max-height="300" class="overflow-y-auto" >
                            <v-list-item
                                    v-for="item in transactions_to_me"
                                    :key="item.id"

                            >
                                <v-list-item-icon>
                                    <v-icon> star</v-icon>
                                </v-list-item-icon>

                                <v-list-item-content>
                                    <v-list-item-title v-text="get_user_by_id(item.from_user) "></v-list-item-title>
                                </v-list-item-content>

                                <v-list-item-content>
                                    <v-list-item-title v-text="get_cat_by_id(item.category)"> </v-list-item-title>
                                </v-list-item-content>

                                <v-list-item-content>
                                    <v-list-item-title v-text="item.amount"> </v-list-item-title>
                                </v-list-item-content>

<!--                                <v-list-item-avatar>-->
<!--                                    <v-img :src="item.avatar"></v-img>-->
<!--                                </v-list-item-avatar>-->
                            </v-list-item>
                        </v-list>
                    </v-card>
                </v-flex>
            </v-layout>
<!--        </v-container>-->


<!--        <v-btn @click="refresh">refresh</v-btn>-->
<!--    </div>-->
</template>

<script>
    import SharePointsMultitalk from "./SharePointsMultitalk";
    import EditUser from "./EditUser";
    export default {
        name: "Main",
        components: {EditUser, SharePointsMultitalk},
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
            }
        }
    }





</script>

<!--<script>-->
<!--    export default {-->
<!--        name: "UserEdit",-->
<!--        props:{-->
<!--            id: Number,-->
<!--            first_name: String,-->
<!--            last_name: String,-->
<!--            status: String,-->
<!--            profile: String,-->
<!--            points: String-->
<!--        },-->
<!--        data(){-->
<!--            return{-->
<!--                del: true,-->
<!--                putuser_id: this.id,-->
<!--                putfirst_name: this.first_name,-->
<!--                putlast_name: this.last_name,-->
<!--                putprofile: this.profile,-->
<!--                putpoints: this.points,-->
<!--                putstatus: this.status,-->
<!--                Rules: [-->
<!--                    v => !!v || 'Field is required',-->
<!--                ],-->
<!--                PointRules: {-->
<!--                    required: value => !!value || 'Field is required',-->
<!--                    num: v => v>=-100 || 'Field must contain only numbers from -100',-->
<!--                    num2: v => v<1000000 || "Hey, it's a fraud!",-->
<!--                }-->

<!--            }-->
<!--        },-->
<!--        methods: {-->
<!--            putusr(){-->
<!--                switch (this.putstatus) {-->
<!--                    case "admin":-->
<!--                        this.putstatus = 1;-->
<!--                        break;-->
<!--                    case "teacher":-->
<!--                        this.putstatus = 2;-->
<!--                        break;-->
<!--                    case "leader":-->
<!--                        this.putstatus = 3;-->
<!--                        break;-->
<!--                    case "student":-->
<!--                        this.putstatus = 4;-->
<!--                        break;}-->

<!--                let is_staff = (this.putstatus != "4");-->
<!--                let user = {-->
<!--                    "id": this.id,-->
<!--                    "first_name": this.putfirst_name,-->
<!--                    "last_name": this.putlast_name,-->
<!--                    "status":this.putstatus,-->
<!--                    "profile": this.putprofile,-->
<!--                    "points": this.putpoints,-->
<!--                    "is_staff": is_staff-->
<!--                };-->

<!--                this.$emit('changeusr', user);-->
<!--            },-->
<!--            -->
<!--        }-->
<!--    }-->
<!--</script>-->

<style scoped>

</style>