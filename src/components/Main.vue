<template>
<!--    <div class="dashboard">-->

<!--        <v-container class="my-5">-->
            <v-layout row wrap>
                <v-flex xs12 md6>

                    <v-card class="ma-3" min-width="fit-content">
                        <v-responsive class="pt-4">
                            img
                        </v-responsive>
                        <v-card-text>
                            <div class="title black--text">{{ user.first_name}} {{ user.last_name}}</div>
                            <div class="subtitle-2">postition</div>
                            <div class="subtitle-2">{{user.email}}</div>
                            <div class="subtitle-2"> О себе:
                                <v-card-text>
                                {{user.profile}}
                                </v-card-text>
                            </div>
                            <v-spacer></v-spacer>
                            <v-divider></v-divider>
                            <div class="subtitle-2">{{user.personal_points}}</div>
                            <div class="subtitle-2">{{user.share_points}}</div>
                        </v-card-text>
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

                        </v-toolbar>
                        <v-list>
                            <v-list-item
                                    v-for="item in transactions_from_me"
                                    :key="item.id"

                            >
                                <v-list-item-icon>
                                    <v-icon> star</v-icon>
                                </v-list-item-icon>

                                <v-list-item-content>
                                    <v-list-item-title v-text="get_user_by_id(item.to_user) "> </v-list-item-title>
                                </v-list-item-content>

                                <v-list-item-content>
                                    <v-list-item-title v-text="get_cat_by_id(item.category) "> </v-list-item-title>
                                </v-list-item-content
                                >
                                <v-list-item-content>
                                    <v-list-item-title v-text="item.amount"> </v-list-item-title>
                                </v-list-item-content>

                                <v-list-item-avatar>
                                    <v-img :src="item.avatar"></v-img>
                                </v-list-item-avatar>
                            </v-list-item>
                        </v-list>
                    </v-card>

                    <v-card
                            max-width="500"
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
                        <v-list>
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

                                <v-list-item-avatar>
                                    <v-img :src="item.avatar"></v-img>
                                </v-list-item-avatar>
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
    export default {
        name: "Main",

        data:()=>({

        }),


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
        beforeCreate() {
            this.$store.dispatch("getallusers");
            this.$store.dispatch("get_all_categories");
            this.$store.dispatch("get_transactions");
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