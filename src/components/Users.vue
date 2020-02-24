<template>
                <v-layout row wrap >
                <v-flex xs12 sm6 md4 lg3 v-for="user in users_list" :key="user.id">
                    <v-card class="text-center ma-3">
                        <v-responsive class="pt-4">
                            img
                        </v-responsive>
                        <v-card-text>
                            <div class="subheading">{{ user.first_name}} {{ user.last_name}}</div>
                            <div class="grey--text">postition</div>
                        </v-card-text>
                        <v-card-actions class="ma-auto">
                            <v-btn >
                                <v-icon small left>message</v-icon>
                                Отправить баллы
                            </v-btn>
                        </v-card-actions>
                    </v-card>

                </v-flex>
            </v-layout>
</template>

<script>
    export default {
        name: "Users",
        data:()=>({

        }),
        computed: {
            users_list(){
                return this.$store.getters.users_list
            }

        },
    }
</script>

<style scoped>

</style>