<template>
                <v-layout row wrap >
                <v-flex xs12 sm6 md4 lg3 v-for="user in colleagues()" :key="user.id">
                    <v-card class="text-center ma-3">
                        <v-responsive class="pt-4">
                            <v-avatar size="150" class="grey lighten-5">
                                <img src="https://randomuser.me/api/portraits/men/73.jpg">
                            </v-avatar>
                        </v-responsive>
                        <v-card-text>
                            <div class="subheading">{{ user.first_name}} {{ user.last_name}}</div>
                            <div class="grey--text">{{user.position}}</div>
                        </v-card-text>
                        <v-card-actions class="ma-auto justify-center">
                            <SharePointsDialog :item="user"></SharePointsDialog>
                        </v-card-actions>
                    </v-card>

                </v-flex>
            </v-layout>
</template>

<script>
    import SharePointsDialog from "./SharePointsDialog";
    export default {
        name: "Users",
        components: {SharePointsDialog},
        data:()=>({

        }),
        computed: {
            users_list(){
                return this.$store.getters.users_list
            },
            user(){
                return this.$store.getters.logged_user
            }

        },
        methods:{
            colleagues(){
                return this.users_list.filter(user2 => user2 !== this.user);

            }
        }
    }
</script>

<style scoped>

</style>