<template>
    <div class="container-box">
        <div class="list-title">
            <p class="round-title">Раундов в библиотеке: <b>{{ round_amount }}</b></p><button class="refresh-list"
                @click="refresh">Обновить</button>
        </div>
        <div class="list-container">
            <div class="progressbar" v-if="loading">
                <div class="progressbar" v-if="loading">
                    <div class="progress" :style="{ width: progress + '%' }"></div>
                </div>
            </div>
            <div class="list-item" v-for="(file, index) in files" :key="index">
                <p class="round-title">Раунд #{{ fileNameWithoutExtension(file) }}</p>
                <p class="round-desc">IceBox Station, <u>15.09.24</u> @ 17:32:11 - 20:13:29</p>
                <div class="copy"><img src="../assets/copy.svg"></div>
            </div>
            <div class="end-line"></div>
            <p class="end">Дальше ничего нет...</p>
        </div>
    </div>

</template>

<script>
const axios = require('axios')

export default {
    data() {
        return {
            files: [],
            round_amount: "загрузка...",
            loading: true,
            progress: 5
        }
    },
    mounted() {
        axios.get('http://localhost:8000/api/rounds')
            .then(response => {
                this.round_amount = response.data.length;
                this.addFiles(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    },
    methods: {
        fileNameWithoutExtension(fileName) {
            return fileName.split('.').slice(0, -1).join('');
        },
        refresh() {
            this.files = []
            this.current = 0;
            this.progress = 5;
            this.loading = true;
            axios.get('http://localhost:8000/api/rounds')
                .then(response => {
                    this.round_amount = response.data.length;
                    this.addFiles(response.data);
                })
                .catch(error => {
                    console.error(error);
                });
        },
        addFiles(files) {
            this.loading = true;
            const total = files.length;
            let current = 0;

            const interval = setInterval(() => {
                if (current < total) {
                    this.files.push(files[current]);
                    this.progress = (current / total) * 100;
                    current++;
                } else {
                    this.progress = (current / total) * 100;
                    current++;
                    clearInterval(interval);
                    setTimeout(() => {
                        this.loading = false;
                    }, 200);
                }
            }, 100);
        }
    }
}
</script>

<style scoped>
.progress {
    position: relative;
    overflow: hidden;
    height: 10px;
    background-image: repeating-linear-gradient(-45deg, rgb(23, 44, 44), rgb(23, 44, 44) 25px, rgb(172, 172, 172) 25px, rgb(172, 172, 172) 50px);
    animation: progress 1s linear infinite;
    background-size: 170% 100%;
    transition: 0.2s;
}

.progressbar {
    background-color: rgb(42, 61, 55);
    padding: 10px;
    display: flex;
    flex-direction: column;
    height: fit-content;
}

.progressbar p {
    position: relative;
    margin-top: 0px;
    margin-bottom: 10px;
    margin-left: auto;
    margin-right: auto;
}

@keyframes progress {
    from {
        background-position: -70px 0;
    }

    to {
        background-position: 0px 0px;
    }
}

.copy {
    width: fit-content;
    margin-top: -40px;
    margin-right: 10px;
    margin-left: auto;
    background-color: rgb(42, 61, 55);
    height: 23px;
    width: 23px;
    padding-left: 2px;
    padding-top: 2px;
    transition: 0.3s;
}

.copy img {
    height: 20px;
}

@font-face {
    font-family: fm;
    src: url(../assets/FeatureMono-Medium.ttf);
}

.list-item {
    height: 40px;
    padding-left: 20px;
    background-color: rgb(42, 61, 55);
    display: inline-block;
    transition: 0.3s;
    cursor: pointer;
}

.list-item:hover {
    background-color: rgb(59, 83, 76);
    transform: translateY(-2px);
}

.refresh-list:hover {
    background-color: rgb(59, 83, 76);
    color: aliceblue;
    transform: translateY(-2px);
}

.list-item:hover>.copy {
    background-color: rgb(59, 83, 76);
}

.copy:hover {
    background-color: rgb(86, 139, 124);
}

.end {
    color: rgb(141, 155, 144);
    font-size: 17px;
    margin-bottom: 0px;
    background-color: rgb(23, 44, 44);
    width: fit-content;
    height: 25px;
    padding-left: 15px;
    padding-right: 10px;
    margin-right: auto;
    margin-left: auto;
    margin-top: -25px;
    z-index: 2;
}

.end-line {
    width: 100%;
    border-bottom: 3px solid rgb(141, 155, 144);
    margin-top: 15px;
    position: relative;
}

.round-desc {
    width: fit-content;
    font-size: 15px;
    line-height: 22px;
    color: rgb(141, 155, 144);
    position: relative;
    margin-top: -50px;
    margin-right: 50px;
    margin-left: auto;
}

.round-title {
    line-height: 40px;
    margin-top: 0px;
    position: relative;

}

.list-container {
    display: flex;
    flex-direction: column;
    row-gap: 10px;
}

.refresh-list {
    background-color: rgb(30, 58, 58);
    border: none;
    color: rgb(141, 155, 144);
    font-family: fm;
    font-size: 15px;
    height: 30px;
    margin-top: 5px;
    width: 100px;
    margin-left: auto;
    transition: 0.3s;
    cursor: pointer;
}

.list-title {
    display: flex;
    flex-direction: row;
    height: 50px;
    margin-top: -10px;
}

.container-box {
    color: rgb(233, 233, 233);
    font-family: fm;
    font-size: 20px;
    margin-top: 120px;
    position: absolute;
    background-color: rgb(23, 44, 44);
    width: 65vw;
    margin-left: 15vw;
    padding-left: 20px;
    padding-top: 20px;
    padding-right: 20px;
    padding-bottom: 15px;
    transition: 0.2s ease-out;
    height: fit-content;
}
</style>