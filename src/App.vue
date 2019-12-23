<template>
    <div id="app">
        <div id="title" :style="titleStyle">
            <div id="title-text">{{config.title.text}}</div>
            <div id="title-sub">{{config.title.sub}}</div>
        </div>

        <div id="artwork-container">
            <el-card class="artwork" :body-style="{padding: '0px', width: responsive.getBlockWidth().toFixed(0) + 'px'}"
                     v-for="artwork in artworks">
                <div class="image" :style="{'background-image': artwork.imgThumb}">
                    <div class="description">
                        <div class="title">{{artwork.title}}</div>
                        <div class="time">{{artwork.rawDate}}</div>
                    </div>
                </div>
            </el-card>
        </div>

        <div id="footer" :style="footerStyle">

        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';

    import config from '@/content/charlie-config.json';
    import Responsive from "@/responsive";

    /**
     * Data class for artworks
     */
    class Artwork
    {
        rawDate: string;
        title: string;
        format: string;

        constructor(date: string, title: string, format: string)
        {
            this.rawDate = date;
            this.title = title;
            this.format = format;
        }

        get date()
        {
            return new Date(this.rawDate);
        }

        get imgThumb()
        {
            return this.getURL(`${this.rawDate}.pic.${this.format}`)
        }

        get imgFull()
        {
            return this.getURL(`${this.rawDate}.pic_hd.${this.format}`);
        }

        getURL(img: string)
        {
            try
            {
                return 'url(' + require('./assets/' + img) + ')';
            }
            catch (e)
            {
                return './404.jpg'
            }
        }
    }

    @Component
    export default class App extends Vue
    {
        // Create variable from imported config
        config = config;

        // Parsed artworks
        artworks: Artwork[] = [];

        // Responsive view
        responsive = new Responsive(30, 2);

        /**
         * Initialize
         */
        mounted()
        {
            // Set title
            document.title = config.title.text;

            // Parse artworks
            config.artworks.forEach((a: any) =>
            {
                // Check null case
                if (a.date == null) Error('Error: No date specified.');
                if (a.title == null) a.title = config.artwork.default_title;
                if (a.format == null) a.format = config.artwork.default_format;

                // Add it
                this.artworks.push(new Artwork(a.date, a.title, a.format));
            });

            // Sort by date
            this.artworks.sort((a, b) => b.date.getTime() - a.date.getTime());
        }

        /**
         * Update on resize
         */
        created()
        {
            window.addEventListener("resize", () => this.$forceUpdate());
        }

        /**
         * Style for title
         */
        get titleStyle()
        {
            let dim = `rgba(0, 0, 0, ${config.title.dim / 100})`;
            let url = require('./assets/' + config.title.background);

            return {
                'padding': (config.title.height / 2 - 5) + 'vh 0',
                'background-image': `linear-gradient(${dim}, ${dim}), url(${url})`,
                'color': config.title.text_color,
                'font-family': config.title.font
            };
        }

        /**
         * Style for footer
         */
        get footerStyle()
        {
            return {
                height: config.footer.height + 'vh',
                background: config.footer.background
            }
        }
    }
</script>

<style lang="scss">
    // Global div property
    div
    {
        // Center and scale the image nicely
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
    }

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
        // Alignment
        margin-bottom: -10vh;

        // Shadow
        box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);

        #title-text
        {
            font-size: 46px;
        }

        #title-sub
        {
            font-size: 20px;
        }
    }

    #artwork-container
    {
        // Center
        margin: auto;
        max-width: 1400px;

        .artwork
        {
            display: inline-block;
            margin: 2vh;
            border: none;

            .image
            {
                height: 40vh;
                width: 30vh;

                // Alignment for description
                position: relative;
            }

            .description
            {
                // Color
                background: #00000082;
                color: whitesmoke;

                // Alignment - Bottom align
                padding: 14px 0;
                position: absolute;
                bottom: 0;
                width: 100%;

                .time
                {
                    font-size: 12px;
                }
            }
        }
    }

    #footer
    {
        margin-top: 10vh;

        // Shadow
        box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    }
</style>
