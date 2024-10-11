<template>
	<div class="wrapper">
		<div class="container-box">
			<div class="item">
				<img class="photo" src="../../photos/placeholder.png">
				<div class="label"><b>#1</b></div>
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
					}, 300);
				}
			}, 20);
		}
	}
}
</script>

<style scoped>

.label {
	position: absolute;
	margin-top: -50px;
	margin-left: 10px;
	font-size: 30px;
	width: fit-content;
	padding-left: 10px;
	padding-right: 10px;
	transition: 0.2s;
	line-height: 35px;
}

.item:hover>.label {
	background-color: #5c7283;
}

.container-box {
	margin-top: 10px;
	margin-bottom: 100px;
	background-color: #32303b;
	width: 70vw;
	margin-left: 5vw;
	padding-left: 20px;
	padding-top: 20px;
	padding-right: 20px;
	padding-bottom: 20px;
	overflow-y: auto;
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(275px, 1fr));
	grid-gap: 10px;
}

.photo {
	height: 250px;
	margin-bottom: 0px;
}

.item {
	width: 275px;
	height: 275px;
	background-color: #4b5d6b;
	padding-top: 25px;
	padding-left: 25px;
	color: rgb(44, 44, 44);
	font-family: fm;
	font-size: 16px;
	transition: 0.2s;
	cursor: pointer;
	position: relative;
}

.item:hover {
	background-color: #5c7283;
	transform: translateY(-5px);
	scale: 1.01;
}

.wrapper {
	width: 1000px;
	height: fit-content;
	min-height: 78.8vh;
	padding-left: 10%;
}
</style>