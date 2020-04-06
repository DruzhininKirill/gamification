<template>
    <v-layout column >
        <v-layout column >
            <div class="text-center ma-3"  >
                <h1>Рейтинг</h1>
                <span  class="subtitle-1" style="max-width: 800px">
                    Поделись баллами спасибо с коллегами по отделу и помоги им добраться до верхушки таблицы
                </span>
            </div>
        </v-layout>


        <v-layout justify-space-between
                  flat
                  color="transparent"
        >

            <v-card width="100%" flat>
                <v-flex lg3 md4 sm4>
                    <v-text-field

                            class="ma-3"
                            v-model="search"
                            append-icon="search"
                            label="Поиск"
                            single-line
                    ></v-text-field>
                </v-flex>
                <v-data-table
                        :headers="headers"
                        :items="users_list"
                        :search="search"
                        disable-pagination

                        hide-default-footer
                >
                    <template v-slot:item.place="{ item }">

                        {{users_list.map(function(x) {return x.id; }).indexOf(item.id)+1}}

                    </template>


                    <template v-slot:item.add_button="{ item }">

                        <SharePointsDialog :item="item" @addpoints="addpoints"></SharePointsDialog>


                    </template>

                </v-data-table>
            </v-card>


        </v-layout>

    </v-layout>

</template>

<script>

    import SharePointsDialog from "./SharePointsDialog";
    export default {
        name: "Rating",
        components: {SharePointsDialog},
        data () {
            return {
                editedIndex: -1,
                editedItem: {},
                dialog:false,
                search: '',
                headers: [
                    // {
                    //     text: 'Dessert (100g serving)',
                    //     align: 'left',
                    //     sortable: false,
                    //     value: 'name',
                    // },
                    { text: '#', value: 'place', sortable: false, },
                    { text: 'Имя', value: 'first_name', sortable: false , },
                    { text: 'Фамилия', value: 'last_name', sortable: false ,  },
                    { text: 'Баллы спасибо', value: 'share_points' },
                    { text: 'Копилка', value: 'personal_points' },
                    { text: '', value: 'add_button', sortable: false , align:'center' },
                ],

            }
        },



        computed: {
            users_list(){
                return this.$store.getters.users_list
            },
            // user_id(){
            //     return this.$store.getters.get_id_from_token
            // }

        },
        beforeCreate() {
            this.$store.dispatch("getallusers")

        },
        methods:{
            editItem (item) {
                this.editedIndex = this.users_list.indexOf(item);
                this.editedItem = Object.assign({}, item);
                this.dialog = true
            },
            addpoints(data){
                // alert("ki");
                this.$store.dispatch('addpoints',data);
            },
        }
    }
</script>

<style scoped>

</style>