<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { Btn, Icon } from '@bagelink/vue'

const links = [
	{ label: 'À propos', to: '/about' },
	{ label: 'Pourquoi', to: '/why-sell-with-us' },
	{ label: 'Comment', to: '/how-it-works' },
	{ label: 'Journal', to: '/blog' },
	{ label: 'Contact', to: '/contact' },
]

const open = ref(false)
</script>

<template>
	<div class="nav-sticky">
	<div class="seal-line"></div>
	<header class="border-bottom">
		<div class="w-1100px mx-auto px-2 m_px-1 h-60px flex align-items-center space-between gap-2">
			<RouterLink to="/" class="txt-22 decoration-none" style="letter-spacing: -0.03em">Clarity</RouterLink>
			<nav class="desk-nav gap-1-5 align-items-center sans" aria-label="Pages">
				<RouterLink
					v-for="l in links"
					:key="l.to"
					:to="l.to"
					class="txt13 decoration-none quiet"
				>{{ l.label }}</RouterLink>
			</nav>
			<Btn class="mob-toggle" flat :icon="open ? 'close' : 'menu'" :aria-label="open ? 'Fermer le menu' : 'Ouvrir le menu'" @click="open = !open" />
		</div>
		<nav v-if="open" class="px-2 py-1 border-top sans m_px-1" aria-label="Pages">
			<RouterLink
				v-for="l in links"
				:key="l.to"
				:to="l.to"
				class="flex space-between align-items-center py-075 decoration-none border-bottom"
				@click="open = false"
			>
				<span>{{ l.label }}</span>
				<Icon name="arrow_forward" class="opacity-4" />
			</RouterLink>
		</nav>
	</header>
	</div>
</template>
