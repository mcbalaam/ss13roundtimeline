<template>
	<div class="wrapper">
		<div class="roundtitle">
			<div class="titleload">
				<div class="title"><img class="gamemode" src="../assets/star.svg"><b>Раунд #1</b><button
						class="b-copy"><img class="copy" src="../assets/copy.svg"></button><button class="b-copy"><img
							class="copy" src="../assets/download.svg"></button><button class="b-copy"><img class="copy"
							src="../assets/reload.svg"></button>
				</div>
				<div class="progressbar" v-show="loading">
					<div class="pgbdwn">
						<div class="progress" :style="{ width: progress + '%' }"></div>
					</div>
				</div>
			</div>


			<p class="sub">IceBox Station, 2:15:23</p>
		</div>
		<div class="container-box">
			<div class="timeline-start"></div>
			<div class="timeline-helper"></div>
			<div class="items-timeline">
				<div v-for="(file, index) in files" :key="index" class="item" :class="file.event">
					<div class="timestamp">{{ file.time }}</div>
					<div class="pointer" @click="toggleAdditionalInfo(index)">
						<div class="expander" v-if="file.desc != ''">{{ file.showAdditionalInfo ? '-' : '+' }}</div>
					</div>
					<div class="sign">{{ file.title }}</div>
					<div v-if="file.showAdditionalInfo" class="additional-info" v-show="file.showAdditionalInfo">
						<p v-html="file.desc"></p>
					</div>
				</div>
			</div>
			<div class="timeline-end">
				<img class="arrow" src="../assets/arrow.png">
			</div>
		</div>
		<div class="reality-tear">
			<p class="scary">И ВДРУГ<br>ВСЁ ПОГРУЗИЛОСЬ ВО ТЬМУ.</p>
		</div>
		<div class="bottom-page">

		</div>
		<div class="report">
			<div class="content-report">
				<div class="tear"></div>
				<h1>NT-CC-REP-0001</h1>
				<div class="trim"></div>
				<p>Смена номер #1 на IceBox Station завершена согласно стандартным процедурам.</p>
				<p>Цели смены:</p>
				<ul>
					<li>установка противометеорной системы.</li>
				</ul>
				<h2>Угрозы</h2>
				<div class="trim"></div>
				<p>Всего очков потрачено - 50, а именно:</p>
				<ul>
					<li>Solo Operative (15 очков);</li>
					<li>Space Kudzu (10 очков);</li>
					<li>Mid-Round Traitor (10 очков);</li>
					<li>Space Dragon (15 очков).</li>
				</ul>
				<p>Личные дела сотрудников прилагаются к документу.</p>
				<p>С документом ознакомлен:</p>
				<div class="field"><b class="sign_cap">Лирак Кнокен</b><i>(капитан),</i></div>
				<div class="field"><b class="sign_cap">Катерина Роуз</b><i>(мл. офицер ЦентКом),</i></div>
				<div class="date-str"><h2 class="date">07</h2><h2 class="date">ноября</h2><h2 class="num">35</h2><h2 class="date">24</h2></div>
				<div class="bottom"></div>
				<img class="stamp" src="../assets/stamp_nt.png">
			</div>
		</div>
	</div>
</template>

<script>
const axios = require('axios')
const round_id = 1

export default {
	name: 'Timeline',
	props: {
		msg: String
	},
	data() {
		return {
			files: [],
			round_amount: "fetching...",
			loading: true,
			progress: 5,
		}
	},
	mounted() {
		axios.get(`${process.env.VUE_APP_API_URL}/api/rounds/${round_id}`, {
			headers: {
				'ngrok-skip-browser-warning': '69420'
			}
		})
			.then(response => {
				this.addFiles(response.data);
				console.log(response.data)
			})
			.catch(error => {
				console.error(error);
			});
	},
	methods: {
		toggleAdditionalInfo(index) {
			if (!this.files[index].desc == '') {
				this.files[index].showAdditionalInfo = !this.files[index].showAdditionalInfo;
			}
		},
		refresh() {
			if (this.loading) {
				return
			}
			this.files = []
			this.current = 0;
			this.progress = 5;
			this.loading = true;
			axios.get(`${process.env.VUE_APP_API_URL}/api/rounds`, {
				headers: {
					'ngrok-skip-browser-warning': '69420'
				}
			})
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
					this.createItem(file);
					this.progress = (current / total) * 100;
					current++;
				} else {
					this.progress = (current / total) * 100;
					current++;
					clearInterval(interval);
					setTimeout(() => {
						this.loading = false;
					}, 300);
				}
			}, 10);

		},
		createItem(file) {
			const item = {
				title: file.title,
				desc: file.desc,
				event: file.event,
				time: file.time,
				showAdditionalInfo: false
			};
			this.files.push(item);
		}
	}
}
</script>

<style scoped>
.scary {
	font-family: rz;
	color: aliceblue;
	margin-top: 600px;
	position: absolute;
	font-size: 50px;
	width: 100vw;
	text-align: center;
	line-height: 100px;
}

