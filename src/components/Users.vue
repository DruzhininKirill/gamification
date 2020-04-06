<template>
    <v-layout column>
        <v-layout column >
            <div class="text-center ma-3"  >
                <h1>Коллеги</h1>
                <span  class="subtitle-1" style="max-width: 800px">
                    Героев нужно знать в лицо!
                </span>
            </div>
        </v-layout>
                <v-layout row wrap >
                <v-flex xs12 sm6 md4 lg3 v-for="user in colleagues()" :key="user.id">
                    <v-card class="text-center ma-3">


                        <v-responsive class="pt-4">

                            <v-badge v-if="(user.is_staff) || (user.is_teamlead)"
                                    avatar
                                    bordered
                                    overlap
                                    :icon="getIcon(user)"

                            >


                                <v-avatar size="150" class="grey lighten-5">
                                    <img src="https://randomuser.me/api/portraits/men/72.jpg">
                                </v-avatar>
                            </v-badge>
                            <v-avatar v-else size="150" class="grey lighten-5">
                                <img src="https://randomuser.me/api/portraits/men/72.jpg">
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
    </v-layout>
</template>

<script>
    import SharePointsDialog from "./SharePointsDialog";
    export default {
        name: "Users",
        components: {SharePointsDialog},
        data:()=>({

        }),

        beforeCreate() {
            this.$store.dispatch("getallusers");
        },

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

            },
            getIcon(user){
                if (user.is_staff) return 'build';
                if (user.is_teamlead) return 'grade';
                return ''
            }
        }
    }
</script>

<style scoped>

</style>