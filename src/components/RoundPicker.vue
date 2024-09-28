<template>
    <div class="container-box">
        <div class="list-title">
            <p class="round-title">Раундов в библиотеке: <b>{{ round_amount }}</b></p><button class="refresh-list"
                @click="refresh"><img class="reload" src="../assets/reload.svg">Обновить</button>
        </div>
        <div class="list-container">
            <div class="progressbar" v-if="loading" @beforeLeave="beforeLeave">
                <div class="pgbdwn">
                    <div class="progress" :style="{ width: progress + '%' }"></div>
                </div>
            </div>
            <div class="list-item" v-for="(file, index) in files" :key="index"
                @click="navigateTo($event, file.roundId)">
                <p class="round-title">Раунд #{{ file.roundId }}</p>
                <p class="round-desc">{{ file.roundData }}</p>
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
        beforeLeave(el) {
            el.classList.add('disappear');
        },
        fileNameWithoutExtension(fileName) {
            return fileName.split('.').slice(0, -1).join('');
        },
        navigateTo(event, path) {
            this.$router.push({ name: 'roundid', params: { roundNumber: path } });
        },
        refresh() {
            if (this.loading) {
                return
            }
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
                    const file = files[current];
                    this.files.push({
                        roundId: file.roundId,
                        roundData: file.roundData
                    });
                    this.progress = (current / total) * 100;
                    current++;
                } else {
                    this.progress = (current / total) * 100;
                    current++;
                    clearInterval(interval);
                    setTimeout(() => {
                        this.loading = false;
                    }, 50);
                }
            }, 50);
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
    background-size: 150% 100%;
    transition: 0.2s;
}

.pgbdwn {
    background-color: rgb(23, 44, 44);
    height: 10px;
    padding: 5px;
}

.reload {
    height: 20px;
    margin-top: 1px;
}

.progressbar {
    background-color: rgb(42, 61, 55);
    padding: 10px;
    display: flex;
    flex-direction: column;
    height: fit-content;
    animation-name: appear;
    animation-duration: 0.3s;
}

@keyframes appear {
    from {
        opacity: 0;
        transform: translateY(-10px);
    }

    to {
        opacity: 1;
        transform: translateY(0px);
    }
}

@keyframes disappear {
    from {
        opacity: 1;
        transform: translateY(0px);
    }

    to {
        opacity: 0;
        transform: translateY(-10px);
    }
}

.disappear {
    animation-name: disappear;
    animation-duration: 0.3s;
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
        background-position: -88px 0;
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
    animation-duration: 0.3s;
    animation-name: fadein;
}

@keyframes fadein {
    from {
        opacity: 0;
        scale: 0.9;
    }

    to {
        opacity: 1;
        scale: 1;
    }
}

.list-item:hover {
    background-color: rgb(59, 83, 76);
    transform: translateY(-2px);
    scale: 1.01;
}

.refresh-list:hover {
    background-color: rgb(59, 83, 76);
    color: aliceblue;
    transform: translateY(-2px);
    scale: 1.05;
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
    transition: height 0.5s ease-out;
}

.refresh-list {
    background-color: rgb(30, 58, 58);
    border: none;
    color: rgb(141, 155, 144);
    font-family: fm;
    font-size: 15px;
    height: 30px;
    margin-top: 5px;
    width: 120px;
    margin-left: auto;
    transition: 0.3s;
    cursor: pointer;
    display: flex;
    flex-direction: row;
    gap: 10px;
    padding-top: 4px;
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
    overflow-y: auto;
    transition: 0.5s ease-out;
}
</style>