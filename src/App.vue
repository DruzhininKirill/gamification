<template>
  <v-app id="inspire">
<!--    <div v-if="loggedIn">-->
<!--    <v-navigation-drawer-->
<!--            v-model="drawer"-->
<!--            app-->
<!--    >-->

<!--      <v-list-item>-->
<!--        <v-list-item-avatar>-->
<!--          <v-img src="https://randomuser.me/api/portraits/men/78.jpg"></v-img>-->
<!--        </v-list-item-avatar>-->

<!--        <v-list-item-content>-->
<!--&lt;!&ndash;          <v-list-item-title >{{user().first_name}} {{user().last_name}}</v-list-item-title>&ndash;&gt;-->
<!--          <v-list-item-title >{{user_fio()}}</v-list-item-title>-->
<!--        </v-list-item-content>-->
<!--      </v-list-item>-->

<!--      <v-divider></v-divider>-->


<!--      <v-list dense>-->
<!--        <v-list-item link to="/">-->
<!--          <v-list-item-action>-->
<!--            <v-icon>home</v-icon>-->
<!--          </v-list-item-action>-->
<!--          <v-list-item-content>-->
<!--            <v-list-item-title>Личный кабинет</v-list-item-title>-->
<!--          </v-list-item-content>-->
<!--        </v-list-item>-->

<!--          <v-list-item link to="/users">-->
<!--              <v-list-item-action>-->
<!--                  <v-icon>supervised_user_circle</v-icon>-->
<!--              </v-list-item-action>-->
<!--              <v-list-item-content>-->
<!--                  <v-list-item-title>Коллеги</v-list-item-title>-->
<!--              </v-list-item-content>-->
<!--          </v-list-item>-->

<!--        <v-list-item link to="/rating">-->
<!--          <v-list-item-action>-->
<!--            <v-icon>stars</v-icon>-->
<!--          </v-list-item-action>-->
<!--          <v-list-item-content>-->
<!--            <v-list-item-title>Рейтинг</v-list-item-title>-->
<!--          </v-list-item-content>-->
<!--        </v-list-item>-->

<!--        <v-list-item link to="/shop">-->
<!--          <v-list-item-action>-->
<!--            <v-icon>store</v-icon>-->
<!--          </v-list-item-action>-->
<!--          <v-list-item-content>-->
<!--            <v-list-item-title>Маркетплейс</v-list-item-title>-->
<!--          </v-list-item-content>-->
<!--        </v-list-item>-->

<!--        <v-list-item link to="/transactions">-->
<!--          <v-list-item-action>-->
<!--            <v-icon>history</v-icon>-->
<!--          </v-list-item-action>-->
<!--          <v-list-item-content>-->
<!--            <v-list-item-title>История операций</v-list-item-title>-->
<!--          </v-list-item-content>-->
<!--        </v-list-item>-->

<!--        <v-list-item link to="/feedback">-->
<!--          <v-list-item-action>-->
<!--            <v-icon>feedback</v-icon>-->
<!--          </v-list-item-action>-->
<!--          <v-list-item-content>-->
<!--            <v-list-item-title>Обратная связь</v-list-item-title>-->
<!--          </v-list-item-content>-->
<!--        </v-list-item>-->

<!--        <v-list-item link to="/special" v-if="permissioned">-->
<!--          <v-list-item-action>-->
<!--            <v-icon>settings</v-icon>-->
<!--          </v-list-item-action>-->
<!--          <v-list-item-content>-->
<!--            <v-list-item-title>Cпециальные возможности</v-list-item-title>-->
<!--          </v-list-item-content>-->
<!--        </v-list-item>-->

<!--        <v-list-item link v-if="loggedIn" v-on:click="logout">-->
<!--          <v-list-item-action  >-->
<!--            <v-icon>exit_to_app</v-icon>-->
<!--          </v-list-item-action>-->
<!--          <v-list-item-content>-->
<!--            <v-list-item-title>Выход</v-list-item-title>-->
<!--          </v-list-item-content>-->
<!--        </v-list-item>-->

<!--      </v-list>-->
<!--    </v-navigation-drawer>-->

