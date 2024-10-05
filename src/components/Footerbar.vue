<template>
    <div class="foobar">
        <div class="icon" @click="navigateTo($event, 'main')">
            <img src="../assets/logo.png">
        </div>
        <div class="about">
            <p>Ark Station is a downstream of <a href="#">/tg/ Station</a> under the GNU Public Licence. All
                rights
                reserved.</p>
        </div>
        <div class="website">
            <p><a href="#">balaam_</a></p>
            <p>ArkStation13, 2024</p>
        </div>
        <div class="push"></div>
    </div>
</template>

<script>
export default {
    name: 'Footerbar',
    methods: {
        navigateTo(event, path) {
            this.$router.push({ name: path });
        }
    }
}

</script>

<style scoped>
@font-face {
    font-family: fm;
    src: url(../assets/FeatureMono-Medium.ttf);
}

.website {
    margin-left: auto;
    text-align: end;
    margin-top: 5px;
}

.website p {
    line-height: 10px
}

.about {
    margin-left: 20px;
    width: 50%;
    line-height: 25px;
}

.push {
    height: 90px;
    width: 20px;
}

.footer-container {
    grid-row: 2;
}

.foobar {
    background-color: #32303b;
    height: 80px;
    width: 100%;
    display: flex;
    flex-direction: row;
    color: rgb(165, 165, 165);
    font-family: fm;
    font-size: 16px;
    line-height: 16px;
    margin-top: auto;
    margin-bottom: 0px;
}

img {
    height: 60px;
    margin-top: 10px;
    margin-left: 10px;
}

a {
    color: rgb(128, 160, 160);
}

a:hover {
    color: rgb(181, 214, 216);
}

.icon {
    height: 80px;
    width: 80px;
    cursor: pointer;
    transition: 0.3s;
}

.icon:hover {
    background-color: #6f7e8a;
}

.button {
    color: rgb(165, 165, 165);
    font-family: fm;
    font-size: 22px;
    width: fit-content;
    height: 100%;
    text-align: center;
    padding-left: 40px;
    padding-right: 40px;
    line-height: 95px;
    cursor: pointer;
    transition: 0.3s;
}

.button:hover {
    background-color: #6f7e8a;
}
</style>
