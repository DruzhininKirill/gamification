<template>
    <v-layout column class="align-center">
        <div class="text-center ma-3"  >
            <h1>Обратная связь</h1>
            <div class="subtitle-1" style="max-width: 800px">
                Если у тебя возникли вопросы, пожелания или предложения по работе нашей системы,
                заполни форму ниже, и мы обязательно ответим тебе в бижайшее время
            </div>
        </div>


        <v-card
             flat
             width="600px"
             outlined
             class="ma-3"

        >

        <v-form
                ref="form"
        >
            <v-card-text>

            <v-text-field
                    outlined
                    v-model="title"
                    label="Тема"
                    required
            ></v-text-field>


            <v-textarea
                    outlined
                    v-model="text"
                    :rules="[v => !!v || 'Поле не может быть пустым']"
                    label="Текст"
                    hint="Любые пожелания или замечания по работе сервиса"
                    required
            ></v-textarea>


            </v-card-text>
            <v-card-actions class="justify-center" >

            <v-btn
                    color="primary"
                    @click="send_feedback"
            >
                Отправить
            </v-btn>
            </v-card-actions>
        </v-form>
        </v-card>
    </v-layout>



</template>

<script>
    export default {
        name: "Feedback",
        data:()=>({
            valid:false,
            text:"",
            title:"",
    }),
        methods:{
            send_feedback(){
                let message = {
                    "topic": this.title,
                    "text": this.text,

                };
                this.$store.dispatch("send_feedback", message);
            }
        }
    }
</script>

<style scoped>

</style>