<!--    <v-app-bar-->
<!--            app-->
<!--            color="indigo"-->
<!--            dark-->
<!--    >-->
<!--      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />-->

<!--      <v-toolbar-title>Gamification</v-toolbar-title>-->
<!--        <v-spacer></v-spacer>-->
<!--        <a href="https://www.muranosoft.ru/">-->
<!--            <v-img  :src="logo" max-width="50px" class="ma-3"  ></v-img>-->
<!--        </a>-->


<!--    </v-app-bar>-->

<!--    <v-content>-->
<!--      <v-container-->
<!--              class="fill-height"-->
<!--              fluid-->
<!--      >-->
          <transition name="component-fade" mode="out-in">
              <router-view></router-view>
          </transition>


<!--      </v-container>-->
<!--    </v-content>-->
<!--    </div>-->
<!--    <div v-else>-->
<!--      <Login></Login>-->
<!--    </div>-->
    <v-footer
            color="indigo"
            app
    >
      <span class="white--text">&copy; 2020 DKA</span>
    </v-footer>
  </v-app>
</template>

<script>
  // import Login from "./components/Login";
  export default {
    // components: {Login},
    props: {
      source: String,
    },
    data: () => ({
        transition:'',
      drawer: true,
      logo: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALQAAABZCAMAAACgyf5cAAAAsVBMVEUAAAD/////////////////////////" +
          "/////////////////////////////////////////////////////////////////////////////////////////////////////////////" +
          "/////////////////////////////////////////////////////////////////////////////////////////////////+3mHKcAAAAOnR" +
          "STlMAkfuMmCDv4AQS8+lMXZU828MI5LtAMncM+NXRnX4uKSamNxahHWRURPVwWMe/s6qCaq6HGg4ry0lQLT9VaQAABwVJREFUaN7M2Ol6ojA" +
          "UBuAjKrK44i6Ca7VqBbWOtt/9X9g8A4wUYySp2KfvX0VO4lkC9Czl4Vk1VFU1Smd7683zzn5ZG/foN9O3uKFv2l5u/zGy6FfycIdS2uYWp18X" +
          "ebGPVGYrvyzST9KKOt1xUiBEsauVI/0It7s1V2rdfyWuBoQpDadGT9bJ1/Gf94c4ZmfIKFVrGj3LyBngqxbxaC1AMu42PUFvwQZSI64WZA2cM" +
          "WXLrRpgdSiLvY61lhpl5jWOgEmPtKi3leF86DXe6k1DQapmV6csaBubc4Mxxbg9RHWjn+kV3fbnYjff1lXcYRReHg95UQdHWqvSwyvNGdNcps" +
          "tuYdsEhzLp0EMWTfCs07PqbhZZo8/3A2dH/AeG5ccAXC1Kl0PAIS5tvKm+GWAVZvQtoxZuMJtx50ijh99VTnTX7CNvM0Xa75I8Kw+WOdnMwvq" +
          "ak4g1RL9crMxNJNVfSdKniWt2vq0RleONTmdFOeuSAK1dHSDB10nCHx9X6rvoxm/4xyMx7wgMSdC0WsIX6lKiAFUkqIXLiaaNQIXEnBAwiiSsP" +
          "Vkh5lskRMshobH5cmE+XIXwAGjEixSmL864aNZIwNjGF2pulFhQPVwHMY7t9gux8nGDlDEdxtvdFUiNFWLNtUUJHQR2TPF7CqB47GCvIB6LUm" +
          "aOiYiv0X1dxAYVXg9bUlLHQIjpUh2EPkmata8jZB/pniou7DL/8xolvKiIrEaUpBvxfyyvEoVtusSlHRK7zD/bn26M69vNTRsw80XKIkwSgztoe" +
          "g1E1D1F2BDY5mGZuFD1qytsBLb0TZpj4J9yWsw5i1cdYXilXrIKV4i5t3f6TN82m/CjthoIvblEKUHr/Pcc09s7bVr0fbUgtT/46aqsie4GzQ44" +
          "XcVF//iEoEnbAVhN6dokyr0ipQXN5oDHP2b3mnHQjzjZgDG+PbnWKeml3mzHbUTYzDv2EbDpUTlgoCc7SzgAp2KneuwpaYfIO+eRC1t6WNmAlxj" +
          "1Qf0fLEpz5nTd/YpTD12EJvS44xnOdbU4lM5HYMAmzrpQWL8QY46QQ1kYYpMczhWxxGLmuFA+oUKZyKNIoSWA/iuJ2EDuKFFGaDWmbOy8+KWK2ZF" +
          "7yT8gMT5CNmVlv/zf7UxX8kkESxIQz8odZcUKCscFVJdEdaVaWC4e7tnyoUj85KgvsdUdJV5ipmrxFJPK0oFGqQ6ILChbB6xJRhuRPKWpIGJrlCl" +
          "XelZ5EEyQk/qsjfalj1+uglBKKeh/27fT5kSBIAzAzSGCJ4qIB6gYPFEXxKjp///D1lGQGSBmda0ttoqn8klBXgecQbtTxlAL3mum6fAsD0Pl0qOpaU" +
          "v9+v5englPk08YerAkHYYYCeDNrAM8b4p39e82qWJkC+/22qRfj1PbCqTJAd6pH5ATRhxqZfQgwdWop6eQGxbGpIYuU6ugV8ZYvwk54iOtugt897zwLV" +
          "tjH8/ROBO1Pv7odICcOXTwBxzk0FzCB9RcXc4xRajgN6o+5JZiqJkX8zx33WCsZqLcutp4R/gPlM6+YP+yL3+Bv8zNClgoFAqFQqFQKPwr7t7hPhIP2Q" +
          "6nwM3CFn+59Ncsx2xEm09tkWY25gqwlrboCD2gtQPb0YFyME17ARHdM0VGUJMhRUTEVhsIuk43oZ4WqZv+ClXUr2NSeQa0zzJeBOn6YkAFGdPf3gVMsyG" +
          "lkewg+GJaJATykmzPEj+hQvfLoVtDt5dV8Kil38hgyoQWolGXMI0fZYfGPVWkeCr0Bno3srynNyV8RH4rIWpKIjQRZIXukmHQP0sR5UjOi54Vus/H" +
          "LaRT6bnQLfZXPi5RODhdX8DJCI2DUWZotg+mR7ZuZoXukDGy79WS/fa10F4idIcM0u0anrOhd2skrOyRHv9Z6HYnPF5JIyd8/0ToYVdfEnrTH" +
          "bKbWmEYlwQZMaE7oGsk9Wb8eugNtAfXSaJURlQVaD0RmsYMaZMn4aJPzZYJrcrQM5Ew/iI0KCoJt0PUSvBaaJ5HRJNt+l7Ik8mkTeKjQYcewE" +
          "VNug62PHs5NIyrSKy68Fzo4bE5csm+lbkynbDTPy/xF1hZ4cUyGRqU64yoeauXQ0NXIjtMISO0wDaN8ePkB/HQIkdfMN0eSarChibqlespej" +
          "R7qA9DwxKRP0MyNIeIO/1cu9HnFcRViQ5NrWSDLoQOl2QVa23crA2NzHvp0KDskWBC875ei+iLKj1Pp0NDTXIhFdrClCHQoZnm64Cq51vJopj" +
          "LhA7N+/jjiniEJDHdLLOh7j0+1O//oWhOhYbSCS+qbvRON0Db3+u3SvU6e9zNyHTbeHTvYULKwjHXwPJNMVAgpNS9BhcL1lOIdE3OifftWSb" +
          "H7UWyo+dw5ghoM04UbneLbUs0jcThnK94plwLDY4iGEu4+w2eDaflmU8DXgAAAABJRU5ErkJggg=="
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



    },

  }
</script>
<style>
    .component-fade-enter-active, .component-fade-leave-active {
        transition: opacity .3s ease;
    }
    .component-fade-enter, .component-fade-leave-to
        /* .component-fade-leave-active below version 2.1.8 */ {
        opacity: 0;
        transition: .3s;
    }
</style>