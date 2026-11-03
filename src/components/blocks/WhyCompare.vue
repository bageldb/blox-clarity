<script setup lang="ts">
import { defineBlock } from '@bagelink/blox'
import { defineSchema, $ } from '@bagelink/vue'

interface Props {
	heading?: string
	intro?: string
	points?: Array<{ title?: string; clarity?: string; other?: string }>
}

const schema = defineSchema<Props>({
	heading: $.text('Heading'),
	intro: $.textarea('Intro'),
	points: $.array('Points', defineSchema({
		title: $.text('Title'),
		clarity: $.textarea('Clarity'),
		other: $.textarea('Other option'),
	}), { collapsible: true, allowReorder: true }),
})

defineBlock({
	name: 'WhyCompare',
	label: 'Why sell comparison',
	icon: 'compare',
	category: 'content',
	description: 'Why-sell-with-us comparison of Clarity versus a local jeweller.',
	schema,
	defaults: { points: [] },
})

const props = withDefaults(defineProps<Props>(), { points: () => [] })
</script>

<template>
	<section class="px-2 m_px-1 py-4">
		<div class="w-1100px mx-auto">
			<h2 class="txt-36 line-height-11 m-0">{{ props.heading }}</h2>
			<p v-if="props.intro" class="sans line-height-15 measure m-0 mt-1">{{ props.intro }}</p>
			<ul class="bare mt-2">
				<li v-for="(p, i) in props.points" :key="p.title || i" class="border-top py-1 grid-3 m_grid-1 gap-1">
					<h3 class="txt-20 m-0">{{ p.title }}</h3>
					<p class="sans line-height-15 m-0"><strong>Clarity. </strong>{{ p.clarity }}</p>
					<p class="sans line-height-15 m-0">{{ p.other }}</p>
				</li>
			</ul>
		</div>
	</section>
</template>
