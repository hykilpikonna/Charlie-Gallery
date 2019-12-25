<template>
    <div id="app">
        <div id="title" class="no-select" :style="titleStyle">
            <div id="title-text">{{config.title.text}}</div>
            <div id="title-sub">{{config.title.sub}}</div>

            <div id="nav">
                <span v-for="type in config.types" class="nav-item clickable"
                      :class="{selected: type.type === selectedType}"
                      @click="selectedType = type.type">{{type.type}}</span>
            </div>
        </div>

        <div id="width-detector" ref="widthDetect"></div>

        <div id="artwork-container" v-if="selectedType !== 'Home'">
            <el-card class="artwork clickable" :body-style="{padding: '0px',
                    width: responsive.getBlockWidth($refs.widthDetect.clientWidth).toFixed(0) + 'px'}"
                     v-for="(artwork, i) in selectedArtworks" :key="artwork.date + artwork.title">
                <div class="image" :style="{'background-image': `url(${artwork.imgThumb})`}"
                     @click="onImageClick(artwork, i)">
                    <div class="description">
                        <div class="title">{{artwork.title}}</div>
                        <div class="time">{{artwork.rawDate}}</div>
                    </div>
                </div>
            </el-card>
        </div>

        <photo-swipper ref="ps"/>

        <home id="home" v-if="selectedType === 'Home'"/>

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
        position: relative;

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

        #nav
        {
            // Alignment
            position: absolute;
            bottom: 15vh;
            width: 100vw;

            // Font
            font-family: 'Nunito', "Roboto Light", Arial, sans-serif;

            .nav-item
            {
                margin: 5px;

                // Bottom line
                border-bottom: 2px solid;

                // Emphasize
                color: #ffffffa8;
            }

            .nav-item.selected
            {
                color: white;
            }
        }
    }

    #width-detector
    {
        max-width: 1400px;
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

    #home
    {
        margin: 15vh 5vw 5vh 5vw;
        text-align: left;
    }

    #footer
    {
        // Shadow
        box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    }

    .no-select
    {
        -webkit-user-select: none; /* Safari */
        -moz-user-select: none; /* Firefox */
        -ms-user-select: none; /* IE10+/Edge */
        user-select: none; /* Standard */
    }

    .clickable
    {
        // Clickable
        cursor: pointer;
    }
</style>
