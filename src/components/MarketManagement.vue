<template>
    <v-data-table
            :headers="headers"
            :items="products"
            sort-by="price"
            class="elevation-1"
    >
        <template v-slot:top>
            <v-toolbar flat color="white">
                <v-toolbar-title>Товары </v-toolbar-title>
                <v-divider
                        class="mx-4"
                        inset
                        vertical
                ></v-divider>

                <v-spacer></v-spacer>
               <NewProduct></NewProduct>
            </v-toolbar>
        </template>

        <template v-slot:item.image="{item}">
            <v-avatar size="100" tile class="ma-1" >
                <img alt="reload" :src="item.image">
            </v-avatar>
        </template>


        <template v-slot:item.q="{item}">
            {{item.in_stock}}
            <v-checkbox :v-bind="item.in_stock" :false-value="0" :true-value="1" v-on:change="restock(item)"></v-checkbox>
        </template>


        <template v-slot:item.action="{ item }">
            <EditProduct :product="item"></EditProduct>
            <v-icon
                    @click="delete_product(item)"
            >
                delete
            </v-icon>
        </template>
    </v-data-table>
</template>

<script>
    import NewProduct from "./NewProduct";
    import EditProduct from "./EditProduct";
    export default {
        name: "MarketManagement",
        components: {EditProduct, NewProduct},
        data: () => ({
                         dialog: false,
                         headers: [
                             {text: 'Изображение', value: 'image', sortable: false},
                             {
                                 text: 'Наименование',
                                 sortable: false,
                                 value: 'name',
                             },
                             // { text: 'Описание', value: 'description' },
                             {text: 'Цена', value: 'price'},
                             {text: 'Количество', value: 'quantity'},
                             {text: 'Доступно', value: 'q'},
                             {text: 'Действия', value: 'action', sortable: false},
                         ],
                     }),


        beforeCreate() {
            this.$store.dispatch("get_products");
        },

        computed: {


            products() {
                return this.$store.getters.products;
            },



        },

        watch: {
            dialog (val) {
                val || this.close()
            },
        },


        methods: {

            restock(item){
                return item
            },

            delete_product(product){
                this.$store.dispatch("delete_product", product).then(

                )
            }


        },
    }
</script>