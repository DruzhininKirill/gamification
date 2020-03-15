<template>
    <v-stepper v-model="e1">
        <v-stepper-header>
            <v-stepper-step :complete="e1 > 1" step="1" editable>Выбор Пользователей</v-stepper-step>

<!--            <v-divider></v-divider>-->


            <v-stepper-step :complete=" e1 > 2" step="2" editable>Выбор категории</v-stepper-step>

<!--            <v-divider></v-divider>-->

            <v-stepper-step step="3">Подтвержение</v-stepper-step>
        </v-stepper-header>

        <v-stepper-items>
            <v-stepper-content step="1">
                <v-card
                        class="mb-6 "
                        flat





                >
                    <v-card-text>

                        <v-list-item  v-for="user in users_list" v-bind:key="user.id">
                            <v-list-item-avatar>
                                <v-img src="https://randomuser.me/api/portraits/men/78.jpg"></v-img>
                            </v-list-item-avatar>
                            <v-list-item-content>
                                {{user.first_name}} {{user.last_name}}

                            </v-list-item-content>
                            <v-spacer></v-spacer>

                            <v-checkbox  :value="user.id" v-model="selected_users"></v-checkbox>


                        </v-list-item>
                    </v-card-text>
                </v-card>

                <v-btn
                        color="primary"
                        @click="e1 = 2"
                >
                    Далее
                </v-btn>

                <v-btn text>Cancel</v-btn>
            </v-stepper-content>

            <v-stepper-content step="2">
                <v-card
                        class="mb-6 "
                        flat



                >
                    <v-card-text>
                        <v-radio-group v-model="selected_cat">
                            <template>
                                <v-list-item v-for="category in categories" v-bind:key="category.id">
                                    <v-list-item-content>
                                        {{category.name}}

                                    </v-list-item-content>
                                    <v-spacer></v-spacer>
                                    <v-radio  :value="category" ></v-radio>
                                </v-list-item>
                            </template>
                        </v-radio-group>
                        <v-slider
                                v-model="point_i"
                                :tick-labels= point_set
                                :max="2"
                                step="1"
                                ticks="always"
                                tick-size="4"
                        ></v-slider>


                    </v-card-text>
                </v-card>

                <v-btn
                        color="primary"
                        @click="e1 = 3"
                >
                    Далее
                </v-btn>

                <v-btn text>Cancel</v-btn>
            </v-stepper-content>

            <v-stepper-content step="3">
                <v-card
                        class="mb-6"
                        height="200px"
                        flat

                >
                    <v-card-title>
                        Новое поощерение
                    </v-card-title>
                    Пользователи: {{selected_users}}
                    Категория: {{selected_cat.name}}
                    Количество:{{point_set[point_i]}}
                </v-card>



                <v-btn
                        color="primary"
                        @click="super_add_points"
                >
                    Сохранить
                </v-btn>

                <v-btn text>Cancel</v-btn>
            </v-stepper-content>
        </v-stepper-items>
    </v-stepper>
</template>
<script>
    export default {
        name: "CategoryManagement",
        data () {
            return {
                e1: 1,
                point_set: [10,15,20],
                selected_users:[],
                selected_cat:[],
                point_i:0,
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
                return this.$store.getters.categories
            },
        },
        methods:{
            super_add_points(){
                let super_transaction = {
                    'to_user': this.selected_users,
                    "category": this.selected_cat.id,
                    'amount': this.point_set[this.point_i],
                    'comment': "teamlead action"
                };

                this.$store.dispatch('add_super_transaction', super_transaction)
            }
        }
    }
</script>

<style scoped>

</style>