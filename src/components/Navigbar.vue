<template>
	<div class="navbar">
		<div class="icon" @click="navigateTo($event, 'main')">
			<img src="../assets/logo.png">
		</div>
		<div class="button" @click="navigateTo($event, 'rounds')">Раунды</div>
		<div class="button">Правила</div>
		<div class="button">Вики</div>
		<div class="button" @click="navigateTo($event, 'gallery')">Космогалерея</div>
		<div class="button" @click="openLink('https://github.com/ArkStation13/Ark-Station-13')">GitHub</div>
		<div class="button">Поддержать</div>
	</div>
</template>

<script>
export default {
	name: 'Navigbar',
	methods: {
		navigateTo(event, path) {
			this.$router.push({ name: path });
		},
		openLink(link) {
			window.open(link, '_blank');
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
	user-select: none;
	background-color: #32303b;
	height: 100px;
	width: 100%;
	margin-left: 0px;
	margin-bottom: 0px;
	margin-top: auto;
	display: flex;
	flex-direction: row;
	position: relative;
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
