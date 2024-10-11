<template>
	<div class="title-block">
		<video class="bbanner" autoplay="autoplay" loop="loop" src="../assets/hero.mp4"></video>
		<div class="title-text-block">
			<b class="title">Ark <b class="glyph">{{ glyph }}</b><br>Station</b>
			<br>
			<b class="hostname">Hosted by <a href="#">Krashly</a></b>
		</div>

	</div>
	<div class="status">
		<div class="serverstatus">
			<div class="status-n-map">
				<p class="roundstatus">Раунд: в процессе</p>
				<p class="map">Карта: IceBox Station</p>
			</div>
			<div class="time-connect">
				<div class="time">> 12:39</div>
				<button class="connect">Подключиться</button>
			</div>
		</div>
		<div class="brick discord"><img class="discord-icon" src="../assets/discord-mark-white.svg">Сервер Discord</div>
		<div class="brick rules">Правила проекта</div>
		<div class="brick support">Поддержать проект на Boosty</div>
	</div>
	<div class="about">
		<p>Оно грядёт.</p>
		<p>Грядёт прибытие Жнецов. Оно неумолимо приближается, грозя вновь погрузить человечество в пучину.
			Для пережидания нашествия была создана Организация, подготавливающая корабли для гиперпрыжка. Свалить куда
			подальше от этих чудил, всего-то делов. Была создана сеть станций-ковчегов, приютившая величайшие умы из
			величайших, день изо дня корпевших над решением этой проблемы...</p>
		<p>...впрочем, об этом позже. Добро пожаловать, офицер. Обустраивайтесь, чувствуйте себя как дома. Мы тут
			надолго.
		</p>
		<p><b>Добро пожаловать на Ark Station 13.</b></p>
	</div>
</template>

<script>
const glyphs = ['>.>', 'OwO', '0_o', '~>', '@w@', '>~<', '^o^']

export default {
	name: 'MainPageView',
	components: {

	},
	data() {
		return {
			glyph: glyphs[Math.floor(Math.random() * glyphs.length)]
		}
	}
}
</script>

<style scoped>
@font-face {
	font-family: fml;
	src: url(../assets/FeatureMono-Light.ttf);
}

@font-face {
	font-family: fmr;
	src: url(../assets/FeatureMono-Regular.ttf);
}

.about {
	position: relative;
	width: 80%;
	margin-left: 10%;
	margin-top: 30px;
	font-family: fmr;
	color: rgb(184, 184, 184);
	font-size: 20px;
	line-break: 20px;
	padding-bottom: 50px;
	height: 350px;
}

.about p {
	text-indent: 30px;
	word-wrap: break-word;
	hyphens: auto;
}

.discord-icon {
	height: 40px;
	margin-left: 10px;
	margin-right: auto;
	margin-top: 10px;
}

.status {
	grid-column: center;
	position: relative;
	margin-top: -30px;
	margin-left: 10%;
	width: 80%;
	height: fit-content;
	display: flex;
	flex-direction: row;
}

.time-connect {
	display: flex;
	flex-direction: row;
	padding-right: 10px;
}

.connect {
	background-color: rgb(50, 139, 139);
	border: none;
	color: rgb(255, 255, 255);
	font-family: fmr;
	font-size: 18px;
	height: 35px;
	margin-top: 5px;
	width: 150px;
	padding-left: 10px;
	margin-left: auto;
	transition: 0.1s;
	cursor: pointer;
	display: flex;
	flex-direction: row;
	gap: 10px;
	padding-top: 4px;
}

.connect:hover {
	background-color: rgb(58, 168, 168);
	transform: scale(1.05);
}

.serverstatus {
	height: 80px;
	width: 50%;
	min-width: 400px;
	font-family: fmr;
	color: rgb(233, 233, 233);
	font-size: 15px;
	background-image: repeating-linear-gradient(-45deg, rgb(42, 73, 73), rgb(42, 73, 73) 10px, rgb(60, 104, 104) 10px, rgb(60, 104, 104) 20px);
	padding-left: 20px;
	display: flex;
	flex-direction: column;
	position: relative;
}

.brick {
	height: 70px;
	padding-top: 10px;
	line-height: 30px;
	padding-right: 15px;
	padding-left: 15px;
	font-family: fmr;
	color: rgb(233, 233, 233);
	font-size: 22px;
	margin-left: 10px;
	transition: 0.1s;
	cursor: pointer;
	position: relative;

}

.discord {
	width: 14%;
	min-width: 180px;
	text-align: end;
	background-image: repeating-linear-gradient(-45deg, rgb(42, 45, 73), rgb(42, 45, 73) 10px, rgb(60, 65, 102) 10px, rgb(60, 65, 102) 20px);
	display: flex;
	flex-direction: row;
	padding-right: 20px;
}

.support {
	width: 25%;
	min-width: 180px;
	padding-left: 30px;
	text-align: start;
	background-image: repeating-linear-gradient(-45deg, rgb(73, 61, 42), rgb(73, 61, 42) 10px, rgb(119, 101, 72) 10px, rgb(119, 101, 72) 20px);
}

.rules {
	width: 12%;
	min-width: 100px;
	text-align: center;
	background-image: repeating-linear-gradient(-45deg, rgb(68, 68, 68), rgb(68, 68, 68) 10px, rgb(148, 148, 148) 10px, rgb(148, 148, 148) 20px);
}

.brick:hover {
	/* transform: scale(1.02); */
	transform: translateY(-2px);
}


.status-n-map {
	display: grid;
	grid-template-columns: [start] 45% [end] 55%;
	row-gap: 30px;
	width: 400px;
	margin-top: -5px;
	margin-bottom: -15px;
}

.time {
	font-weight: bold;
	font-size: 30px;
}

.roundstatus {
	grid-column: start;
}

.map {
	grid-column: end;
}


.bbanner {
	width: calc(100%);
	margin-left: -10px;
	height: 600px;
	object-fit: cover;
	margin-top: 10px;
	position: absolute;
	overflow: hidden;
}

.title-block {
	display: grid;
	grid-template-columns: [left] 20% [center] 60% [right] 20% [end];
	grid-template-rows: [spacing-top] 190px [content] 200px [socials] 180px [spacing-bottom] 50px [end];
	gap: 10px
}

.title-text-block {
	font-family: fml;
	color: rgb(233, 233, 233);

	text-align: left;
	grid-column: center;
	grid-row: content;
	position: relative;
	height: fit-content;
	width: fit-content;
}

.glyph {
	color: rgb(134, 134, 134);
	font-size: 70px;
	line-height: 80px;
}

.title-text-block .title {
	font-size: 100px;
	line-height: 0.8;
}

.title-text-block .hostname {
	font-size: 30px;
	line-height: 1.2;
}

a {
	color: rgb(128, 160, 160);
}

a:hover {
	color: rgb(181, 214, 216);
}
</style>