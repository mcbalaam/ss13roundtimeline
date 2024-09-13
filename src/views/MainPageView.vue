<template>
    <div class="title-block">
        <div class="title-text-block">
            <b class="title">Ark  <b class="glyph">{{ glyph }}</b><br>Station</b>
            <br>
            <b class="hostname">Hosted by <a href="#">Krashly</a> @ <a href="#">BlueMoon</a></b>
        </div>
    </div>
</template>
  
<script>
const glyphs = ['>.>', 'OwO', '0_o', '~>', '@w@', '>~<', '^o^']

export default {
    name: 'MainPageView',
    components: {

    },
    data() {
        return {
            glyph: glyphs[Math.floor(Math.random()*glyphs.length)]
        }
    }
}
</script>

<style scoped>
    @font-face {
        font-family: fml;
        src: url(../assets/FeatureMono-Light.ttf);
    }

    .title-block {
        display: grid;
        grid-template-columns: [left] 20% [center] 60% [right] 20% [end];
        grid-template-rows: [spacing-top] 250px [content] 200px [socials] 200px [spacing-bottom] 50px [end];
    }

    .title-text-block {
        font-family: fml;
        color: rgb(233, 233, 233);

        text-align: left;
        grid-column: center;
        grid-row: content;
        position: relative;
        height: fit-content;
        width: fit-content;
    }

    .glyph {
        color: rgb(134, 134, 134);
        font-size: 70px;
        line-height: 80px;
    }

    .title-text-block .title {
        font-size: 100px;
        line-height: 0.8;
    }

    .title-text-block .hostname {
        font-size: 30px;
        line-height: 1.2;
    }

    a {
        color: rgb(128, 160, 160);
    }
    
    a:hover {
        color: rgb(181, 214, 216);
    }
</style>
  