<template>
  <v-app id="inspire">
    <div v-if="loggedIn">
    <v-navigation-drawer
            v-model="drawer"
            app
    >

      <v-list-item>
        <v-list-item-avatar>
          <v-img src="https://randomuser.me/api/portraits/men/78.jpg"></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
<!--          <v-list-item-title >{{user().first_name}} {{user().last_name}}</v-list-item-title>-->
          <v-list-item-title >{{user_fio()}}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>


      <v-list dense>
        <v-list-item link to="/">
          <v-list-item-action>
            <v-icon>home</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Личный кабинет</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

          <v-list-item link to="/users">
              <v-list-item-action>
                  <v-icon>supervised_user_circle</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                  <v-list-item-title>Коллеги</v-list-item-title>
              </v-list-item-content>
          </v-list-item>

        <v-list-item link to="/rating">
          <v-list-item-action>
            <v-icon>score</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Рейтинг</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item link to="/shop">
          <v-list-item-action>
            <v-icon>shop</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Маркетплейс</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item link to="/transactions">
          <v-list-item-action>
            <v-icon>money</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>История операций</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item link to="/feedback">
          <v-list-item-action>
            <v-icon>feedback</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Обратная связь</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item link to="/special" v-if="permissioned">
          <v-list-item-action>
            <v-icon>settings</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Cпециальные возможности</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item link v-if="loggedIn" v-on:click="logout">
          <v-list-item-action  >
            <v-icon>exit_to_app</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Выход</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

      </v-list>
    </v-navigation-drawer>

    <v-app-bar
            app
            color="indigo"
            dark
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>Gamification</v-toolbar-title>
    </v-app-bar>

    <v-content>
      <v-container
              class="fill-height"
              fluid
      >
        <router-view></router-view>

      </v-container>
    </v-content>
    </div>
    <div v-else>
      <Login></Login>
    </div>
    <v-footer
            color="indigo"
            app
    >
      <span class="white--text">&copy; 2019</span>
    </v-footer>
  </v-app>
</template>

<script>
  import Login from "./components/Login";
  export default {
    components: {Login},
    props: {
      source: String,
    },
    data: () => ({
      drawer: true,
    }),
    computed: {
      loggedIn() {
        return this.$store.getters.loggedIn;
      },
      permissioned() {
        return this.$store.getters.permissioned;
      },
      user() {
        return this.$store.getters.logged_user;
      },


    },
    methods:{
      logout(){
        this.$store.dispatch('destroyToken')

      },
        user_fio(){
          if (this.user.first_name == undefined) return ' ';
          else return this.user.first_name + " " +this.user.last_name
        }



    }
  }
</script>