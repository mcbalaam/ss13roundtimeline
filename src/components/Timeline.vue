<template>
    <div class="container-box">
        <div class="timeline-helper"></div>
        <div class="item roundstart" v-if="showAdditionalInfo.roundstart || showSummary.roundstart">
            <div class="timestamp">12.09@12:02:15</div>
            <div class="pointer" @click="toggleAdditionalInfo($event, 'roundstart')">{{ showAdditionalInfo.roundstart ?
                '-' : '+' }}</div>
            <div class="sign">Round <u>#3998</u> Dynamic (Team-Based) is starting on the <u>IceBox Station</u>!</div>
            <div class="additional-info" v-if="showAdditionalInfo.roundstart">
                <p>Threat points to spend: 75</p>
            </div>
        </div>
        <div class="item death" v-if="showSummary.death">
            <div class="timestamp">12.09@12:08:28</div>
            <div class="pointer"></div>
            <div class="sign">Alexander Gremlin (Security Officer) dies at Space at x:233, y:72, z:2</div>
        </div>
        <div class="item announce" v-if="showAdditionalInfo.announce || showSummary.announce">
            <div class="timestamp">12.09@12:15:57</div>
            <div class="pointer" @click="toggleAdditionalInfo($event, 'announce')">{{ showAdditionalInfo.announce ? '-'
                : '+' }}</div>
            <div class="sign">Station AI Announcement: Iris Bright Sophie</div>
            <div class="additional-info" v-if="showAdditionalInfo.announce">
                <p>Ирис Брайт Софи приветствует экипаж НС Северное Сияние Сто Тридцать Восемь!</p>
                <p>На эту смену я буду вашим коллегой и ассистентом. Не бойтесь обращаться ко мне за любой помощью -
                    Ирис всегда рад помочь.</p>
                <p>Директива смены - установка блюспейс-артиллерии. Ирис проконтроллирует процесс.</p>
                <p>Хорошего дня!</p>
                <p>разъём часовня куст бычок</p>
            </div>
        </div>
        <div class="item antag" v-if="showAdditionalInfo.antag || showSummary.antag">
            <div class="timestamp">12.09@12:19:28</div>
            <div class="pointer" @click="toggleAdditionalInfo($event, 'antag')">{{ showAdditionalInfo.antag ? '-' : '+'
                }}</div>
            <div class="sign">Mid-round antagonist "Traitor" rolled to Lunary (Roboticist)</div>
            <div class="additional-info" v-if="showAdditionalInfo.antag">
                <p>Threat points spent: 10</p>
                <p>Antagonist objectives:</p>
                <ol>
                    <li>Украсть <u>chief engineer zippo</u></li>
                    <li>Убить <u>Layla Honey (Bridge Secretary)</u></li>
                    <li>Сбежать на ЦК незамеченным</li>
                </ol>
            </div>
        </div>
        <div class="item antag" v-if="showAdditionalInfo.antag || showSummary.antag">
            <div class="timestamp">12.09@12:19:28</div>
            <div class="pointer" @click="toggleAdditionalInfo($event, 'antag')">{{ showAdditionalInfo.antag ? '-' : '+'
                }}</div>
            <div class="sign">Mid-round antagonist "Traitor" rolled to Lunary (Roboticist)</div>
            <div class="additional-info" v-if="showAdditionalInfo.antag">
                <p>Threat points spent: 10</p>
                <p>Antagonist objectives:</p>
                <ol>
                    <li>Украсть <u>chief engineer zippo</u></li>
                    <li>Убить <u>Layla Honey (Bridge Secretary)</u></li>
                    <li>Сбежать на ЦК незамеченным</li>
                </ol>
            </div>
        </div>
        <div class="item command" v-if="showSummary.command">
            <div class="timestamp">12.09@12:22:31</div>
            <div class="pointer">+</div>
            <div class="sign">Layla Honey (Bridge Secretary) sends a document to Central Command Fax</div>
        </div>
    </div>
</template>

<script>
const yaml = require('js-yaml');
const fs = require('fs');

const round_id = 1




