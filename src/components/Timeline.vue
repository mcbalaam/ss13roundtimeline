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
    </div>
</template>

<script>
import yaml from 'js-yaml';

const round_id = 1

// const round_logs = async () => {
//   const response = await fetch(`../../../rounds/${round_id}.yml`);
//   const data = await response.text();
//   const parsedData = yaml.load(data);
//   return parsedData;
// };

// round_logs().then((parsedData) => {
//   console.log(parsedData);
// });

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
    width: 10px;
    height: 100%;
    /* Set height to 100% */
    margin-left: 189px;
    position: absolute;
    flex: 1;
    z-index: 1;
}

.container-box {
    margin-top: 200px;
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