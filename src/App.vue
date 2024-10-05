<template>
	<Navigbar />
	<router-view />
	<Footerbar />
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
</style>
