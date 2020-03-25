<template >
    <div>
    <v-toolbar flat color="none">
        <v-app-bar-nav-icon class="ma-3" v-on:click="$router.push('/shop')">
            <v-icon large>navigate_before </v-icon> <span>Назад</span>
        </v-app-bar-nav-icon>
        <v-spacer></v-spacer>

            <Cart></Cart>



    </v-toolbar>
    <v-layout row wrap align-content-center  >


        <v-flex xs12 sm12 md6 align-self-center class="pa-3">
            <v-avatar size="90%" tile>
                <img :src="product.image">
            </v-avatar>
        </v-flex>
        <v-flex xs12 sm12 md6 align-self-center>
          <v-card >
              <v-card-title class="flex-column align-content-start">
                  <span class="headline mb-3">
                      {{product.name}}
                  </span>
                  <span class="subtitle align-self-start">
                      {{product.price}} Б
                  </span>

              </v-card-title>
              <v-card-text >

                  {{product.description}}
              </v-card-text>

              <v-card-actions>
                  <v-btn color="primary" :disabled="product.quantity<1" @click="add_to_cart(product)"> В корзину</v-btn>
                  <v-spacer></v-spacer>
                  <span v-show="product.quantity<1" class="mr-3"> Нет в наличии</span>
              </v-card-actions>

          </v-card>
        </v-flex>


    </v-layout>
    </div>
</template>

<script>
    import Cart from "./Cart";
    export default {
        name: "Product",
        components: {Cart},
        beforeRouteLeave(to, from, next){

            const inShop = to.path.match('/shop');
            if (inShop===null){
                localStorage.removeItem('search');
                localStorage.removeItem('filter');
            }

            next()

        },

        computed:{
            product(){
                // return this.$store.getters.products
                // console.log(this.$route.params.id);

                 return  this.$store.getters.products.find(prod=> prod.id == this.$route.params.id)
                // console.log(i)
                // return i

            }
        },
        methods:{
            add_to_cart(product){
                this.$store.dispatch('add_to_cart', product)
            }
        }


    }
</script>

<style scoped>

</style>