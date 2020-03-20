<template>
    <v-card >
        <v-card-title>
            Рейтинг
            <v-spacer></v-spacer>
            <v-text-field
                    v-model="search"
                    append-icon="magnify"
                    label="Search"
                    single-line
                    hide-details

            ></v-text-field>
        </v-card-title>
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
                    { text: '', value: 'add_button', sortable: false , },
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