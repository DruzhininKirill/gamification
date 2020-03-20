<template>
    <v-card
            width="100%"
            class="mx-auto"
    >
        <v-toolbar
                color="primary"
                dark
        >
            <v-app-bar-nav-icon></v-app-bar-nav-icon>

            <v-toolbar-title>Входящие</v-toolbar-title>

            <v-spacer></v-spacer>

            <v-btn icon>
                <v-icon>mdi-magnify</v-icon>
            </v-btn>
        </v-toolbar>


            <v-expansion-panels focusable>
                <v-expansion-panel
                        v-for="(message) in feedback_messages"
                        :key="message.id"
                >
                    <v-expansion-panel-header>
                            <v-img class="v-avatar mr-3" max-width="50px" src="https://randomuser.me/api/portraits/men/78.jpg"></v-img>
                        <v-card-text>
                            <div class="subheading">
                                {{message.topic}}
                               <span class="float-right grey--text"> {{dateformat(message.created_at)}}</span>
                            </div>
                            <div class="grey--text">{{message.author.first_name}} {{message.author.last_name}}</div>

                        </v-card-text>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                          <span class='text&#45;&#45;primary'> {{message.text}}</span>
                          <div>
                              <a :href=malitoGen(message)>Ответить</a>
                          </div>
                    </v-expansion-panel-content>
                </v-expansion-panel>
            </v-expansion-panels>

    </v-card>
</template>

<script>
    export default {
        name: "Inbox",
        data: () => ({

      }),

        beforeCreate() {
            this.$store.dispatch("getallusers");
            this.$store.dispatch("get_feedback");
        },

        computed: {
            users_list(){
                return this.$store.getters.users_list
            },
            user(){
                return this.$store.getters.logged_user
            },
            feedback_messages(){
                return this.$store.getters.feedback_messages
            },
            messages(){
                return null
            }

        },
        methods:{
            dateformat(date){
                let date2 = new Date(date);
                let str = date2.toDateString() + " "+ date2.getHours()+":"+date2.getMinutes()
                return str
            },
            malitoGen(message){
                let author = message.author
                let href = 'mailto:'+author.email+'?subject='+message.topic+'&body='+author.first_name+', спасибо за обращение'
                return href
            }
        }
    }
</script>

<style scoped>

</style>