<template>
    <div>
        <v-card
                width="100%"
                class="mx-auto"
        >
            <v-toolbar
                    color="primary"
                    dark
            >
                <v-app-bar-nav-icon></v-app-bar-nav-icon>

                <v-toolbar-title>Входящие</v-toolbar-title>

                <v-spacer></v-spacer>


            </v-toolbar>


            <v-expansion-panels focusable>
                <v-expansion-panel
                        v-for="(order) in orders"
                        :key="order.id"
                >
                    <v-expansion-panel-header>
                        <v-img class="v-avatar mr-3" max-width="50px" src="https://randomuser.me/api/portraits/men/78.jpg"></v-img>
                        <v-card-text>
                            <div class="subheading">
                                Заказ №{{order.id}}<v-icon small :color="getColor(order.active)">fiber_manual_record</v-icon>
                                <span class="float-right grey--text"> {{dateformat(order.created_at)}}</span>

                            </div>
                            <div class="grey--text">{{order.customer.first_name}} {{order.customer.last_name}}</div>

                        </v-card-text>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>

                        <span class='text&#45;&#45;primary'> {{order.products}}</span>

                    </v-expansion-panel-content>
                </v-expansion-panel>
            </v-expansion-panels>

        </v-card>
    </div>
</template>

<script>
    export default {
        name: "Orders",
        beforeCreate() {
            this.$store.dispatch("getallusers");
            this.$store.dispatch("get_orders");
        },

        computed: {
            users_list(){
                return this.$store.getters.users_list
            },
            user(){
                return this.$store.getters.logged_user
            },
            orders(){
                return this.$store.getters.orders
            },
            messages(){
                return null
            }

        },
        methods:{
            dateformat(date){
                let date2 = new Date(date);
                let str = date2.toDateString() + " "+ date2.getHours()+":"+date2.getMinutes()
                return str
            },
            malitoGen(message){
                let author = message.author
                let href = 'mailto:'+author.email+'?subject='+message.topic+'&body='+author.first_name+', спасибо за обращение'
                return href
            },
            getColor(item){
                if(item) return 'red';
                else return 'green'
            },
        }
    }
</script>

<style scoped>

</style>
