<template>
    <div>
        <menu-component></menu-component>

        <div>
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
