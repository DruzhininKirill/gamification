<template>
    <v-layout column >
        <v-layout column >
            <div class="text-center ma-3"  >
                <h1>Murano Marketplace</h1>
                <span  class="subtitle-1" style="max-width: 800px">
                    Первая партия айтемов уже готова к отгрузке на ваши столы!
                </span>
            </div>
        </v-layout>


        <v-layout justify-space-between
                flat
                color="transparent"



        >
            <v-flex lg3 md4 sm4>
            <v-text-field
                    outlined
                    class="ma-3"
                    v-model="search"
                    append-icon="search"
                    label="Поиск"
                    single-line



            ></v-text-field>
            </v-flex>
            <v-flex lg3 md4 sm4>
            <v-col >
                <v-select
                        :items="filters"
                        label="Фильтры"
                        outlined
                        v-model="filter"
                ></v-select>
            </v-col>
            </v-flex>

        </v-layout>


        <v-layout row wrap >

            <v-flex xs12 sm6 md4 lg3 v-for="product in searching()" :key="product.id">
                <v-hover class="ma-3 text-center" v-slot:default="{ hover }">
<!--                <v-card class="text-center ma-3  " flat  link :to="'shop/'+product.id">-->
                <v-card :class=" {'on-hover': hover } " flat  link :to="'shop/'+product.id">



                    <v-responsive class="ma-4">


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

        beforeRouteLeave(to, from, next){

            const inShop = to.path.match('/shop/');
            if (inShop===null){
                localStorage.removeItem('search');
                localStorage.removeItem('filter');
            }

            next()

        },


        beforeCreate() {
            this.$store.dispatch("get_products");
        },
        data:()=>({
            search: localStorage.getItem('search') || "",
            filter: localStorage.getItem("filter")|| '',
            filters: ["Цена. По убыванию","Цена. По возрастанию"],


        }),

        computed: {



            products() {
                return this.$store.getters.products;
            },


        },

        watch:{
            filter(){
                let i = this.filters.findIndex(filter => filter === this.filter)
                switch (i) {
                    case 0:
                        this.products.sort(function(a, b){  return b.price-a.price});
                        break
                    case 1:
                        this.products.sort(function(a, b){  return a.price-b.price});
                }
                localStorage.setItem('filter', this.filter)
            },

        },

        methods:{
            searching () {
                if (!this.search) return this.products

                const search = this.search.toLowerCase()
                localStorage.setItem('search', this.search)
                return this.products.filter(prod => {
                    const text = prod.name.toLowerCase();

                    return text.indexOf(search) > -1
                });

            },

        }
    }
</script>

<style scoped>
    .on-hover {
        opacity: 0.6;

    }
</style>