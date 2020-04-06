<template>
    <v-dialog v-model="dialog" max-width="500px" >
        <template v-slot:activator="{ on }">

                <v-app-bar-nav-icon class="ma-3" v-on="on">
                    <v-badge
                            color="green"
                            :content="cart.numbers.reduce((a, b) => a + b, 0)"
                            :value="cart.numbers.reduce((a, b) => a + b, 0)"

                    >
                    <v-icon large>shopping_cart </v-icon>
                     </v-badge>
                </v-app-bar-nav-icon>


        </template>
        <v-card >
            <v-form
                    @submit="new_order"
            >
                <v-toolbar flat color="purple" dark>
                    <v-toolbar-title>Корзина</v-toolbar-title>

                </v-toolbar>
                <v-list v-if="cart.products.length>0">
                    <v-list-item v-for="(item, index) in cart.products" v-bind:key="item.id" >
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
                    <div class="text--accent-1 mr-6 float-right">Итог: {{ sum}}</div>

                </v-list>

                <v-card-text v-else class="text-center mt-5 mb-5">
                    <v-icon large>shop</v-icon>
                    <h3>Ваша корзина пуста</h3>
                </v-card-text>



                <v-card-actions>
                    <v-btn class="ma-2" outlined color="purple" @click="dialog=false"  >Вернуться</v-btn>
                    <v-btn class="ma-2" right outlined color="purple" type="submit"  >Оформить</v-btn>
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
                let order = this.cart.products;
                let data = {'products':[]};
                order.forEach((product, i) => data.products.push({'product':product.id, 'quantity' : this.cart.numbers[i]}));
                this.$store.dispatch("new_order", data)
                this.dialog = false;
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