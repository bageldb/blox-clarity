<script setup lang="ts">
import { ref } from 'vue'
import { defineBlock, useGlobalBlock } from '@bagelink/blox'
import { Btn, Icon, defineSchema, $ } from '@bagelink/vue'

interface Link { label: string; to: string }
interface Content { brand?: string; links?: Link[]; logo?: string }

const schema = defineSchema({
	brand: $.text('Marque'),
	logo: $.text('Logo'),
	links: $.array('Liens', defineSchema({
		label: $.text('Libellé'),
		to: $.text('Lien'),
	}), { collapsible: true, allowReorder: true }),
})

defineBlock({
	name: 'SiteHeader',
	label: 'En-tête',
	icon: 'menu',
	category: 'layout',
	description: 'Navigation du site. Un seul bloc, partagé par toutes les pages.',
	schema,
	defaults: { brand: 'Clarity', links: [] },
	global: true,
})

const fallback: Content = {
	brand: 'Clarity',
	links: [
		{ label: 'À propos', to: '/about' },
		{ label: 'Pourquoi', to: '/why-sell-with-us' },
		{ label: 'Comment', to: '/how-it-works' },
		{ label: 'Journal', to: '/blog' },
		{ label: 'Contact', to: '/contact' },
	],
}
const { data } = useGlobalBlock<Content>('SiteHeader')
const open = ref(false)
</script>

<template>
	<div class="nav-sticky">
		<header>
			<div class="w-1100px mx-auto px-2 m_px-1 h-60px flex align-items-center space-between gap-2">
				<router-link to="/" class="txt-22 decoration-none flex align-items-center" style="letter-spacing: -0.03em">
					<img v-if="data?.logo" :src="data.logo" alt="" style="height: 28px; width: auto" />
					<span v-else>{{ data?.brand || fallback.brand }}</span>
				</router-link>
				<nav class="desk-nav gap-1-5 align-items-center sans" aria-label="Pages">
					<router-link v-for="link in data?.links?.length ? data.links : fallback.links" :key="link.to" :to="link.to" class="txt13 decoration-none quiet">{{ link.label }}</router-link>
				</nav>
				<Btn class="mob-toggle" flat :icon="open ? 'close' : 'menu'" :aria-label="open ? 'Fermer le menu' : 'Ouvrir le menu'" @click="open = !open" />
			</div>
			<nav v-if="open" class="px-2 py-1 border-top sans m_px-1" aria-label="Pages">
				<router-link v-for="link in data?.links?.length ? data.links : fallback.links" :key="link.to" :to="link.to" class="flex space-between align-items-center py-075 decoration-none border-bottom" @click="open = false">
					<span>{{ link.label }}</span>
					<Icon name="arrow_forward" class="opacity-4" />
				</router-link>
			</nav>
		</header>
	</div>
</template>
