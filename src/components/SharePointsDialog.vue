<template>
    <v-dialog
            v-model="dialog"
            width=600
    >
        <template v-slot:activator="{ on }">
            <v-btn color="indigo" v-if="item.id!==user.id" dark class="ml-1" v-on="on" >Добавить</v-btn>

        </template>

        <v-card>
            <v-card-title
                    class="headline grey lighten-2"
                    primary-title
            >
                Поделиться баллами спасибо
            </v-card-title>

            <v-card-text >
                <div style="display: flex; justify-content: space-between; flex-flow: row wrap; margin-bottom: 40px">
                    <UserCard :user="user"></UserCard>
                    <div style="align-self: center; display: flex; flex-direction:column; justify-content: center;">
                      <h1 style="text-align: center">{{value}}</h1>
                        <v-icon color="black" size="50px">arrow_forward</v-icon>
                    </div>

                    <UserCard :user="item"></UserCard>
                </div>

                <v-spacer></v-spacer>


                <v-slider
                        v-show="user.share_points>1"
                        label="Количество"
                        v-model="value"
                        step="1"
                        ticks
                        :max=user.share_points
                        min="1"
                ></v-slider>
                <v-text-field
                        v-if="Number.parseInt( user.share_points)>0"
                        v-model="comment"
                        type="text"
                        color="indigo"
                        label="Комментарий"
                ></v-text-field>
                <span v-else>Недостаточно средств</span>

            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                        color="secondary"
                        left
                        @click.native="dialog=false"
                >
                    Назад
                </v-btn>


                <v-btn v-if="Number.parseInt( user.share_points)>0"
                        color="primary"

                        @click.native="sendpoints"
                >
                    Спасибо
                </v-btn>

            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    import UserCard from "./UserCard";
    export default {
        name: "SharePointsDialog",
        components: {UserCard},
        props:{
            item: Object,

        },
        data: () => ({
            dialog: false,
            value:1,
            comment: ""

        }),
        computed:{
            user(){
                return this.$store.getters.logged_user
            },
            users_list(){
                return this.$store.getters.users_list
            },
        },

        methods:{
            sendpoints(){
                this.$store.dispatch('addpoints',{
                    to_user: this.item.id,
                    amount: this.value,
                    comment:this.comment,
                    // category: 1
                });

                // alert("lol");
                // this.$emit('addpoints',{
                //     to_user: this.item.id,
                //     from_user: this.user.id,
                //     amount: this.value,
                //     comment:this.comment,
                //     category: 1
                // });

                this.dialog = false;
                this.comment= "";
                this.value = 1



            }
        }

    }
</script>

<style scoped>

</style>