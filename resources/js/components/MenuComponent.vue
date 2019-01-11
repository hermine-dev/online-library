<template>
    <div>
        <div v-if="loggedUserData && loggedUserData.id">
            <p>Logged As</p>
            <img :src="loggedUserData.avatar" alt="Avatar" />
            <p>{{loggedUserData.name}}</p>
            <p>{{loggedUserData.email}}</p>
        </div>
        <div>
            <router-link :to="{ name: 'home' }">Home</router-link> |
            <router-link :to="{ name: 'auth.login' }" v-if="loggedUserData === null || loggedUserData.id === undefined">Login</router-link>
            <router-link :to="{ name: 'auth.logout' }" v-else>Logout</router-link>
        </div>
    </div>

</template>

<script>
    export default {
        name: 'MenuComponent',
        data() {
            return {

            };
        },
        computed: {
            loggedUserData () {
                return this.$store.getters['auth/getUserData'];
            }
        }
    }
</script>
