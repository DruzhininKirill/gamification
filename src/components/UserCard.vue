<template>


    <v-card style="margin: auto"
            class="mx-auto"
            max-width="150">


            <v-img
                    src="https://cdn.vuetifyjs.com/images/john.jpg"
                    alt="John"
                    sizes="1"

            ></v-img>


        <v-card-title >
            {{user.first_name}} <br>
            {{user.last_name}}
        </v-card-title>
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