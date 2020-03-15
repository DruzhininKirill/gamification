<template>
        <v-form v-model="valid"
                @submit="edit_user"
        >

                    <v-col cols="12">
                    <v-row>
                    <v-col
                            cols="6"
                    >
                        <v-text-field
                                v-model="first_name"
                                color="indigo"
                                label="Имя"
                                required
                        ></v-text-field>
                    </v-col>

                    <v-col
                            cols="6"
                    >
                        <v-text-field
                                v-model="last_name"
                                color="indigo"
                                label="Фамилия"
                                required
                        ></v-text-field>
                    </v-col>

                    </v-row>

                    </v-col>

                    <v-col>
                        <v-row>
                            <v-col
                                    cols="6"
                            >
                                <v-text-field
                                        id="email"
                                        v-model="email"
                                        color="indigo"
                                        :rules="emailRules"
                                        label="Email"
                                        required
                                ></v-text-field>
                            </v-col>

                            <v-col
                                    cols="6"
                            >
                                <v-text-field
                                        v-model="position"
                                        color="indigo"
                                        label="Должность"
                                        required
                                ></v-text-field>
                            </v-col>

                        </v-row>
                    </v-col>


                    <v-col>
                        <v-row>
                            <v-col
                                    cols="6"

                            >
                                <v-text-field
                                        id="password1"
                                        v-model="password1"
                                        :append-icon="showpas ? 'md-eye' : 'mdi-eye-off'"
                                        :type="showpas ? 'text' : 'password'"
                                        hint="от 8 символов"
                                        counter
                                        color="indigo"
                                        :rules="[PasswordRules.required, PasswordRules.min]"
                                        label="Новый пароль"
                                        required
                                ></v-text-field>

                                <v-text-field
                                        id="password2"
                                        v-model="password2"
                                        :append-icon="showpas ? 'eye' : 'eye-off'"
                                        :type="showpas ? 'text' : 'password'"
                                        hint="от 8 символов"
                                        counter
                                        color="indigo"
                                        :rules="[PasswordRules.match]"
                                        label="Повторите пароль"
                                        required
                                ></v-text-field>
                            </v-col>

                            <v-col
                                    cols="6"
                            >
                                <v-textarea
                                        rows="3"
                                        v-model="profile"
                                        color="indigo"
                                        label="Профиль"
                                        required
                                ></v-textarea>
                            </v-col>

                        </v-row>
                    </v-col>



            <p class="mb-0">
                <v-btn class="ma-2" outlined color="indigo" type="submit">Изменить</v-btn>
            </p>



        </v-form>

</template>

<script>
    export default {
        name: "EditUser",
        props:{
            user: Object,
        },
        data:()=>({

        valid: false,
        showpas: false,
        profile: '',
        first_name: '',
        position: "",
        last_name: '',
        email: '',
        password1: '',
        password2: '',

        Rules: [
            v => !!v || 'Field is required',
        ],
        PasswordRules: {
            required: value => !!value || 'введите пароль',
            min: v => v.length >= 8 || 'пароль менее 8 символов',
            match: v => v === this.password1 || "не совпадают",
        },

        emailRules: [
            v => !!v || 'введите email ',
            v => /.+@.+\..+/.test(v) || 'каво... непонял',
        ],
    }),
   beforeMount() {
            this.position = this.user.position;
            this.last_name = this.user.last_name;
            this.first_name = this.user.first_name;
            this.email = this.user.email;
            this.profile = this.user.profile;
   },
        methods:{
            edit_user(){

                let edited = {
                    "last_name" : this.last_name,
                    "first_name" : this.first_name,
                    "position" : this.position,
                    "email" : this.email,
                    "profile" : this.profile,
                    // "password" : this.password2
                };
                if (this.password2 != ""){
                    edited.password = this.password2
                }

                this.$store.dispatch('edit_user', edited).then(

                )
            }
        }
    }
</script>

<style scoped>

</style>