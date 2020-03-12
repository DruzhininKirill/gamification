<template>
        <router-view></router-view>
</template>


<script>
    // import SpecialMenu from "./SpecialMenu";
    export default {
        name: "Special",
        // components: {SpecialMenu},
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
                    path:'usermanagement'
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
                    color: 'green',
                    path: 'inbox'
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




