<template>
    <div style="width: 100%">
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


        <template v-slot:item.in_stock="{item}">
<!--            {{item.in_stock}}-->
            <v-switch v-model="in_stock_items" :value="item.id"  v-on:change="restock(item)"></v-switch>
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
    </div>
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
                             {text: 'Доступно', value: 'in_stock'},
                             {text: 'Действия', value: 'action', sortable: false},
                         ],
            in_stock_items:[]
                     }),



        beforeCreate() {
            this.$store.dispatch("get_products");

        },

        computed: {


            products() {
                return this.$store.getters.products;
            },





        },

        created () {
            this.initialize()
        },

        watch: {
            dialog (val) {
                val || this.close()
            },
        },


        methods: {
            initialize(){
                this.products.forEach(prod => {if (prod.in_stock === true) this.in_stock_items.push(prod.id)})
            },


            restock(item){
                item.in_stock = !item.in_stock
                const fd = new FormData();
                fd.append('in_stock', item.in_stock);
                let data = {
                    'id': item.id,
                    "data": fd
                };

                this.$store.dispatch("restock_product", data)
            },

            delete_product(product){
                this.$store.dispatch("delete_product", product).then(

                )
            }


        },
    }
</script>