.bottom-page {
	background-image: url("../assets/point-stars.png");
	width: 100.5vw;
	height: 700px;
	background-position: center center;
	background-size: cover;
	margin-left: -11vw;
}

.reality-tear {
	background-image: url("../assets/reality_tear.png");
	width: 100.5vw;
	height: 700px;
	background-position: center center;
	background-size: cover;
	position: relative;
	margin-top: -400px;
	margin-left: -11vw;
}


.date-str {
	display: flex;
	position: absolute;
	right: 80px;
}

.num {
	margin-right: 0px;
	margin-top: 20px;
	line-height: 30px;
	font-size: 20px;
}

.date {
	color: rgb(167, 56, 56);
	font-family: kb;
	font-size: 30px;
	line-height: 20px;
	position: relative;
	text-align: center;
	width: fit-content;
	min-width: 30px;
	border-bottom: solid 2px #1F1E23;
	margin-right: 10px;
	margin-bottom: 40px;
	padding-left: 10px;
	padding-right: 10px;
}

.sign_cap {
	color: rgb(167, 56, 56);
	font-family: kb;
	font-size: 30px;
	line-height: 20px;
	position: relative;
	text-align: center;
	width: fit-content;
	min-width: 300px;
	border-bottom: solid 2px #1F1E23;
	margin-right: 20px;
	margin-bottom: 40px;
}

.field {
	width: fit-content;
	min-width: 300px;
	display: flex;
	flex-direction: row;
}

.stamp {
	height: 80px;
	margin-left: 20px;
}

.tear {
	border-top: 15px dotted #1F1E23;
	margin-top: -20px;
	width: 62vw;
	margin-left: -50px;
}

.content-report {
	border-right: 15px dashed #1F1E23;
	border-left: 15px dashed #1F1E23;
	height: fit-content;
	min-height: 100px;
	font-family: fm;
	padding-left: 25px;
	padding-top: 10px;
	line-height: 25px;
	padding-right: 20px;
	padding-bottom: 20px;
}

.trim {
	border-top: 3px dotted #1F1E23;
	margin-left: -10px;
	margin-top: -5px;
}

.content-report p {
	font-size: 18px;
}

.content-report li {
	font-size: 18px;
}

.report {
	width: 800px;
	height: fit-content;
	min-height: 100px;
	background-color: rgb(224, 224, 192);
	position: relative;
	padding-left: 10px;
	padding-right: 10px;
	margin-left: 5vw;
	margin-top: 50px;
}




.titleload {
	display: flex;
	flex-direction: row;
	width: 100%;
}

.title b {
	min-width: 270px;
}

.wrapper {
	width: 1000px;
	height: fit-content;
	min-height: 78.8vh;
	padding-left: 10%;
	position: relative;
	margin-top: 20px;
}

.progress {
	position: relative;
	overflow: hidden;
	height: 10px;
	background-image: repeating-linear-gradient(-45deg, #4a4658, #4a4658 25px, rgb(172, 172, 172) 25px, rgb(172, 172, 172) 50px);
	animation: progress 1s linear infinite;
	background-size: 200% 100%;
	transition: 0.2s;
}

.pgbdwn {
	background-color: var(--accent-color);
	height: 10px;
	padding: 5px;
}

.progressbar {
	background-color: #32303b;
	padding: 10px;
	display: flex;
	flex-direction: column;
	height: fit-content;
	animation-name: appear;
	animation-duration: 0.2s;
	transition: opacity 0.2s;
	margin-left: 10px;
	width: 80%;
	margin-top: 3px;
}

.progressbar.hide {
	opacity: 0;
}

@keyframes appear {
	0% {
		transform: scaleY(0);
		opacity: 0;
	}

	100% {
		transform: scaleY(1);
		opacity: 1;
	}
}

@keyframes disappear {
	from {
		opacity: 1;
		transform: translateY(0px);
		scale: 0.9;
	}

	to {
		opacity: 0;
		transform: translateY(-10px);
		scale: 1
	}
}

.disappear {
	animation-name: disappear;
	animation-duration: 0.2s;
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
		background-position: -71px 0;
	}

	to {
		background-position: 0px 0px;
	}
}

@font-face {
	font-family: fm;
	src: url(../assets/FeatureMono-Medium.ttf);
}

@font-face {
	font-family: rz;
	src: url(../assets/RazlukaSP-Bold.otf);
}

@font-face {
	font-family: fmr;
	src: url(../assets/FeatureMono-Regular.ttf);
}

@font-face {
	font-family: kb;
	src: url(../assets/Kontrabanda.ttf);
}

.timeline-end {
	margin-left: 197px;
	margin-top: 0px;
	margin-bottom: 6px;
	transition: 0.2s;
	cursor: pointer;
}

.arrow {
	height: 32px;
	width: 32px;
	transition: 0.2s;
	cursor: pointer;
}

.arrow:hover {
	transform: scale(1.2);
}

.container-box {
	font-family: fm;
	color: rgb(233, 233, 233);

	position: relative;
	width: 100%;
	height: fit-content;
	padding-top: 5px;
	padding-bottom: 5px;
	padding-left: 10px;

	display: flex;
	flex-direction: column;
	transition: 0.3s;
}

