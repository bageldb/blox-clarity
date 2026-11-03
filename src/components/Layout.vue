<script setup lang="ts">
import SiteHeader from './blocks/SiteHeader.vue'
import SiteFooter from './blocks/SiteFooter.vue'
</script>

<template>
	<div>
		<SiteHeader />
		<main id="content">
			<router-view />
		</main>
		<SiteFooter />
	</div>
</template>
