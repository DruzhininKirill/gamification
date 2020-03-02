<template>
    <div class="modal-mask">
        <v-btn @click="field_generator">Генерировать поля</v-btn>
                <v-form v-model="valid"
                        @submit="add_user"
                >
                    <v-container>
                        <v-col>
                            <v-card-title style="color:#b8b8b8 " ><strong>Создать пользователя</strong></v-card-title>

                            <v-col
                                    cols="12"

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
                                    cols="12"

                            >
                                <v-text-field
                                        id="password"
                                        v-model="password"
                                        :append-icon="showpas ? 'md-eye' : 'mdi-eye-off'"
                                        :type="showpas ? 'text' : 'password'"
                                        hint="вводи"
                                        counter
                                        color="indigo"
                                        :rules="[PasswordRules.required, PasswordRules.min]"
                                        label="Пароль для входа"
                                        required
                                ></v-text-field>
                            </v-col>

                            <v-col
                                    cols="12"
                            >
                                <v-text-field
                                        v-model="first_name"
                                        color="indigo"
                                        label="Имя"
                                        required
                                ></v-text-field>
                            </v-col>

                            <v-col
                                    cols="12"
                            >
                                <v-text-field
                                        v-model="last_name"
                                        color="indigo"
                                        label="Фамилия"
                                        required
                                ></v-text-field>
                            </v-col>

                            <v-col
                                    cols="12"
                            >
                                <v-text-field
                                        v-model="position"
                                        color="indigo"
                                        label="Должность"
                                        required
                                ></v-text-field>
                            </v-col>

                            <v-checkbox
                                    v-model="is_staff"
                                    label="Администратор"
                            ></v-checkbox>

                            <v-checkbox
                                    v-model="is_teamlead"
                                    label="Тимлидер"
                            ></v-checkbox>


                            <v-btn class="ma-2" outlined color="indigo" type="submit">Добавить пользователя</v-btn>

                            <v-btn class="ma-2" outlined color="indigo" style="float: right"  >Вернуться</v-btn>

                        </v-col>




                    </v-container>
                </v-form>


    </div>


</template>

<script>
    // import  { HTTP} from "../main";
    export default {
        name: "NewUser",
        data() {
            return {

                valid: false,
                showpas: false,

                is_staff: false,
                is_teamlead: false,
                first_name: null,
                position: "",
                last_name: null,
                email: '',
                password: null,

                Rules: [
                    v => !!v || 'Field is required',
                ],
                PasswordRules: {
                    required: value => !!value || 'введите пароль',
                    min: v => v.length >= 8 || 'пароль менее 8 символов',
                },
                emailRules: [
                    v => !!v || 'введите email ',
                    v => /.+@.+\..+/.test(v) || 'каво... непонял',
                ],

                last_name_pool: ['Бизон', "Волк", "Орангутан", "Лемур",
                    'Макак', "Ястреб", "Кот", "Медведь",'Тюлень', "Морж", "Жук", "Кузнечик",
                    'Вомбат', "Козлик", "Лев", "Чижик",'Енот', "Верблюд", "Змей", "Муравьед"],
                first_name_pool: ['Великий', "Маленький", "Могучий", "Хитрый",
                    'Умный', "Смышленый", "Торопливый", "Игривый",'Незабываемый', "Сильный", "Компанейский", "Скромный",
                    'Уверенный', "Влюбленный", "Весёлый", "Бесстрашный",'Добрый', "Милый", "Нежный", "Ласковый"],
                position_name_pool: ['Расхититель грабниц', "Повелитель молний", "Главный по тарелочкам", "Босс качалки",
                    'Спасатель Малибу', "Гроза морей", "Секретный ингредиент", "Агент 007",'Укратитель тигров',
                    'Непризнанный гений', "Секретный шпион", "Приведение с мотором"],
            }
        },
        methods: {
            add_user() {

                let user = {
                    "email": this.email,
                    "password": this.password,
                    "first_name": this.first_name,
                    "last_name": this.last_name,
                    "position":this.position,
                    "is_staff": this.is_staff,
                    "is_teamlead": this.is_teamlead,
                };
                this.first_name = null;
                this.last_name = null;
                this.position = null;
                this.email = null;
                this.password = null;
                this.is_staff = false;
                this.is_teamlead = false;
                this.$store.dispatch('add_new_user', user);
            },
            field_generator(){
                this.first_name = this.first_name_pool[this.first_name_pool.length * Math.random() << 0]
                this.last_name = this.last_name_pool[this.last_name_pool.length * Math.random() << 0]
                this.position = this.position_name_pool[this.position_name_pool.length * Math.random() << 0]
            }
        }
    }

</script>
<style>


</style>