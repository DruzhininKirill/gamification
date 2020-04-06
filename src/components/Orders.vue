<template>
    <v-layout align-center>
        <v-card
                width="100%"
                class="mx-auto"
        >
            <v-toolbar
                    color="primary"
                    dark
            >
                <v-icon class="mr-3">list_alt</v-icon>

                <v-toolbar-title>Список заказов</v-toolbar-title>

                <v-spacer></v-spacer>


            </v-toolbar>

            <v-card-text class="mb-6 mt-6 text-center" v-if="orders.length === 0">
                Пока заказов нет
            </v-card-text>

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

                        <span class='text&#45;&#45;primary'>
<!--                            {{order.customer}}-->
                            Заказ на сумму: {{order.total}} Б
                            Доставлен: {{order.delivered_at || 'нет'}}
                        </span>


                        <v-row wrap>

                        <v-col>
                            <p class="subtitle-1 text--black"> Товары:</p>

                            <v-list>
                                <v-list-item v-for="item in order.products" v-bind:key="item.id" >
                                    <v-list-item-content>
                                        <v-layout align-center >
                                            <v-img class="v-avatar--tile mr-3"  max-width="40px" :src="item.product.image"></v-img>
                                            <v-card-text>
                                                <div class="subheading">
                                                    {{item.product.name}}

                                                </div>

                                            </v-card-text>
                                        </v-layout>
                                    </v-list-item-content>


                                </v-list-item>
                            </v-list>
                        </v-col>

                        <v-col>
                            <p class="subtitle-1"> Количество:</p>
                            <v-list>
                                <v-list-item v-for="item in order.products" v-bind:key="item.id" >
                                    <v-list-item-content>
                                        <v-layout align-center >

                                            <v-card-text>
                                                <span class="subheading">
                                                    {{item.quantity}}

                                                </span>

                                            </v-card-text>
                                        </v-layout>
                                    </v-list-item-content>

                                </v-list-item>
                            </v-list>
                        </v-col>

                        <v-col>
                            <p class="subtitle-1"> Операции:</p>
                            <div>
                                <v-btn :href=malitoGen(order) >Связаться</v-btn>
                            </div>
                            <v-btn @click="changeorderstatus(order)">{{btntext(order.active)}}</v-btn>
                        </v-col>
                        </v-row>
                        <v-row>

                        </v-row>


                    </v-expansion-panel-content>
                </v-expansion-panel>
            </v-expansion-panels>

        </v-card>
    </v-layout>
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

            btntext(active){
                if (active) return "Завершить";
                else return "Сделать активным"
            },

            dateformat(date){
                let date2 = new Date(date);
                let str = date2.toDateString() + " "+ date2.getHours()+":"+date2.getMinutes()
                return str
            },
            malitoGen(order){
                let customer = order.customer
                let href = 'mailto:'+customer.email+'?subject=Обработка заказа №'+order.id+'&body='+customer.first_name+', спасибо за ' +
                    'заказ в MuranoMarket.'
                return href
            },
            getColor(item){
                if(item) return 'red';
                else return 'green'
            },
            changeorderstatus(order){
                let data = {
                    'id': order.id,
                    'active': !order.active};
                // if (order.active === true){
                //         data.delivered_at = Date.now() //сделать дату на бэке бы по-хорошему
                // }else data.delivered_at = null;

                this.$store.dispatch('change_order_status', data)
            }

        }
    }
</script>

<style scoped>

</style>