.roundtitle {
	font-family: fm;
	color: rgb(233, 233, 233);
	margin-top: 50px;
	margin-left: 18px;
	margin-bottom: -10px;
	width: 80vw;
}

.item {
	display: grid;
	grid-template-columns: [timestamp] 175px [pointer] 30px [event] auto [end];
	grid-template-rows: [static] fit-content [end];
	gap: 15px;
	row-gap: 5px;

	background-color: #1F1E23;
	position: relative;
	padding-top: 5px;
	padding-bottom: 7px;
	padding-left: 8px;
	transition: 0.1s;
	height: fit-content;
	padding-right: 10px;
}

.item:hover {
	background-color: #32303b;
}

.b-copy {
	height: 40px;
	width: 40px;
	margin-left: 10px;
	margin-top: 3px;
	border: none;
	background-color: #32303b;
	transition: 0.2s;
	cursor: pointer;
}

.b-copy:hover {
	background-color: #32303b;
	color: aliceblue;
	scale: 1.1;
}

.title {
	font-size: 50px;
	line-height: 50px;
	position: relative;
	display: flex;
	flex-direction: row;
	width: 500px;
}

.sub {
	font-size: 25px;
	color: rgb(165, 165, 165);
	margin-bottom: 30px;
	margin-top: 10px;
}

.gamemode {
	height: 46px;
	margin-right: 20px;
}

.copy {
	height: 26px;
	margin-top: 2px;
}

ol {
	margin-top: -5px;
}

.additional-info {
	padding-left: 20px;
	padding-right: 30px;
	margin-top: 0px;
	width: fit-content;
	text-align: start;
	min-width: 200px;
	max-width: 1000px;
	grid-column: event;
	overflow: hidden;
	/* opacity: 0; */
	max-height: fit-content;
	transition: max-height 0.2s ease-in-out, opacity 0.2s ease-in-out;
}

.animate-additional-info {
	animation: unfold-additional-info 0.2s forwards;
}

@keyframes unfold-additional-info {
	0% {
		transform: scaleY(0);
		opacity: 0;
	}

	100% {
		transform: scaleY(1);
		opacity: 1;
	}
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
	height: calc(100% - 60px);
	margin-left: 210px;
	position: absolute;
	margin-top: 10px;
	flex: 1;
	z-index: 1;
}

.timeline-start {
	height: 10px;
	width: 10px;
	border: 5px solid rgb(251, 255, 241);
	margin-left: 202.5px;
	margin-top: -10px;
	margin-bottom: 6px;
	background-color: #1F1E23;
	transition: 0.2s;
	cursor: pointer;
}

.timeline-start:hover {
	transform: scale(1.2);
}





.item:hover {
	background-color: #32303b;
}

.item:hover>.pointer {
	border: #32303b solid 5px;
}

.pointer:hover {
	transform: scale(1.2);
}

.pointer:active {
	transform: scale(1)
}

.pointer {
	transition: 0.1s;
	background-color: rgb(244, 252, 224);
	width: 20px;
	height: 20px;
	border: #1F1E23 solid 5px;
	z-index: 2;
	cursor: pointer;
	line-height: 20px;
	grid-column: pointer;
	margin-top: 0.2px;
	text-align: center;
	user-select: none;
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


.st .sign,
.st .pointer,
.st .additional-info,
.st .timestamp {
	background-image: repeating-linear-gradient(-45deg, #46584a, #46584a 10px, rgb(113, 136, 108) 10px, rgb(113, 136, 108) 20px);
}

.ann .pointer,
.ann .sign,
.ann .timestamp,
.ann .additional-info {
	background: repeating-linear-gradient(-45deg, rgb(75, 79, 99), rgb(75, 79, 99) 10px, rgb(108, 113, 139) 10px, rgb(108, 113, 139) 20px);
}

.aia .pointer,
.aia .sign,
.aia .timestamp,
.aia .additional-info {
	background: repeating-linear-gradient(-45deg, rgb(100, 105, 131), rgb(100, 105, 131) 10px, rgb(133, 139, 168) 10px, rgb(133, 139, 168) 20px);
}

.dth .pointer,
.dth .sign,
.dth .timestamp,
.dth .additional-info {
	background-color: rgb(146, 132, 148);
}

.ant .pointer,
.ant .sign,
.ant .timestamp,
.ant .additional-info {
	background-color: rgb(139, 98, 98);
}

.nte .pointer,
.nte .sign,
.nte .timestamp,
.nte .additional-info {
	background-color: rgb(177, 154, 120);
}

.fxs .pointer,
.fxs .sign,
.fxs .timestamp,
.fxs .additional-info {
	background-color: rgb(173, 161, 98);
}

.red .sign,
.red .pointer,
.red .additional-info,
.red .timestamp {
	background-image: repeating-linear-gradient(-45deg, rgb(148, 71, 71), rgb(148, 71, 71) 10px, rgb(216, 103, 103) 10px, rgb(216, 103, 103) 20px);
}
</style>