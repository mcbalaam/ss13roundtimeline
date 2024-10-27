<template>
	<Navigbar id="navigbar"/>
	<router-view id="router-view"/>
	<Footerbar id="footerbar"/>
</template>

<script>
import Navigbar from './components/Navigbar.vue';
import Footerbar from './components/Footerbar.vue';

export default {
	name: 'App',
	components: {
		Navigbar,
		Footerbar
	}
}
</script>

<style>
body {
	background-color: #1F1E23;
}

#navigbar {
	margin-bottom: 0px;
}

#router-view {
	height: fit-content;
	width: 100%;
	min-height: calc(100vh - 198px);
	z-index: 1000;
}
</style>
