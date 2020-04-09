<template>
    <v-layout row wrap >
        <v-flex xs12 sm6 md4 lg4 v-for="section in sections" :key="section.id">
            <v-card
                    :color="section.color"
                    class="d-flex justify-center  ma-3 "
                    :disabled="$store.getters.logged_user.is_teamlead && !$store.getters.logged_user.is_staff && section.staffOnly"
                    dark
                    height="250"
                    hover
                    link :to="'/special/'+section.path"
            >

                <div class="align-self-center d-flex ">

                    <v-icon  >{{section.icon}}</v-icon>
                    <div>{{ section.name}}</div>
                </div>

            </v-card>


        </v-flex>
    </v-layout>

</template>


<script>
    export default {
        name: "SpecialMenu",
        data: () => ({
            sections:[
                {
                    id: 1,
                    icon: 'person',
                    name: 'Пользователи',
                    color: 'red',
                    path:'usermanagement',
                    staffOnly: true,
                },
                {
                    id: 2,
                    icon: 'storefront',
                    name: 'Маркетплейс',
                    color: 'purple',
                    path:'marketmanagement',
                    staffOnly: true,
                },
                {
                    id: 3,
                    icon: 'add',
                    name: 'Заказы',
                    color: 'orange',
                    path: 'orders',
                    staffOnly: true,
                },
                {
                    id: 4,
                    icon: 'mail',
                    name: 'Почта',
                    color: 'green',
                    path: 'inbox',
                    staffOnly: true,
                },
                {
                    id: 5,
                    icon: 'category',
                    name: 'Категории',
                    color: 'blue',
                    path: 'promotions'
                },

            ]
        }),
    }

</script>




