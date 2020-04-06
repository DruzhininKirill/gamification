<template>
    <v-dialog v-model="dialog" max-width="500px">
        <template v-slot:activator="{ on }">
            <v-btn color="primary" class="mb-0" rounded dark v-on="on"><v-icon >add</v-icon></v-btn>
        </template>
        <v-card >
            <v-form
                    @submit="add_new_product"

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
                                        prepend-icon="camera"
                                        :rules="rules_img"
                                        accept="image/png, image/jpeg, image/bmp"
                                ></v-file-input>
                            </v-col>

                        </v-row>

                    </v-col>


                    <v-btn class="ma-2" outlined color="indigo" type="submit">Добавить товар</v-btn>

                    <v-btn class="ma-2" outlined color="indigo" @click="dialog=false"  >Вернуться</v-btn>






                </v-container>
            </v-form>
        </v-card>
    </v-dialog>


</template>

<script>
    // import  { HTTP} from "../main";
    export default {
        name: "NewProduct",
        data() {
            return {
                dialog:false,

                name: "",
                description: "",
                price: "",
                quantity: "",
                in_stock: false,
                file:'',
                image:'',

                rules_img: [
                    file => !file || file.size < 2000000 || 'Размер картинки не должен превышать 2 MB!',
                ],
                Rules: [
                    v => !!v || 'Field is required',
                ],

            }
        },
        methods: {
            add_new_product() {
                // let reader = new FileReader();
                // reader.readAsDataURL(this.file);
                // console.log(this.file);
                // reader.onloadend= () =>{
                //     this.image = reader.result;
                // };
                //
                // console.log(this.image);

                const fd = new FormData()
                fd.append('image', this.file);
                fd.append('name', this.name);
                fd.append('description', this.description);
                fd.append('price', this.price)
                fd.append('quantity', this.quantity)
                fd.append('in_stock', this.in_stock)
                this.$store.dispatch('add_new_product', fd)

                let product = {
                    "name": this.name,
                    "description": this.description,
                    "price": this.price,
                    "quantity": this.quantity,
                    "in_stock":this.in_stock,
                    fd,

                };
                // this.$store.dispatch('add_new_product', product);
                this.name = '';
                this.description = '';
                this.price = "";
                this.quantity = '';
                this.in_stock = "";
                this.file = '';
                this.image = '';
                console.log(product)
                // this.$store.dispatch('add_new_product', product);
                this.dialog = false;
            },

        }
    }

</script>
<style>


</style>