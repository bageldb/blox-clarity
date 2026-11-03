<script setup lang="ts">
import SiteNav from './SiteNav.vue'
import SiteFooter from './SiteFooter.vue'
</script>

<template>
	<div>
		<SiteNav />
		<main>
			<router-view />
		</main>
		<SiteFooter />
	</div>
</template>
