<template >
    <v-layout row wrap align-content-center >
        <v-flex xs12 sm12 md6 >
            <v-avatar  size="100%" tile>
                <img :src="product.image">
            </v-avatar>
        </v-flex>
    </v-layout>

</template>

<script>
    export default {
        name: "Product",

        computed:{
            product(){
                // return this.$store.getters.products
                // console.log(this.$route.params.id);

                 return  this.$store.getters.products.find(prod=> prod.id == this.$route.params.id)
                // console.log(i)
                // return i

            }
        }

    }
</script>

<style scoped>

</style>