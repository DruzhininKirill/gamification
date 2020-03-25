<template>
    <v-dialog v-model="dialog" max-width="500px">
        <template v-slot:activator="{ on }">
            <v-btn class="mr-3" color="green" v-on='on' rounded dark><v-icon >table_chart</v-icon></v-btn>
        </template>
        <v-card >
            <v-form
                    @submit="new_order"
            >
                <v-toolbar flat color="purple" dark>
                    <v-toolbar-title>Корзина</v-toolbar-title>

                </v-toolbar>
                <v-list>
                    <v-list-item v-for="(item, index) in cart.products" v-bind:key="item.id" >

<!--                            <v-avatar tile size="100">-->
<!--                                <v-img :src="item.image"></v-img>-->
<!--                            </v-avatar>-->
<!--                            <div class="subheading">{{item.name}}</div>-->
<!--                            <div class="text&#45;&#45;secondary">{{item.price}}</div>-->
<!--                            <div class="float-right">{{cart.numbers[index]}}</div>-->


                        <v-list-item-content>
                            <v-layout align-center >
                            <v-img class="v-avatar--tile mr-3"  max-width="100px" :src="item.image"></v-img>
                            <v-card-text>
                                <div class="subheading">
                                    {{item.name}}
                                    <span class="float-right"><v-icon small @click="decrease(item)">remove</v-icon>
                                        {{cart.numbers[index]}}
                                    <v-icon small @click="increase(item)">add</v-icon>
                                    </span>
                                </div>
                                <div class="text--secondary">{{item.price}} Б</div>


                            </v-card-text>
                            </v-layout>
                        </v-list-item-content>


                    </v-list-item>
                    <v-divider></v-divider>
                    <span class="text--accent-2">Итог: {{ sum}}</span>

                </v-list>

                <v-card-actions>
                    <v-btn class="ma-2" outlined color="purple" @click="dialog=false"  >Вернуться</v-btn>
                    <v-btn class="ma-2" right outlined color="purple" @click="dialog=false"  >Оформить</v-btn>
                </v-card-actions>


            </v-form>
        </v-card>
    </v-dialog>


</template>

<script>
    export default {
        name: "Cart",
        data:()=>({
            dialog:false,
            selected:[],
        }),

        computed:{
            cart(){
                return this.$store.getters.cart
            },
            sum(){
                let sum = 0;
                this.cart.products.forEach((p,i)=> sum+= p.price*this.cart.numbers[i]);
                return sum;
            }
        },

        methods:{
            new_order(){
                return 0
            },
            increase(item){
                this.$store.dispatch('add_to_cart', item)
            },
            decrease(item){
                this.$store.dispatch('remove_from_cart', item)
            },


        }
    }
</script>

<style scoped>

</style>