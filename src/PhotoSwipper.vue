<template>
    <!-- Root element of PhotoSwipe. Must have class pswp. -->
    <div id="photoswipper" class="pswp" tabindex="-1" role="dialog" aria-hidden="true" ref="pswp">
        <div class="pswp__bg"></div>

        <!-- Slides wrapper with overflow:hidden. -->
        <div class="pswp__scroll-wrap">

            <!-- Container that holds slides.
                PhotoSwipe keeps only 3 of them in the DOM to save memory.
                Don't modify these 3 pswp__item elements, data is added later on. -->
            <div class="pswp__container">
                <div class="pswp__item"></div>
                <div class="pswp__item"></div>
                <div class="pswp__item"></div>
            </div>

            <!-- Default (PhotoSwipeUI_Default) interface on top of sliding area. Can be changed. -->
            <div class="pswp__ui pswp__ui--hidden">

                <div class="pswp__top-bar">
                    <div class="pswp__counter"></div>
                    <button class="pswp__button pswp__button--close" title="Close (Esc)"/>
                    <button class="pswp__button pswp__button--share" title="Share"/>
                    <button class="pswp__button pswp__button--fs" title="Toggle fullscreen"/>
                    <button class="pswp__button pswp__button--zoom" title="Zoom in/out"/>

                    <!-- Preloader demo https://codepen.io/dimsemenov/pen/yyBWoR -->
                    <!-- element will get class pswp__preloader--active when preloader is running -->
                    <div class="pswp__preloader">
                        <div class="pswp__preloader__icn">
                            <div class="pswp__preloader__cut">
                                <div class="pswp__preloader__donut"></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="pswp__share-modal pswp__share-modal--hidden pswp__single-tap">
                    <div class="pswp__share-tooltip"></div>
                </div>

                <button class="pswp__button pswp__button--arrow--left" title="Previous (arrow left)"/>
                <button class="pswp__button pswp__button--arrow--right" title="Next (arrow right)"/>

                <div class="pswp__caption">
                    <div class="pswp__caption__center"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator";
    import PhotoSwipe from 'photoswipe';
    import PhotoSwipeUI_Default from 'photoswipe/dist/photoswipe-ui-default';

    @Component
    export default class PhotoSwipper extends Vue
    {
        ps: PhotoSwipe<any>;

        show(items: any[], options: any)
        {
            this.update(items);
            this.ps = new PhotoSwipe(this.$refs.pswp as any, PhotoSwipeUI_Default, items, options);
            this.ps.init();

            window.addEventListener("resize", () => this.update(this.ps.items));
        }

        update(items: PhotoSwipe.Item[])
        {
            // Update inner width and inner height
            items.forEach(item =>
            {
                item.w = window.innerWidth;
                item.h = window.innerHeight;
            })
        }
    }
</script>

<style lang="scss">
    .pswp img
    {
        max-width: none !important;
        object-fit: contain !important;
    }
</style>
