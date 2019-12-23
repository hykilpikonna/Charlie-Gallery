<template>
    <div id="app">
        <div id="title" :style="titleStyle">
            <div id="title-text">{{config.title.text}}</div>
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

        /**
         * Style for title
         */
        get titleStyle()
        {
            let dim = `rgba(0, 0, 0, ${config.title.dim / 100})`;
            dim = `linear-gradient(${dim}, ${dim})`;

            return `height: ${config.title.height}vh;`
                + `background-image: ${dim}, url(${require('./assets/' + config.title.background)});`
                + `color: ${config.title.text_color}`;
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
        // Center and scale the image nicely
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
    }
</style>
