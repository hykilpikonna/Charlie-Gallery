import {Component, Vue} from 'vue-property-decorator';

import config from '@/content/charlie-config.json';
import Responsive from "@/responsive";
import PhotoSwipper from "@/PhotoSwipper.vue";
import pWaitFor from "p-wait-for";

/**
 * Data class for artworks
 */
class Artwork
{
    rawDate: string;
    title: string;
    format: string;
    description: string;

    width: number;
    height: number;

    constructor(date: string, title: string, format: string, description: string)
    {
        this.rawDate = date;
        this.title = title;
        this.format = format;
        this.description = description;
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
            return require('./assets/' + img);
        }
        catch (e)
        {
            return './404.jpg'
        }
    }

    loadDimensions()
    {
        let img = new Image();
        img.onload = () =>
        {
            this.width = img.width;
            this.height = img.height;
        };
        img.src = this.imgFull;
        return this;
    }

    get isLoaded()
    {
        return this.width != undefined && this.height != undefined;
    }
}

@Component({components: {PhotoSwipper}})
export default class App extends Vue
{
    // Create variable from imported config
    config = config;

    // Parsed artworks
    artworks: Artwork[] = [];

    // Responsive view
    responsive = new Responsive(30, 2);

    // Loaded
    loaded = false;

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
            this.artworks.push(new Artwork(a.date, a.title, a.format, a.description).loadDimensions());
        });

        // Sort by date
        this.artworks.sort((a, b) => b.date.getTime() - a.date.getTime());

        // Check loaded
        pWaitFor(() => this.artworks.every(a => a.isLoaded)).then(() =>
        {
            this.loaded = true;
        });
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

    get swipeItems()
    {
        return this.artworks.map(a =>
        {
            return {
                src: a.imgFull,
                alt: a.title,
                title: a.description ? a.title + ': ' + a.description : a.title,
                w: a.width,
                h: a.height
            }
        })
    }

    onImageClick(index: number)
    {
        if (!this.loaded) return;

        // @ts-ignore
        this.$refs.ps.show(this.swipeItems, {index: index});
    }
}
