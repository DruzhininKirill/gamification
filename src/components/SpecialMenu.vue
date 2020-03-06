<template>
    <v-layout row wrap >
        <v-flex xs12 sm6 md4 lg4 v-for="section in sections" :key="section.id">
            <v-card
                    :color="section.color"
                    class="d-flex justify-center  ma-3 "
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
                    path:'usermanagement'
                },
                {
                    id: 2,
                    icon: 'book',
                    name: 'Маркетплейс',
                    color: 'purple',
                    path:'marketmanagement'
                },
                {
                    id: 3,
                    icon: 'add',
                    name: 'Заказы',
                    color: 'orange'
                },
                {
                    id: 4,
                    icon: 'mail',
                    name: 'Почта',
                    color: 'green'
                },
                {
                    id: 5,
                    icon: 'book',
                    name: 'Категории',
                    color: 'blue'
                },

            ]
        }),
    }

</script>




