<template>
    <v-dialog v-model="dialog" max-width="500px">
        <template v-slot:activator="{ on }">

            <v-icon

                    class="mr-2"
                    v-on="on"
            >
                edit
            </v-icon>
        </template>
        <v-card >
            <v-form
                    @submit="edit_product"

            >
                <v-toolbar flat color="indigo" dark>
                    <v-toolbar-title>Новый товар</v-toolbar-title>

                </v-toolbar>
                <v-container>


                    <v-col
                            cols="12"

                    >
                        <v-text-field
                                v-model="name"
                                color="indigo"
                                :rules="Rules"
                                label="Наименование"
                                required
                        ></v-text-field>
                    </v-col>

                    <v-col
                            cols="12"

                    >
                        <v-textarea
                                v-model="description"
                                color="indigo"
                                :rules="Rules"
                                label="Описание"
                                required
                        ></v-textarea>
                    </v-col>

                    <v-col cols="12">
                        <v-row>
                            <v-col
                                    cols="6"
                            >
                                <v-text-field
                                        v-model="price"
                                        color="indigo"
                                        label="Цена"
                                        required
                                ></v-text-field>
                            </v-col>

                            <v-col
                                    cols="6"
                            >
                                <v-text-field
                                        v-model="quantity"
                                        color="indigo"
                                        label="Количество"
                                        required
                                ></v-text-field>
                            </v-col>

                            <v-col>
                                <v-checkbox
                                        v-model="in_stock"
                                        label="Доступнно"
                                ></v-checkbox>
                            </v-col>
                            <v-col>
                                <v-file-input
                                        v-model="file"
                                        label="Изображение"
                                ></v-file-input>
                            </v-col>

                        </v-row>

                    </v-col>


                    <v-btn class="ma-2" outlined color="indigo" type="submit">Изменить</v-btn>

                    <v-btn class="ma-2" outlined color="indigo" @click="dialog=false"  >Вернуться</v-btn>






                </v-container>
            </v-form>
        </v-card>
    </v-dialog>


</template>

<script>
    // import  { HTTP} from "../main";
    export default {
        name: "EditProduct",
        props:{
            product: Object,
        },
        data() {
            return {
                dialog:false,

                name: "",
                description: "",
                price: "",
                quantity: "",
                in_stock: false,
                file:'',
                id:'',


                Rules: [
                    v => !!v || 'Field is required',
                ],

            }
        },
        methods: {
            edit_product() {

                const fd = new FormData()
                fd.append('id', this.id);
                fd.append('image', this.file);
                fd.append('name', this.name);
                fd.append('description', this.description);
                fd.append('price', this.price)
                fd.append('quantity', this.quantity)
                fd.append('in_stock', this.in_stock)

                let data = {
                    'id': this.id,
                    "data": fd
                };

                this.$store.dispatch('edit_product', data)


                // this.name = '';
                // this.description = '';
                // this.price = "";
                // this.quantity = '';
                // this.in_stock = "";
                // this.file = '';
                // this.image = '';

                this.dialog = false;
            },

        },
        beforeMount() {
            this.name = this.product.name;
            this.description = this.product.description;
            this.price = this.product.price;
            this.quantity = this.product.quantity;
            this.in_stock = this.product.in_stock;
            this.image = this.product.image;
            this.id = this.product.id;
        }
    }

</script>
