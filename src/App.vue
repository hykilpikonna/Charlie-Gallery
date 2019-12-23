<template>
    <div id="app">
        <div id="title">
            <div>{{config.title}}</div>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';

    import config from '@/content/charlie-config.json';

    @Component
    export default class App extends Vue
    {
        // Create variable from imported config
        config = config;

        /**
         * Initialize
         */
        mounted()
        {
            document.title = config.title;
        }
    }
</script>

<style lang="scss">
    #app
    {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
    }

    #title
    {
        background: lightblue;
        height: 100vh;
    }
</style>
