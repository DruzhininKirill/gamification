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
                <NewUser></NewUser>

            </v-toolbar>
        </template>
        <template v-slot:item.action="{ item }">
            <v-icon
                    small
                    class="mr-2"
                    @click="editItem(item)"
            >
                edit
            </v-icon>
            <v-icon
                    small
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
            headers: [
                { text: 'Имя', value: 'first_name' },
                { text: 'Фамилия', value: 'last_name' },
                { text: 'Баллы спасибо', value: 'share_points' },
                { text: 'Копилка', value: 'personal_points' },
                { text: 'Actions', value: 'action', sortable: false },
            ],
            editedIndex: -1,
            editedItem: {
                name: '',
                calories: 0,
                fat: 0,
                carbs: 0,
                protein: 0,
            },
            defaultItem: {
                name: '',
                calories: 0,
                fat: 0,
                carbs: 0,
                protein: 0,
            },
        }),

        computed: {
            formTitle () {
                return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
            },

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

        watch: {
            dialog (val) {
                val || this.close()
            },
        },


        methods: {

            editItem (item) {
                this.editedIndex = this.desserts.indexOf(item)
                this.editedItem = Object.assign({}, item)
                this.dialog = true
            },

            deleteItem (item) {
                const index = this.desserts.indexOf(item)
                confirm('Are you sure you want to delete this item?') && this.desserts.splice(index, 1)
            },

            close () {
                this.dialog = false
                setTimeout(() => {
                    this.editedItem = Object.assign({}, this.defaultItem)
                    this.editedIndex = -1
                }, 300)
            },

            save () {
                if (this.editedIndex > -1) {
                    Object.assign(this.desserts[this.editedIndex], this.editedItem)
                } else {
                    this.desserts.push(this.editedItem)
                }
                this.close()
            },
        },
    }
</script>




