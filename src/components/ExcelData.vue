<template>
        <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on }">
                <v-btn class="mr-3" color="green" v-on='on' rounded dark><v-icon >table_chart</v-icon></v-btn>
            </template>
            <v-card >
                <v-form
                        @submit="get_excel"

                >
                    <v-toolbar flat color="green" dark>
                        <v-toolbar-title>Получить XLS на почту</v-toolbar-title>

                    </v-toolbar>
                    <v-list>
                    <v-list-item >
                        <v-list-item-content>
                            <span>Пользователи</span>
                        </v-list-item-content>
                        <v-checkbox color="green"  value="Users" v-model="selected"></v-checkbox>
                    </v-list-item>

                        <v-list-item >
                            <v-list-item-content>
                                <span>Транзакции</span>
                            </v-list-item-content>
                            <v-checkbox color="green"  value="Transactions" v-model="selected"></v-checkbox>
                        </v-list-item>
                    </v-list>


                <v-btn :disabled="selected.length===0" class="ma-2" outlined color="green" type="submit">получить на email</v-btn>

                <v-btn class="ma-2" outlined color="green" @click="dialog=false"  >Вернуться</v-btn>


                </v-form>
            </v-card>
        </v-dialog>


</template>

<script>
    export default {
        name: "ExcelData",
        data:()=>({
            dialog:false,
            selected:[],
         }),
        methods:{
           get_excel(){
               let data={
                   'selected': this.selected
               };
               this.$store.dispatch('get_excel', data);
               this.dialog = false
           }
        }
    }
</script>

<style scoped>

</style>