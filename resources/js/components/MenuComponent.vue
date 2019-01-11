<template>
    <header>
        <b-container>
            <b-row>
                <b-col lg="4" md="4" sm="4" cols="12">
                    <h1>Online Library</h1>
                </b-col>
                <b-col lg="4" md="4" sm="4" cols="12">
                    <router-link :to="{ name: 'home' }">Home</router-link>
                </b-col>
                <b-col lg="4" md="4" sm="4" cols="12">
                    <div v-if="loggedUserData && loggedUserData.id">
                        <!--<p>Logged As</p>-->
                        <div class="top-info">
                            <b-row class="no-gutters">
                                <b-col lg="3" class="text-center">
                                    <img :src="loggedUserData.avatar" class="avatar" alt="Avatar" />
                                </b-col>
                                <b-col lg="8">
                                    <p class="full-name">{{loggedUserData.name}}</p>
                                    <p class="top-email">{{loggedUserData.email}}</p>
                                </b-col>
                                <b-col lg="1">
                                    <router-link :to="{ name: 'auth.login' }" v-if="loggedUserData === null || loggedUserData.id === undefined">Login</router-link>
                                    <router-link :to="{ name: 'auth.logout' }" v-else><img src="../../img/icons/logout.png" class="logout-btn" alt=""></router-link>
                                </b-col>
                            </b-row>
                        </div>
                    </div>
                </b-col>
            </b-row>
        </b-container>
    </header>
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
<style>
    @import '../../css/styles.css';
</style>
