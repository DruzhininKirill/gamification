<template>
    <div>
    <h1>hi2</h1>
    {{users_list}}
    </div>
</template>

<script>
    export default {
        name: "Main",


        computed: {
            users_list(){
                return this.$store.getters.users_list
            }

        },
        beforeCreate() {
            this.$store.dispatch("getallusers").then(response=>{
                console.log(response)

            }
            )
        }
    }
</script>

<style scoped>

</style>