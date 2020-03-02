<template>
    <NewUser></NewUser>
</template>

<script>
    import NewUser from "./NewUser";
    export default {
        name: "Special",
        components: {NewUser},
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
        beforeCreate() {
            this.$store.dispatch("getallusers");
            this.$store.dispatch("get_all_categories");
            this.$store.dispatch("get_transactions");
        },
    }
</script>

<style scoped>

</style>