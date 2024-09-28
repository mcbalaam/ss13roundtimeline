<template>
    <div class="navbar">
        <div class="icon" @click="navigateTo($event, 'main')">
            <img src="../assets/logo.png" </div>
            <div class="button" @click="navigateTo($event, 'rounds')">Раунды</div>
            <div class="button">Вики</div>
            <div class="button">Космогалерея</div>
            <div class="button">GitHub</div>
            <div class="button">Поддержать</div>
        </div>
</template>

<script>
export default {
    name: 'Navigbar',
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

.navbar {
    background-color: rgb(23, 44, 44);
    height: 100px;
    width: calc(100% - 15px);
    position: absolute;
    margin-left: 0px;
    display: flex;
    flex-direction: row;
}

img {
    height: 80px;
    margin-top: 10px;
    margin-left: 10px;
}

.icon {
    height: 100px;
    width: 100px;
    cursor: pointer;
    transition: 0.3s;
}

.icon:hover {
    background-color: rgb(33, 63, 63);
}

.button {
    color: rgb(128, 136, 129);
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
    background-color: rgb(33, 63, 63);
}
</style>
