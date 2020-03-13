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
                    </v-expansion-panel-content>
                </v-expansion-panel>
            </v-expansion-panels>

    </v-card>
</template>

<script>
    export default {
        name: "Inbox",
        data: () => ({
            items: [
                {header: 'Today'},
                {
                    avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
                    title: 'Brunch this weekend?',
                    subtitle: "<span class='text--primary'>Ali Connors</span> &mdash; I'll be in your neighborhood doing errands this weekend. Do you want to hang out?",
                },
                {divider: true, inset: true},
                {
                    avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
                    title: 'Summer BBQ <span class="grey--text text--lighten-1">4</span>',
                    subtitle: "<span class='text--primary'>to Alex, Scott, Jennifer</span> &mdash; Wish I could come, but I'm out of town this weekend.",
                },
                {divider: true, inset: true},
                {
                    avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
                    title: 'Oui oui',
                    subtitle: "<span class='text--primary'>Sandra Adams</span> &mdash; Do you have Paris recommendations? Have you ever been?",
                },
                {divider: true, inset: true},
                {
                    avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
                    title: 'Birthday gift',
                    subtitle: "<span class='text--primary'>Trevor Hansen</span> &mdash; Have any ideas about what we should get Heidi for her birthday?",
                },
                {divider: true, inset: true},
                {
                    avatar: 'https://cdn.vuetifyjs.com/images/lists/5.jpg',
                    title: 'Recipe to try',
                    subtitle: "<span class='text--primary'>Britta Holt</span> &mdash; We should eat this: Grate, Squash, Corn, and tomatillo Tacos.",
                },
            ]}),

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
            }
        }
    }
</script>

<style scoped>

</style>