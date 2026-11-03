<script setup lang="ts">
import { defineBlock, useGlobalBlock } from '@bagelink/blox'
import { defineSchema, $ } from '@bagelink/vue'

interface Link { label: string; to: string }
interface Content { brand?: string; note?: string; links?: Link[] }

const schema = defineSchema({
	brand: $.text('Marque'),
	note: $.textarea('Note'),
	links: $.array('Liens', defineSchema({
		label: $.text('Libellé'),
		to: $.text('Lien'),
	}), { collapsible: true, allowReorder: true }),
})

defineBlock({
	name: 'SiteFooter',
	label: 'Pied de page',
	icon: 'vertical_align_bottom',
	category: 'layout',
	description: 'Pied de page du site. Un seul bloc, partagé par toutes les pages.',
	schema,
	defaults: { brand: 'Clarity', note: '', links: [] },
	global: true,
})

const { data } = useGlobalBlock<Content>('SiteFooter')
</script>

<template>
	<footer class="border-top mt-6">
		<div class="w-1100px mx-auto px-2 m_px-1 py-3 grid gap-2">
			<div class="flex space-between align-items-end gap-2 m_column m_align-items-start">
				<p class="txt-28 m-0" style="letter-spacing: -0.03em">{{ data?.brand }}</p>
				<p class="sans txt13 quiet m-0 measure">{{ data?.note }}</p>
			</div>
			<nav class="flex gap-1-5 flex-wrap sans txt13 quiet" aria-label="Informations">
				<router-link v-for="link in data?.links ?? []" :key="link.to" :to="link.to" class="decoration-none">{{ link.label }}</router-link>
			</nav>
		</div>
	</footer>
</template>
