<template>
    <div id="app">
        <div id="title" :style="titleStyle">
            <div id="title-text">{{config.title.text}}</div>
            <div id="title-sub">{{config.title.sub}}</div>
        </div>

        <div id="artwork-container" ref="artworkContainer">
            <el-card class="artwork" :body-style="{padding: '0px',
                    width: responsive.getBlockWidth($refs.artworkContainer.clientWidth).toFixed(0) + 'px'}"
                     v-for="(artwork, i) in artworks" :key="artwork.date + artwork.title">
                <div class="image" :style="{'background-image': `url(${artwork.imgThumb})`}" @click="() => onImageClick(i)">
                    <div class="description">
                        <div class="title">{{artwork.title}}</div>
                        <div class="time">{{artwork.rawDate}}</div>
                    </div>
                </div>
            </el-card>
        </div>

        <photo-swipper v-if="loaded" ref="ps"/>

        <div id="footer" :style="footerStyle">

        </div>
    </div>
</template>

<script lang="ts" src="./App.ts"/>

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
                // width: 30vh; dynamically updated

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
        // Shadow
        box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    }
</style>
