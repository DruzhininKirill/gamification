<template>
    <v-dialog v-model="dialog" max-width="500px">
        <template v-slot:activator="{ on }">
            <v-btn color="primary"  dark v-on="on"><v-icon >add</v-icon></v-btn>
        </template>
        <v-card >
            <v-form
                    @submit="add_cat"

            >
                <v-toolbar flat color="indigo" dark>
                    <v-toolbar-title>Новая Категория</v-toolbar-title>

                </v-toolbar>
                <v-container>


                    <v-col
                            cols="12"

                    >
                        <v-text-field
                                id="name"
                                v-model="name"
                                color="indigo"
                                :rules="Rules"
                                label="Название"
                                required
                        ></v-text-field>
                    </v-col>

                    <v-col
                            cols="12"

                    >
                        <v-text-field
                                id="values"
                                v-model="values"
                                hint="введите допустимые значения через запятую без пробелов"
                                counter
                                color="indigo"
                                :rules="Rules"
                                label="Допустимые значения"
                                required
                        ></v-text-field>
                    </v-col>


                    <v-btn class="ma-2" outlined color="indigo" type="submit">Добавить категорию</v-btn>

                    <v-btn class="ma-2" outlined color="indigo" @click="dialog=false"  >Вернуться</v-btn>






                </v-container>
            </v-form>
        </v-card>
    </v-dialog>


</template>

<script>
    // import  { HTTP} from "../main";
    export default {
        name: "NewCategory",
        data() {
            return {
                dialog:false,
                name:'',
                values:'',


                Rules: [
                    v => !!v || 'Обязательное поле',
                ],



            }
        },
        methods: {
            add_cat() {

                let cat = {
                    "name": this.name,
                    "values": this.values

                };
                this.name = null;
                this.values = null;
                alert(JSON.stringify(cat));
                this.$store.dispatch('add_new_cat', cat);
                this.dialog = false;
            },

        }
    }

</script>
<style>


</style>