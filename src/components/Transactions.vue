<template>
<div>
    <v-card >
        <v-card-title >
            История операций
            <v-spacer></v-spacer>
            <v-text-field
                    v-model="search"
                    append-icon="mdi-magnify"
                    label="Search"
                    single-line
                    hide-details

            ></v-text-field>
        </v-card-title>
        <v-data-table
                :headers="headers"
                :items="transactions"
                :search="search"
                disable-pagination

                hide-default-footer
        >

            <template v-slot:item.from_user="{ item }">
                    {{get_user_by_id(item.from_user)}}
            </template>

            <template v-slot:item.to_user="{ item }">
                    {{get_user_by_id(item.to_user)}}
            </template>

            <template v-slot:item.category="{ item }">
                    {{get_cat_by_id(item.category)}}
            </template>
            <template v-slot:item.created_at="{ item }">
                {{dateformat(item.created_at)}}
            </template>
        </v-data-table>
    </v-card>
</div>
</template>

<script>
    export default {
        name: "Transactions",
        data: () => ({
            loaded: false,
            search: '',
            headers: [
                // {
                //     text: 'Dessert (100g serving)',
                //     align: 'left',
                //     sortable: false,
                //     value: 'name',
                // },
                { text: 'Отправитель', value: 'from_user'  },
                { text: 'Получатель', value: 'to_user' },
                { text: 'Количество', value: 'amount' },
                { text: 'Категория', value: 'category' },
                { text: 'Комментарий', value: 'comment' },
                { text: 'Время', value: 'created_at' },
            ],

        }),
        computed: {
            transactions() {
                return this.$store.getters.transactions
            },
            users_list(){
                return this.$store.getters.users_list
            },
            categories(){
                return this.$store.getters.categories
            },
            },
        beforeCreate() {
            this.$store.dispatch("getallusers");
            this.$store.dispatch("get_all_categories");
            this.$store.dispatch("get_transactions");


            },
        methods:{
            get_user_by_id(id){
                let user = this.users_list.find(user=> user.id === id);
                return user.first_name + " " + user.last_name
            },
            get_cat_by_id(id){
                let cat = this.categories.find(cat=> cat.id === id);
                return cat.name
            },
            dateformat(date){
                let date2 = new Date(date);
                let str = date2.toDateString() + " "+ date2.getHours()+":"+date2.getMinutes()
                return str
            }
        }

    }
</script>

<style scoped>

</style>