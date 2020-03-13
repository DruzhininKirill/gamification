<template>
    <v-data-table
            :headers="headers"
            :items="users_list"
            sort-by="calories"
            class="elevation-1"
    >
        <template v-slot:top>
            <v-toolbar flat color="white">
                <v-toolbar-title>Пользователи</v-toolbar-title>
                <v-divider
                        class="mx-4"
                        inset
                        vertical
                ></v-divider>
                <v-spacer></v-spacer>
<!--                <v-btn v-show="changes" color="green" rounded dark v-on="save">Сохранить</v-btn>-->
                <NewUser></NewUser>

            </v-toolbar>
        </template>
        <template v-slot:item.action="{ item }">
            <v-icon
                    :color="getColor(item.is_staff)"
                    class="mr-2"
                    @click="change_is_staff(item)"
            >
                build
            </v-icon>
            <v-icon
                    :color="getColor(item.is_teamlead)"
                    class="mr-2"
                    @click="change_is_teamlead(item)"
            >
                grade
            </v-icon>
            <v-icon
                    @click="deleteItem(item)"
            >
                delete
            </v-icon>
        </template>
    </v-data-table>


</template>


<script>
    import NewUser from "./NewUser";
    export default {
        name: "UserManagement",
        components: {NewUser},
        data: () => ({
            dialog: false,
            // changes: false,
            headers: [
                { text: 'Имя', value: 'first_name' },
                { text: 'Фамилия', value: 'last_name' },
                { text: 'Баллы спасибо', value: 'share_points' },
                { text: 'Копилка', value: 'personal_points' },
                { text: 'Действия', value: 'action', sortable: false },
            ],
        }),

        computed: {

            users_list() {
                return this.$store.getters.users_list
            },
            categories() {
                return this.$store.getters.categories
            },
            user() {
                return this.$store.getters.logged_user
            },


        },


        methods: {

            change_is_staff(item){
                item.is_staff = !item.is_staff;
                // this.changes = true;


                this.$store.dispatch("admin_edit_user",item)
            },
            change_is_teamlead(item){
                item.is_teamlead = !item.is_teamlead;
                this.$store.dispatch("admin_edit_user",item)
                // this.changes = true;
            },


            getColor(item){
                if(item) return "primary";
                else return 'secondary'
            },

            deleteItem (user) {
                // const index = this.users_list.indexOf(user);
                this.$store.dispatch("delete_user",user);
                confirm('Are you sure you want to delete this item?') && this.$store.dispatch("delete_user",user);
                // this.users_list.splice(index, 1)
            },


            save () {

            },
        },
    }
</script>




