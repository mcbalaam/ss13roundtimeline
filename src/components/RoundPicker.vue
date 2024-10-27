<template>
	<div class="wrapper">
		<div class="container-box">
			<div class="list-title">
				<p class="round-title">Rounds in the library: <b>{{ round_amount }}</b></p><button class="refresh-list"
					@click="refresh"><img class="reload" src="../assets/reload.svg">Re-fetch</button>
			</div>
			<div class="list-container">
				<div class="progressbar" v-show="loading" @beforeLeave="beforeLeave">
					<div class="pgbdwn">
						<div class="progress" :style="{ width: progress + '%' }"></div>
					</div>
				</div>
				<div class="list-item" v-for="(file, index) in files" :key="index"
					@click="navigateTo($event, file.roundId)">
					<p class="round-title">Round #{{ file.roundId }}</p>
					<p class="round-desc">{{ file.roundData }}</p>
					<div class="copy"><img src="../assets/copy.svg"></div>
				</div>
				<div class="end-line"></div>
				<p class="end">Nothing else here...</p>
			</div>
		</div>
	</div>

</template>

<script>
const axios = require('axios')

export default {
	data() {
		return {
			files: [],
			round_amount: "fetching...",
			loading: true,
			progress: 5
		}
	},
	mounted() {
		axios.get('https://15f5-95-104-185-246.ngrok-free.app/api/rounds', {
			headers: {
				'ngrok-skip-browser-warning': '69420'
			}
		})
			.then(response => {
				this.round_amount = response.data.length;
				console.log(response.data);
				this.addFiles(response.data);
			})
			.catch(error => {
				console.error(error);
			});
	},
	methods: {
		beforeleave(el) {
			el.classList.add('disappear');
			setTimeout(() => {
				el.remove();
			}, 3000);
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
			axios.get('https://15f5-95-104-185-246.ngrok-free.app/api/rounds', {
				headers: {
					// 'Authorization': 'Bearer YOUR_TOKEN',
					'ngrok-skip-browser-warning': '69420'
				}
			})
				.then(response => {
					this.round_amount = response.data.length;
					console.log(this.round_amount)
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
					}, 300);
				}
			}, 10);
		}
	}
}
</script>

<style scoped>
@media (max-width: 1200px) {
	.container-box {
		margin-left: 0px !important;
		width: calc(100vw - 75px) !important;
	}
}

:root {
	--primary-color: #F6F8F6;
	/* Light Gray */
	--secondary-color: #888E8F;
	/* Dark Gray */
	--accent-color: #6f7e8a;
	/* Blue-Gray */
	--background-color: #4a4658;
	/* Dark Blue-Gray */
	--text-color: #1F1E23;
	/* Dark Brown */
}

.progress {
	position: relative;
	overflow: hidden;
	height: 10px;
	background-image: repeating-linear-gradient(-45deg, #4a4658, #4a4658 25px, rgb(172, 172, 172) 25px, rgb(172, 172, 172) 50px);
	animation: progress 1s linear infinite;
	background-size: 150% 100%;
	transition: 0.2s;
}

.pgbdwn {
	background-color: var(--accent-color);
	height: 10px;
	padding: 5px;
}

.wrapper {
	margin-top: 0px;
	position: relative;
}

.reload {
	height: 20px;
	margin-top: 1px;
	padding-left: 5px;
}

.progressbar {
	background-color: #4b5d6b;
	padding: 10px;
	display: flex;
	flex-direction: column;
	height: fit-content;
	animation-name: appear;
	animation-duration: 0.2s;
	transition: opacity 0.2s;
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
	background-color: #4b5d6b;
	height: 23px;
	width: 23px;
	padding-left: 2px;
	padding-top: 2px;
	transition: 0.2s;
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
	background-color: #4b5d6b;
	display: inline-block;
	transition: 0.2s;
	cursor: pointer;
	animation-duration: 0.2s;
	animation-name: fadein;
}

@keyframes fadein {
	from {
		transform: translateY(20);
		opacity: 0;
		scale: 0.9;
	}

	to {
		opacity: 1;
		scale: 1;
	}
}

.list-item:hover {
	background-color: #5c7283;
	transform: translateY(-2px);
	scale: 1.01;
}

.refresh-list:hover {
	background-color: #5c7283;
	color: aliceblue;
	transform: translateY(-2px);
	scale: 1.05;
}

.list-item:hover>.copy {
	background-color: #5c7283;
}

.end {
	color: rgb(165, 165, 165);
	font-size: 17px;
	margin-bottom: 0px;
	background-color: #32303b;
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
	border-bottom: 3px solid rgb(165, 165, 165);
	margin-top: 15px;
	position: relative;
}

.round-desc {
	width: fit-content;
	font-size: 15px;
	line-height: 22px;
	color: rgb(165, 165, 165);
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
	background-color: #4b5d6b;
	border: none;
	color: rgb(165, 165, 165);
	font-family: fm;
	font-size: 15px;
	height: 30px;
	margin-top: 5px;
	width: 120px;
	margin-left: auto;
	transition: 0.2s;
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
	margin-bottom: 100px;
	background-color: #32303b;
	width: 65vw;
	margin-left: 15vw;
	padding-left: 20px;
	padding-top: 20px;
	padding-right: 20px;
	padding-bottom: 15px;
	overflow-y: auto;
	position: absolute;
	margin-top: 10px;
}

.divider {
	background-color: aqua;
	width: 1000px;
	height: 20px;
	position: relative;
}
</style>