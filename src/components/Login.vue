<template>
    <v-app id="inspire">
        <v-content>
            <v-container
                    class="fill-height"
                    fluid
            >
                <v-row
                        align="center"
                        justify="center"
                >
                    <v-col
                            cols="12"
                            sm="8"
                            md="4"
                    >
                        <v-card class="elevation-12">
                            <v-toolbar
                                    color="primary"
                                    dark
                                    flat
                            >
                                <v-toolbar-title>Login form</v-toolbar-title>
                                <v-spacer />


                            </v-toolbar>
                            <v-card-text>
                                <v-form>
                                    <v-text-field
                                            v-model="email"
                                            label="Email"
                                            name="Email"
                                            prepend-icon="person"
                                            type="text"
                                    />

                                    <v-text-field
                                            v-model="password"
                                            id="password"
                                            label="Password"
                                            name="password"
                                            prepend-icon="lock"
                                            type="password"
                                    />
                                </v-form>
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer />
                                <v-btn color="primary" v-on:click="login">Login</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-col>
                </v-row>
            </v-container>
        </v-content>
    </v-app>
</template>

<script>
    export default {
        props: {
            source: String,
        },
        data: () => ({
            email:"",
            password:'',

        }),
        methods:{
            login(){
                this.$store.dispatch('retrieveToken',{
                    email: this.email,
                    password: this.password
                })
                    .then(response =>{
                        //
                        if (response.statusText=="OK"){
                            // this.$store.dispatch('getallusers');
                            this.$router.push('/');
                            // лучше, но что то тупое с топнавбаром, остается заголовок логина
                        }
                    //
                    })

            }
        }
    }
</script>

<style scoped>


</style>