<template>
    <div>
        <div class="loading" v-if="loading">
            Loading...
        </div>

        <div v-if="error" class="error">
            <p>{{ error }}</p>
        </div>
            <div style="background-color:#f1f1f1">
                <a class="btn btn-block btn-social btn-google" href="/redirect">
                    <span class="fa fa-google"></span> Sign in with Google
                </a>
            </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            loading: false,
            loginData: {},
            error: null,
        };
    },
    created() {
        if (this.$route.name === 'auth.logout') {
            this.$store.dispatch('auth/signOut');
            this.$router.push('/auth/login');
            return false;
        }
    },
    methods: {

    }
}
</script>
<style>
.error {
    color: red;
}
</style>
