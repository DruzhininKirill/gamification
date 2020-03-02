<template>



    <v-card class="text-center ma-3">
        <v-responsive class="pt-4 ma-3">
            <v-avatar size="150" class="grey lighten-5">
                <img src="https://randomuser.me/api/portraits/men/77.jpg">
            </v-avatar>
        </v-responsive>
        <v-card-text>
            <div class="subheading">{{ user.first_name}} {{ user.last_name}}</div>
            <div class="grey--text">{{user.position}}</div>
        </v-card-text>
    </v-card>


</template>

<script>
    export default {
        name: "UserCard",
        props:{
            user: Object
        }
    }
</script>

<style scoped>

</style>