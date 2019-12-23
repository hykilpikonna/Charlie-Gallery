<template>
    <div id="app">
        <div id="title" :style="titleStyle">
            <div>{{config.title.text}}</div>
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
            // Set title
            document.title = config.title.text;
        }

        get titleStyle()
        {
            return `height: ${config.title.height}vh;`
                + `background: url(${require('./assets/' + config.title.background)})`;
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
    }
</style>
