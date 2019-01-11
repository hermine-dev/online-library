<template>
    <div>
        <h1>Online Library</h1>

        <menu-component></menu-component>

        <div class="container">
            <router-view></router-view>
        </div>
    </div>
</template>
<script>
    import MenuComponent from '../components/MenuComponent'

    export default {
        name: 'OnlineLibrary',
        components: {
            MenuComponent
        },

    }
</script>
