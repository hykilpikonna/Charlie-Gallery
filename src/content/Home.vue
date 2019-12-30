<template>
    <div id="home">
        <p>
            这里是我的网站. 写点别的
        </p>
        <p>
            Morbi accumsan magna efficitur maximus aliquam. Cras sed orci libero.
            Suspendisse finibus blandit nisl nec laoreet. Vestibulum vitae luctus augue.
            Ut non purus magna. Cras in iaculis elit.
            Fusce quis odio dictum, accumsan diam sed, rhoncus nulla.
        </p>
        <p>
            Curabitur pretium ultricies erat vel placerat.
            Pellentesque quis leo urna. Vestibulum nec ultricies leo.
            Curabitur sit amet est eget elit tempus efficitur a nec ex.
            Morbi volutpat iaculis nibh, at scelerisque massa.
            Donec pulvinar est id dui suscipit feugiat.
            Integer mauris risus, tincidunt eget accumsan ac, finibus in arcu.
            Pellentesque auctor felis sed ex posuere, sit amet mollis odio sodales.
            Donec ante sapien, luctus vitae commodo non, feugiat vitae orci.
            Sed eu justo porttitor dolor tempus vestibulum.
        </p>
        <p>
            Cras auctor justo at justo placerat lacinia.
            Donec at mauris porttitor, tempor ligula ut, placerat eros.
            Mauris ante nulla, ultrices id euismod vitae, rhoncus ut ligula.
            Nullam ac fermentum nunc. Nullam at eleifend nibh, vel cursus diam.
            Donec vehicula pulvinar nunc nec facilisis. Pellentesque at tempus nisi.
            Donec tincidunt odio nec risus tincidunt, non bibendum libero vehicula.
            Nunc euismod tincidunt magna, vitae ultricies sapien euismod at.
            Ut sed justo ante.
        </p>
        <p>
            Nulla dapibus consequat lorem non euismod. Nulla at ex nisi.
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Vestibulum ac lectus felis.
            Vivamus consectetur diam non diam bibendum imperdiet.
            Sed ut faucibus arcu. Sed sit amet porta lacus.
            Nunc efficitur, nibh eget interdum tempus, metus massa ultricies velit,
            ut tempus ex turpis sit amet turpis. Mauris malesuada vel sem placerat finibus.
        </p>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";

    @Component
    export default class Home extends Vue
    {

    }
</script>

<style lang="scss" scoped>
#home
{
    font-size: 16px;
}
</style>
