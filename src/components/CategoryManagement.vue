<template>
    <v-layout column align-center>
        <v-layout column >
            <div class="text-center ma-3"  >
                <h1>Особые поощрения </h1>
                <span  class="subtitle-1" style="max-width: 800px">
                    Баллы, начисленные через особые поощрения будут добавлены пользователям из общего банка баллов
                </span>
            </div>
        </v-layout>
    <v-stepper v-model="e1">
        <v-stepper-header>
            <v-stepper-step :complete="e1 > 1" step="1" editable>Выбор Пользователей</v-stepper-step>

<!--            <v-divider></v-divider>-->


            <v-stepper-step :complete=" e1 > 2" step="2" editable>Выбор категории</v-stepper-step>

<!--            <v-divider></v-divider>-->

            <v-stepper-step step="3">Подтвержение</v-stepper-step>
        </v-stepper-header>

        <v-stepper-items >
            <v-stepper-content step="1">
                <v-card
                        class="mb-4 overflow-y-auto"
                        flat
                        max-height="450"
                >
                    <v-card-text>

                        <v-list-item  v-for="user in users_list" v-bind:key="user.id">
                            <v-list-item-avatar>
                                <v-img src="https://randomuser.me/api/portraits/men/78.jpg"></v-img>
                            </v-list-item-avatar>
                            <v-list-item-content>
                                {{user.first_name}} {{user.last_name}}

                            </v-list-item-content>

                            <v-checkbox  :value="user.id" v-model="selected_users"></v-checkbox>


                        </v-list-item>
                    </v-card-text>
                </v-card>
                <div class="float-right">
                    <v-btn @click="reset" text>Отмена</v-btn>
                <v-btn
                        color="primary"
                        @click="e1 = 2"
                >
                    Далее
                </v-btn>


                </div>
            </v-stepper-content>

            <v-stepper-content step="2">
                <v-card
                        class="mb-5 overflow-y-auto"
                        flat
                        max-height="360"





                >

                    <v-card-text >
                        <v-radio-group v-model="selected_cat">
                            <template >
                                <v-list-item
                                        v-for="category in categories" v-bind:key="category.id"

                                >
                                    <v-list-item-content>
                                        {{category.name}}

                                    </v-list-item-content>

                                    <v-radio  :value="category" ></v-radio>
                                </v-list-item>
                            </template>
                        </v-radio-group>



                    </v-card-text>
                </v-card>
                <v-card-text>
                <v-slider
                        v-if="labels.length!==1"
                        v-model="point_i"
                        :tick-labels= labels
                        :max= labels.length-1
                        step="1"
                        ticks="always"
                        tick-size="4"
                ></v-slider>
                <div v-else class="ma-4 text-center" >
                    <h1>{{labels[point_i]}}</h1>
                </div>
                </v-card-text>
                <div class="float-right">
                    <NewCategory></NewCategory>
                <v-btn @click="reset" text>Отмена</v-btn>
                <v-btn
                        color="primary"
                        @click="e1 = 3"
                >
                    Далее
                </v-btn>

                </div>
            </v-stepper-content>

            <v-stepper-content step="3">
                <v-card
                        class="mb-6"

                        flat

                >
                    <v-card-title>
                        Новое поощерение
                    </v-card-title>
                    <v-card-text>
                        <v-row wrap>

                        <v-col>
                            <p class="subtitle-1 text--black"> Пользователи:</p>

                            <div v-for="user in filtered()" v-bind:key="user.id">
                                {{user_to_str(user)}}
                            </div>
                            <div v-if="selected_users.length===0">
                                Вернитесь к выбору пользователей
                            </div>
                        </v-col>

                        <v-col>
                            <p class="subtitle-1"> Категория:</p>
                            {{selected_cat.name || "Вернитесь к выбору категории"}}
                        </v-col>

                        <v-col>
                            <p class="subtitle-1"> Количество:</p>
                            {{selected_cat.values[point_i]}}
                        </v-col>
                        </v-row>
                        <v-row>

                        </v-row>



                    </v-card-text>
                    <v-card-actions>
                        <v-text-field
                                required
                                v-model="comment"
                                type="text"
                                color="indigo"
                                label="Комментарий"
                        ></v-text-field>
                    </v-card-actions>

                </v-card>


                <div class="float-right">
                <v-btn @click="reset" text>Отмена</v-btn>
                <v-btn

                        color="primary"
                        @click="super_add_points"
                        :disabled="disabled()"
                >
                    Сохранить
                </v-btn>

                </div>
            </v-stepper-content>
        </v-stepper-items>
    </v-stepper>
    </v-layout>
</template>
<script>
    import NewCategory from "./NewCategory";
    export default {
        name: "CategoryManagement",
        components: {NewCategory},
        data () {
            return {
                e1: 1,
                point_set: [10,20,30],
                selected_users:[],
                selected_cat:[],
                point_i:0,
                comment: 'Особое поощрение',
                labels:[],

            }
        },
        beforeCreate() {
            this.$store.dispatch("getallusers");
            this.$store.dispatch("get_all_categories");
        },
        computed: {
            users_list() {
                return this.$store.getters.users_list
            },
            categories() {
                return this.$store.getters.categories.filter(cat => cat.name !== 'Спасибо')
            },
        },
        methods:{
            super_add_points(){
                let super_transaction = {
                    'to_user': this.selected_users,
                    "category": this.selected_cat.id,
                    'amount': this.selected_cat.values[this.point_i],
                    'comment': this.comment
                };

                this.$store.dispatch('add_super_transaction', super_transaction)
            },
            filtered(){
                return this.users_list.filter(user => this.selected_users.includes(user.id ))
            },
            disabled() {
                return this.selected_users.length === 0 || this.selected_cat === ''
            },
            user_to_str(user){
                return user.first_name+" "+ user.last_name
            },
            reset(){
                this.e1=1;
                this.selected_users=[];
                this.selected_cat=[];
                this.point_i=0;
                this.comment = "Особое поощрение"
            },

        },
        watch:{
            selected_cat: function () {
                this.labels = this.selected_cat.values.sort(function(a, b){  return a-b});
                if (this.labels.length === 1){
                    this.point_i = 0;
                }

            }
        }
    }
</script>

<style scoped>

</style>