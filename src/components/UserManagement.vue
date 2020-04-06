<template>
    <v-layout>


    <div style="width: 100%">
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
                <ExcelData></ExcelData>
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

    </div>
    </v-layout>
</template>


<script>
    import NewUser from "./NewUser";
    import ExcelData from "./ExcelData";
    export default {
        name: "UserManagement",
        components: {ExcelData, NewUser},
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
                this.$vToastify.prompt({
                    body: "Вы уверены, что хотите изменить статус администратора"+ item.first_name  +
                        " "+item.last_name+ "?",
                    answers: { "Да": true, "Нет": false },
                    theme: 'light'
                }).then(value => {
                    if (value) {
                        item.is_staff = !item.is_staff;
                        this.$store.dispatch("admin_edit_user", item)
                    }
                })

                // this.changes = true;



            },
            change_is_teamlead(item){

                this.$vToastify.prompt({
                    body: "Вы уверены, что хотите изменить статус тимлидера "+ item.first_name  +
                        " "+item.last_name+ "?",
                    answers: { "Да": true, "Нет": false },
                    theme: 'light'
                }).then(value => {
                    if (value) {
                        item.is_teamlead = !item.is_teamlead;
                        this.$store.dispatch("admin_edit_user",item)
                    }
                })
            },


            getColor(item){
                if(item) return "primary";
                else return 'secondary'
            },

            deleteItem (user) {
                this.$vToastify.prompt({
                    body: "Вы уверены, что хотите удалить "+ user.first_name  +
                        " "+user.last_name+ "?",
                    answers: { "Да": true, "Нет": false },
                    theme: 'light'
                }).then(value => {
                    if (value) {
                        this.$store.dispatch("delete_user",user);
                    }
                })


            },


            save () {

            },
        },
    }
</script>




