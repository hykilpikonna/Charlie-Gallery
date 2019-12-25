import {Component, Vue} from 'vue-property-decorator';

import config from '@/content/config.json';
import Responsive from "@/responsive";
import PhotoSwipper from "@/PhotoSwipper.vue";

/**
 * Data class for artworks
 */
class Artwork
{
    rawDate: string;
    title: string;
    description: string;

    type: any;
    video: boolean;

    url: string;
    imgThumb: string;

    constructor(type: any, json: any)
    {
        // Check null case
        if (json.date == null) Error('Error: No date specified.');
        if (json.title == null) json.title = config.post.default_title;
        if (json.format == null) json.format = config.post.default_format;
        if (type.video == null) type.video = false;
        if (json.video == null) json.video = type.video;

        // Check image null case
        let base = json.date.split(' ').join('-') + '-' + json.title.split(' ')[0].toLowerCase() + '/';
        if (json.file == null) json.file = base + 'public.' + json.format;
        if (json.thumbnail == null) json.thumbnail = base + 'thumb.' + json.format;

        // Check image loadability
        let thumb = this.getURL(json.thumbnail);
        if (thumb == null) Error('Error: File not found. ' + json.thumbnail);
        let url;
        if (!json.video)
        {
            url = this.getURL(json.file);
            if (url == null) Error('Error: File not found.' + json.file);
        }

        // Assign
        this.rawDate = json.date;
        this.title = json.title;
        this.description = json.description;

        this.type = type;
        this.video = json.video;

        this.url = json.video ? json.file : url;
        this.imgThumb = thumb;
    }

    get date()
    {
        return new Date(this.rawDate);
    }

    getURL(img: string)
    {
        try
        {
            return require('./assets/' + img);
        }
        catch (e)
        {
            return null;
        }
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

    // Selected type
    selectedType = config.post.default_type;

    /**
     * Initialize
     */
    mounted()
    {
        // Set title
        document.title = config.title.text;

        // Parse artwork types
        config.types.forEach((type: any) =>
        {
            // Parse artworks
            type.posts.forEach((a: any) =>
            {
                this.artworks.push(new Artwork(type, a));
            })
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

    swipeItems()
    {
        return this.artworks.map(a =>
        {
            return {
                src: a.url,
                alt: a.title,
                title: a.description ? a.title + ': ' + a.description : a.title
            }
        })
    }

    onImageClick(index: number)
    {
        // @ts-ignore
        this.$refs.ps.show(this.swipeItems(), {index: index});
    }
}