export default {
    name: 'Timeline',
    props: {
        msg: String
    },
    data() {
        return {
            showAdditionalInfo: {
                roundstart: false,
                announce: false,
                antag: false
            },
            showSummary: {
                roundstart: true,
                death: true,
                announce: true,
                antag: true,
                command: true
            }
        }
    },
    methods: {
        toggleAdditionalInfo(event, type) {
            this.showAdditionalInfo[type] = !this.showAdditionalInfo[type];
        }
    }
}
</script>

<style scoped>
@font-face {
    font-family: fm;
    src: url(../assets/FeatureMono-Medium.ttf);
}

@font-face {
    font-family: fmr;
    src: url(../assets/FeatureMono-Regular.ttf);
}

ol {
    margin-top: -5px;
}

.additional-info {
    padding-left: 20px;
    padding-right: 30px;
    margin-top: 10px;
    width: fit-content;
    /* adjust width as needed */
    text-align: start;
    height: fit-content;
    min-width: 600px;
    max-width: 1000px;
    grid-column: event;
    transition: opacity 0.3s, max-height 0.3s;
    /* add transition */
    overflow: hidden;
    /* add overflow hidden to prevent content from overflowing during animation */
}

.additional-info p {
    position: relative;
    margin-top: 10px;
    margin-bottom: 10px;
    line-height: 1.2;
}

.timeline-helper {
    border-left: 5px solid rgb(251, 255, 241);
    ;
    width: 10px;
    height: 100%;
    /* Set height to 100% */
    margin-left: 189px;
    position: absolute;
    flex: 1;
    z-index: 1;
}

.container-box {
    font-family: fm;
    position: absolute;
    width: 1500px;
    height: fit-content;
    /* border-left: 5px solid black; */
    margin-left: 200px;
    padding-top: 5px;
    padding-bottom: 5px;
    color: rgb(233, 233, 233);
    padding-left: 10px;
    display: flex;
    flex-direction: column;
    transition: 0.3s;
}

.item {
    background-color: rgb(26, 54, 54);
    display: grid;
    grid-template-columns: [timestamp] 154px [pointer] 30px [event] 1000px [end];
    grid-template-rows: [static] 10px [desc] fit-content [last];
    gap: 15px;
    row-gap: 5px;

    position: relative;
    margin-bottom: 10px;
    padding-top: 5px;
    padding-bottom: 7px;
    padding-left: 8px;
    transition: 0.3s;
}

.item:hover {
    background-color: rgb(35, 68, 68);
}

.item:hover>.pointer {
    border: rgb(35, 68, 68) solid 5px;
}

.pointer:hover {
    transform: scale(1.2);
}

.pointer {
    transition: 0.3s;
    background-color: rgb(244, 252, 224);
    width: 20px;
    height: 20px;
    border: rgb(26, 54, 54) solid 5px;
    z-index: 2;
    cursor: pointer;
    line-height: 20px;
    grid-column: pointer;
    margin-top: 0.2px;
}

.sign {
    background-color: rgb(103, 125, 106);
    height: 25px;
    width: fit-content;
    padding-left: 20px;
    padding-right: 20px;
    margin-top: 2.5px;
    grid-column: event;
}

.timestamp {
    background-color: rgb(103, 125, 106);
    height: 25px;
    width: fit-content;
    padding-left: 10px;
    padding-right: 10px;
    margin-top: 2.5px;
    grid-column: timestamp;
}

.roundstart .pointer,
.roundstart .sign,
.roundstart .timestamp,
.roundstart .additional-info {
    background-color: rgb(124, 148, 126);
}

.announce .pointer,
.announce .sign,
.announce .timestamp,
.announce .additional-info {
    background-color: rgb(108, 113, 139);
}

.death .pointer,
.death .sign,
.death .timestamp {
    background-color: rgb(146, 132, 148);
}

.antag .pointer,
.antag .sign,
.antag .timestamp,
.antag .additional-info {
    background-color: rgb(139, 98, 98);
}

.command .pointer,
.command .sign,
.command .timestamp {
    background-color: rgb(139, 132, 99);
}
</style>