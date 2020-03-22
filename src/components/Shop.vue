<template>
    <v-layout column align-center>
        <v-layout column class="align-center ">
            <div class="text-center ma-3"  >
                <h1>Murano Marketplace</h1>
                <div class="subtitle-1" style="max-width: 800px">
                    Первая партия айтемов уже готова к отгрузке на ваши столы!
                </div>
            </div>
        </v-layout>
        <v-layout row wrap >

            <v-flex xs12 sm6 md4 lg3 v-for="product in products" :key="product.id">
                <v-hover class="ma-3 text-center" v-slot:default="{ hover }">
<!--                <v-card class="text-center ma-3  " flat  link :to="'shop/'+product.id">-->
                <v-card :class=" {'on-hover': hover } " flat  link :to="'shop/'+product.id">


                    <v-responsive class="pt-4">


                        <v-avatar  size="200" tile>
                            <img :src="product.image">
                        </v-avatar>

                    </v-responsive>
                    <v-card-text>
                        <div class="subheading">{{ product.name}} </div>
                        <div class="grey--text">{{product.price}} Б</div>
                    </v-card-text>
                    <!--                <v-card-actions class="ma-auto justify-center">-->
                    <!--                    <SharePointsDialog :item="user"></SharePointsDialog>-->
                    <!--                </v-card-actions>-->
                </v-card>
                </v-hover>
            </v-flex>
        </v-layout>
    </v-layout>

</template>

<script>
    export default {
        name: "Shop",
        beforeCreate() {
            this.$store.dispatch("get_products");
        },

        computed: {


            products() {
                return this.$store.getters.products;
            },



        },
    }
</script>

<style scoped>
    .on-hover {
        opacity: 0.6;

    }
</style>